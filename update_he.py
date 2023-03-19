import re
import json
import argparse
import subprocess

import numpy as np
import pandas as pd
from bidi.algorithm import get_display

JSON_PATH = 'app/public/locales/he/landing-page.json'
EXCEL_PATH = r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE"
INP_PATH = 'update_assets/input.xlsx'


def fmt_bi(content: str):
    """Format hebrew content in correct direction and in one line.
    @:param: content (str) the string to format to html
    """
    pat = re.compile(r'\s+')
    directed = get_display(content)
    return pat.sub(repl=' ', string=directed)


def json_to_sheet():
    """Reload Excel sheet with current json entries."""

    def json_to_df(main_obj):
        """Return a DataFrame from given main_obj."""

        def fill_data(obj: dict, prev_keys: tuple = ()):
            """Fill `data` dictionary with json data."""
            for key in obj:
                current_value = obj[key]
                current_loc = prev_keys + (key,)
                if isinstance(current_value, (str, float, int)):
                    current_id = '.'.join(current_loc)
                    data['key'].append(current_id)
                    data['value'].append(obj[key])
                else:
                    fill_data(current_value,
                              prev_keys=current_loc)

        data = dict(key=[], value=[])
        fill_data(main_obj)
        df = pd.DataFrame(data)
        df['format_flag'] = fmt_flag
        return df

    with open(JSON_PATH, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    json_to_df(json_obj).to_excel(INP_PATH, index=False)
    subprocess.run([EXCEL_PATH, INP_PATH])


def sheet_to_json():
    """Update json entries with sheet data."""

    def row_to_json_obj(row: pd.Series, *, obj):
        """Update given json by dataframe row value."""
        steps = row['key'].split('.')
        for step in steps[:-1]:
            obj = obj[step]
        prev_value = obj[steps[-1]]
        res = row['value']
        if row['format_flag'] and not np.isnan(row['format_flag']):
            res = fmt_bi(res)
            print(f'formatted {row["key"]}.')
        if res != prev_value and not np.isnan(res):
            obj[steps[-1]] = res
            print(f'updated {row["key"]} with "{res}".')

    with open(JSON_PATH, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    df = pd.read_excel(INP_PATH)
    df.apply(row_to_json_obj, axis=1, obj=json_obj)

    with open(JSON_PATH, mode='w', encoding='utf-8') as fp:
        json.dump(json_obj, fp)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--init', action='store_true',
                        help='Format all by default.')
    args = parser.parse_args()
    fmt_flag = args.init
    json_to_sheet()
    sheet_to_json()
