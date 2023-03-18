import argparse
import os
import re
import json
import pprint
import subprocess

import pandas as pd
from bidi.algorithm import get_display

JSON_PATH = 'app/public/locales/he/landing-page.json'
EXCEL_PATH = r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE"
INP_PATH = './input.xlsx'
pp = pprint.PrettyPrinter()


def fmt_bi(content: str):
    """Format hebrew content in correct direction and in one line.
    @:param: content (str) the string to format to html
    """
    pat = re.compile(r'\s+')
    directed = get_display(content)
    return pat.sub(repl=' ', string=directed)


def init_excel_sheet():
    """Reload Excel sheet with current json entries."""

    def init_keys(obj: dict, data: dict,
                  prev_keys: tuple = ()):
        for key in obj:
            current_value = obj[key]
            current_loc = prev_keys + (key,)
            if isinstance(current_value, str):
                data['key'].append('.'.join(current_loc))
                data['value'].append(fmt_bi(obj[key]))
            else:
                init_keys(current_value, data,
                          prev_keys=current_loc)

    with open(JSON_PATH, mode='r',
              encoding='utf-8') as fp:
        json_obj = json.load(fp)
    d = dict(key=[], value=[])
    init_keys(json_obj, d)
    df = pd.DataFrame(d)
    df.to_excel(INP_PATH, index=False)
    subprocess.run([EXCEL_PATH, INP_PATH])


def update_json():
    """Update json file from given dataframe."""
    df = pd.read_excel(INP_PATH)

    def set_value(obj, key, value):
        """Update given key with value within json."""
        steps = key.split('.')
        for step in steps[:-1]:
            obj = obj[step]
        prev_value = obj[steps[-1]]
        res = fmt_bi(value)
        if res != prev_value:
            obj[steps[-1]] = res
            print(f'updated {key} with "{res}".')

    with open(JSON_PATH, encoding='utf-8') as fp:
        json_obj = json.load(fp)
    for _, (k, val) in df.iterrows():
        set_value(json_obj, k, val)

    with open(JSON_PATH, mode='w', encoding='utf-8') as fp:
        json.dump(json_obj, fp)


if __name__ == '__main__':
    init_excel_sheet()
    update_json()
