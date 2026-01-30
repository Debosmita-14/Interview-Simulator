#!/usr/bin/env pwsh
<#
  Simple Git Push Helper for GitHub
  
  USAGE (in PowerShell):
    1. Create a new PAT at https://github.com/settings/tokens (select "repo" scope)
    2. Run:
       $env:GITHUB_TOKEN = "ghp_YourNewTokenHere"
       .\push_to_github.ps1
    
    Token is used only locally in this session, not sent anywhere else.
#>

if (-not $env:GITHUB_TOKEN) {
    Write-Host "ERROR: GITHUB_TOKEN not set" -ForegroundColor Red
    Write-Host "Set it with: `$env:GITHUB_TOKEN = 'ghp_...'" -ForegroundColor Yellow
    exit 1
}

$repo = "https://github.com/Debosmita-14/Interview-Simulator.git"
Write-Host "Pushing to: $repo" -ForegroundColor Cyan

git branch -M main 2>$null
git remote remove origin 2>$null
git remote add origin $repo

$authUrl = "https://$($env:GITHUB_TOKEN)@github.com/Debosmita-14/Interview-Simulator.git"
git push $authUrl --all
git push $authUrl --tags

Write-Host "✅ Push complete!" -ForegroundColor Green
Write-Host "Next: Go to https://vercel.com and import the repo" -ForegroundColor Cyan
