import re
import json
import pprint
import subprocess

import pandas as pd
from bidi.algorithm import get_display

JSON_PATH = 'app/public/locales/he/landing-page.json'
EXCEL_PATH = r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE"
INP_PATH = 'update_he/input.xlsx'
SKIP_PATH = 'update_he/skip.json'
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
    with open(SKIP_PATH) as fp:
        skip_lst = json.load(fp)

    def init_keys(obj: dict, data: dict,
                  prev_keys: tuple = ()):
        for key in obj:
            current_value = obj[key]
            current_loc = prev_keys + (key,)
            if isinstance(current_value, str):
                current_key = '.'.join(current_loc)
                data['key'].append(current_key)
                data['value'].append(obj[key])
                if current_key in skip_lst:
                    flag = True
                else:
                    flag = False
                data['skip_fmt'].append(flag)
            else:
                init_keys(current_value, data,
                          prev_keys=current_loc)

    with open(JSON_PATH, mode='r',
              encoding='utf-8') as fp:
        json_obj = json.load(fp)
    d = dict(key=[], value=[], skip_fmt=[])
    init_keys(json_obj, d)
    df = pd.DataFrame(d)
    df.to_excel(INP_PATH, index=False)
    subprocess.run([EXCEL_PATH, INP_PATH])


def update_json():
    """Update json file from given dataframe."""
    df = pd.read_excel(INP_PATH)

    def set_value(obj, index: int):
        """Update given key with value within json."""
        row = df.iloc[index]
        steps = row['key'].split('.')
        for step in steps[:-1]:
            obj = obj[step]
        prev_value = obj[steps[-1]]
        res = row['value']
        if not row['skip_fmt']:
            res = fmt_bi(res)
            print(f'formatted {row["key"]}.')
            df.loc[index, 'skip_fmt'] = True
        if res != prev_value:
            obj[steps[-1]] = res
            print(f'updated {row["key"]} with "{res}".')

    with open(JSON_PATH, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    for i in range(len(df)):
        set_value(json_obj, i)
    temp = df.query('skip_fmt == True')['key']
    temp.to_json(SKIP_PATH, orient='records')

    with open(JSON_PATH, mode='w', encoding='utf-8') as fp:
        json.dump(json_obj, fp)


if __name__ == '__main__':
    init_excel_sheet()
    update_json()
