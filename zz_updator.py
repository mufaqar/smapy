from pathlib import Path
import json

from pandas.api.types import is_scalar

SRC_PATH = 'app/public/locales/en'
TARGET_PATH = 'app/public/locales/zz'


def gen_address_json(src_path: Path, target_path: Path):
    """Return new json obj."""
    with open(src_path, encoding='utf-8') as fp:
        json_obj = json.load(fp)

    def fill_values(obj: dict, prev_keys: tuple = ()):
        """rewrite `obj` to hold its addresses."""
        for key in obj:
            current_value = obj[key]
            current_loc = prev_keys + (key,)
            if is_scalar(current_value):
                obj[key] = '.'.join(current_loc)
            else:
                fill_values(current_value,
                            prev_keys=current_loc)

    fill_values(json_obj)

    with open(target_path, encoding='utf8',
              mode='w') as fp:
        json.dump(json_obj, fp)


def refresh_address_jsons(src_dir: str = SRC_PATH, target_dir: str = TARGET_PATH):
    """Copy given directory json files to another directory."""
    src_dir = Path(src_dir)
    target_dir = Path(target_dir)
    file_gen = src_dir.glob('*.json')

    for item in file_gen:
        new_path = target_dir.joinpath(item.name)
        gen_address_json(item, new_path)


if __name__ == '__main__':
    refresh_address_jsons()
