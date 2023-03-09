import os
import re
import json
import pprint
import subprocess

from colorama import Fore
from bidi.algorithm import get_display

JSON_PATH = 'app/public/locales/he/landing-page.json'
pp = pprint.PrettyPrinter()


def fmt_bi(content: str):
    """Format hebrew content in correct direction and in one line.
    @:param: content (str) the string to format to html
    """
    pat = re.compile(r'\s+')
    directed = get_display(content)
    return pat.sub(repl=' ', string=directed)


def update_value_in_json(value):
    """Update json file."""
    print(f'{value=}')
    with open(JSON_PATH, mode='r', encoding='utf-8') as fp:
        obj = json.load(fp)
        subset = obj
        while True:
            try:
                print('\n' + Fore.LIGHTYELLOW_EX)
                pp.pprint(obj)
                print('\n' + Fore.RESET)
                loc = input('Enter loc >>> ')
                os.system('cls')
                levels = loc.split('.')
                for key in levels[:-1]:
                    subset = subset[key]
                if isinstance(subset[levels[-1]], str):
                    subset[levels[-1]] = value
                else:
                    raise TypeError
            except KeyError:
                print(f'{Fore.LIGHTRED_EX}"{loc}" is not an existing key.{Fore.RESET}')
                continue
            except TypeError:
                print(f'{Fore.LIGHTRED_EX}"{loc}" is too broad.{Fore.RESET}')
                continue
            else:
                break
    with open(JSON_PATH, mode='w', encoding='utf-8') as fp:
        json.dump(obj, fp)
        print(f'updated {loc} with "{value}"')


def get_content():
    with open('input.txt', mode='w') as fp:
        pass
    subprocess.run(f'notepad {fp.name}')
    with open('input.txt', encoding='utf-8') as fp:
        inp = fp.read()
    return fmt_bi(inp)


if __name__ == '__main__':
    os.system('cls')
    while True:
        update_value_in_json(get_content())
