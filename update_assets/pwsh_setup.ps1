$browser = 'C:\Program Files (x86)\Microsoft\Edge\'`
+ 'Application\msedge.exe'

$eng = 'https://www.bing.com'

$project = '~\Documents\ALL_PROJECTS\smapy'

$server = 'http://localhost:3002/'

$figma_url = 'https://www.figma.com/file/'`
+ 'sAvmr55UwcNhZNAJ9XGpA6/smapy-design?node-id=294%3A36462&t=vWrvHj8eaAd2tj3q-1'

function goto {
    param($text, [Alias('s')] [switch] $search)

    if ($search) {
        & $browser $eng/search?q=$text
    }

    else {
        & $browser $text
    }
}

function run_smapy {
    param([Alias('l')] $lang = 'he')
    
    Set-Location $project/app
    Start-Job -ScriptBlock {yarn dev} -Name 'dev'

    Set-Location $project
    python extract_he_and_en.py
    python zz_updator.py

    goto $server/$lang
    goto $figma_url

    Set-Location $project/app
    Start-Job -ScriptBlock {yarn storybook} -Name 'storybook'

    
}


# run commands

Set-Location $project
venv/Scripts/activate
