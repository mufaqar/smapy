$browser = 'C:\Program Files (x86)\Microsoft\Edge\'`
+ 'Application\msedge.exe'

$eng = 'https://www.bing.com'

$project = 'C:\Users\Nadav\Documents\ALL_PROJECTS\smapy'

$server = 'http://localhost:3002/'
$figma_url = 'https://www.figma.com/file/'`
+ 'sAvmr55UwcNhZNAJ9XGpA6/smapy-design?node-id=294%3A36462&t=vWrvHj8eaAd2tj3q-1'
$shell = "C:\Users\Nadav\AppData\Local\Microsoft\WindowsApps\"`
+ "Microsoft.PowerShell_8wekyb3d8bbwe\pwsh.exe"

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
	python zz_updator.py
	goto $server/$lang
	Set-Location $project/app
	wt -w 0 sp $shell -NoExit -c 'cd $project/app && yarn storybook'
	yarn dev
	 
}


# run commands

Set-Location $project
venv/Scripts/activate
