from playwright.sync_api import sync_playwright, TimeoutError
from colorama import Fore

URL_EN = 'http://localhost:3002/system/extract-runtime-translation'
URL_HE = 'http://localhost:3002/he/system/extract-runtime-translation'


def extract(page, url):
    try:
        page.goto(url)
        page.get_by_role('button').first.click()
    except TimeoutError:
        print(f'{Fore.LIGHTRED_EX}could not extract schemas for:\n {url}{Fore.RESET}')
    else:
        print(f'{Fore.LIGHTBLUE_EX}successfully extracted schemas for: \n {url}{Fore.RESET}')


def run():
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        extract(page, URL_EN)
        extract(page, URL_HE)


if __name__ == '__main__':
    run()
