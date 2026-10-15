# Build Hostinger production package: cortexx-app/ (private) + public_html/ (web root)
$ErrorActionPreference = 'Stop'
$src = 'C:\xampp\htdocs\cortexx'
$out = 'C:\Users\Cyb3r\AppData\Local\Temp\marsai\cortexx-deploy'
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
$app = "$out\cortexx-app"; $pub = "$out\public_html"
New-Item -ItemType Directory -Force -Path $app,$pub | Out-Null

# --- private app ---
foreach ($d in 'app','bootstrap','config','resources','routes','storage') {
    Copy-Item "$src\$d" "$app\$d" -Recurse
}
Copy-Item "$src\composer.json","$src\composer.lock" $app
Copy-Item "$src\.env.example" "$app\.env.production.example"

# empty runtime artifacts — ship dir structure only
Remove-Item "$app\storage\logs\*" -Force -ErrorAction SilentlyContinue
Set-Content "$app\storage\logs\.gitkeep" ''

# production vendor from lockfile
Push-Location $app
composer install --no-dev --optimize-autoloader --quiet
Pop-Location

# strip vendor tests/docs/examples — private dir anyway, but keeps package lean
Get-ChildItem "$app\vendor" -Recurse -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -match '^(test|tests|docs|examples|\.github|\.phan)$' } |
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# --- web root ---
Copy-Item "$src\public\assets" "$pub\assets" -Recurse
Copy-Item "$src\public\.htaccess" "$pub\.htaccess"

# bootstrap index that reaches the private app dir (ASCII only)
@'
<?php
// Cortexx production entry - private app lives one level above public_html.
// Adjust CORTEXX_APP_DIR if you placed cortexx-app elsewhere.
$appDir = getenv('CORTEXX_APP_DIR') ?: dirname(__DIR__) . '/cortexx-app';
$app = require $appDir . '/bootstrap/app.php';
$app->run();
'@ | Set-Content -Encoding ascii "$pub\index.php"

# deny dotfiles in web root (assets .htaccess already handles routing)
@"
<FilesMatch `"^\.`">
  Require all denied
</FilesMatch>
"@ | Add-Content "$pub\.htaccess"

Write-Host "Package built at $out"
Get-ChildItem $out -Recurse -File | Measure-Object Length -Sum | ForEach-Object { "{0:N1} MB total" -f ($_.Sum/1MB) }
