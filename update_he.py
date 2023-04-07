import re
import json
import argparse
import subprocess

from colorama import Fore
import pandas as pd
from pandas.api.types import is_scalar
from bidi.algorithm import get_display

from zz_updator import refresh_address_jsons

EXCEL_PATH = r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE"
INP_PATH = r'C:\Users\Nadav\Documents\ALL_PROJECTS\smapy\update_assets\input.xlsx'

CUSTOMER_HE_PATH = 'app/public/locales/he/customer.json'
COMMON_HE_PATH = 'app/public/locales/he/common.json'
ADVISOR_HE_PATH = 'app/public/locales/he/advisor.json'
LANDING_PAGE_HE_PATH = 'app/public/locales/he/landing-page.json'


def fmt_bi(content, *, direct):
    """Format hebrew content in correct direction and in one line.
    @:param content: content to format to html
    """
    pat = re.compile(r'\s+')
    res = str(content)
    if direct:
        res = get_display(res)
    return pat.sub(repl=' ', string=res)


def json_to_sheet(json_path):
    """Reload Excel sheet with current json entries."""

    def json_to_df(main_obj):
        """Return a DataFrame from given main_obj."""

        def fill_data(obj: dict, prev_keys: tuple = ()):
            """Fill `data` dictionary with json data."""
            for key in obj:
                current_value = obj[key]
                current_loc = prev_keys + (key,)
                if is_scalar(current_value):
                    current_id = '.'.join(current_loc)
                    data['key'].append(current_id)
                    data['value'].append(current_value)
                else:
                    fill_data(current_value,
                              prev_keys=current_loc)

        data = dict(key=[], value=[])
        fill_data(main_obj)
        df = pd.DataFrame(data)
        df['format_flag'] = False
        return df

    with open(json_path, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    result = json_to_df(json_obj)
    result.to_excel(INP_PATH, index=False, engine='xlsxwriter')

    subprocess.run([EXCEL_PATH, INP_PATH])


def sheet_to_json(json_path):
    """Update json entries with sheet data."""

    def row_to_json_obj(row: pd.Series, *, obj):
        """Update given json by dataframe row value."""
        invalid_key_message = f'\n{Fore.LIGHTRED_EX}ignored {row["key"]}, non-existent json entry.{Fore.RESET}\n'
        broad_key_message = f'\n{Fore.LIGHTRED_EX}ignored {row["key"]}, too broad json entry.{Fore.RESET}\n'
        steps = row['key'].split('.')
        for step in steps[:-1]:
            try:
                obj = obj[step]
            except KeyError:
                print(invalid_key_message)
                return
        if steps[-1] in obj:
            prev_value = obj[steps[-1]]
            if is_scalar(prev_value):
                res = row['value']
                if row['format_flag'] and not pd.isna(row['format_flag']):
                    res = fmt_bi(res, direct=True)
                    print(f'\nredirected {row["key"]}.\n')
                else:
                    res = fmt_bi(res, direct=False)
                if res != prev_value and not pd.isna(res):
                    obj[steps[-1]] = res
                    print(f'\nupdated {row["key"]} with "{res}".\n')
            else:
                print(broad_key_message)
        else:
            print(invalid_key_message)

    with open(json_path, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    df = pd.read_excel(INP_PATH).dropna(subset='key')
    df.apply(row_to_json_obj, axis=1, obj=json_obj)

    with open(json_path, mode='w', encoding='utf-8') as fp:
        json.dump(json_obj, fp, ensure_ascii=False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Script to update values in'
                    ' hebrew locale.')
    allowed_values = ['landing', 'common', 'advisor', 'customer']
    parser.add_argument('-p', '--path', choices=allowed_values,
                        help='filepath to modify.')
    args = parser.parse_args()

    match args.path:
        case 'landing':
            target = LANDING_PAGE_HE_PATH
        case 'common':
            target = COMMON_HE_PATH
        case 'advisor':
            target = ADVISOR_HE_PATH
        case 'customer':
            target = CUSTOMER_HE_PATH
        case _:
            raise ValueError(f'Value should be in {allowed_values}.')

    refresh_address_jsons()
    json_to_sheet(target)
    sheet_to_json(target)
