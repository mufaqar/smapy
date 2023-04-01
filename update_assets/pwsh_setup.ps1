$browser = 'C:\Program Files (x86)\Microsoft\Edge\'`
+ 'Application\msedge.exe'

$eng = 'https://www.bing.com'

$project = 'C:\Users\Nadav\Documents\ALL_PROJECTS\smapy'

$server = 'http://localhost:3002/'

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
	goto $server/$lang
	Set-Location $project/app
	wt -w 0 sp $shell -NoExit -c 'cd $project/app && yarn storybook'
	yarn dev
	 
}


# run commands

Set-Location $project
venv/Scripts/activate
