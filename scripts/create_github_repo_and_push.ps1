<#
Creates a GitHub repository under the authenticated user and pushes the current repo.
USAGE (PowerShell):

# 1) Revoke any exposed token you pasted earlier on GitHub immediately.
# 2) Create a new Personal Access Token (classic) with `repo` scope.
# 3) In the same PowerShell session run:
#    $env:GITHUB_TOKEN = "ghp_...your_new_token_here"
#    ./scripts/create_github_repo_and_push.ps1 -RepoName interview-simulator
#
# The script will create the repo, add `origin`, and push your current branch.
# After success, revoke/delete the token if you don't need it stored.
#>
param(
    [string]$RepoName = "interview-simulator"
)

function Fail($msg){ Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

if (-not $env:GITHUB_TOKEN) { Fail "Environment variable GITHUB_TOKEN is not set. Create a PAT and set it: `$env:GITHUB_TOKEN`" }

$token = $env:GITHUB_TOKEN
$headers = @{ Authorization = "token $token"; "User-Agent" = "InterviewSimulatorDeployScript" }
$body = @{ name = $RepoName; description = "Interview Simulator - deployed by script"; private = $false } | ConvertTo-Json

Write-Host "Creating GitHub repository '$RepoName' for the authenticated user..."
try {
    $resp = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ErrorAction Stop
} catch {
    Fail "Failed to create repository: $($_.Exception.Message)"
}

$owner = $resp.owner.login
$repoUrl = "https://github.com/$owner/$RepoName"
Write-Host "Repository created: $repoUrl" -ForegroundColor Green

# Ensure we are in repo root
$cwd = Get-Location
Write-Host "Current folder: $cwd"

# Configure git remote
Write-Host "Configuring git remote 'origin'..."
try {
    git remote remove origin 2>$null
} catch {}

git remote add origin "https://github.com/$owner/$RepoName.git"

# Push using token in URL (temporary auth for push)
$authPushUrl = "https://$token@github.com/$owner/$RepoName.git"
Write-Host "Pushing current branch to GitHub (this will use the token for authentication)..."
try {
    git push $authPushUrl --all
    git push $authPushUrl --tags
} catch {
    Fail "Git push failed: $($_.Exception.Message)"
}

Write-Host "Push complete. Repository URL: $repoUrl" -ForegroundColor Green
Write-Host "IMPORTANT: Revoke the PAT from GitHub.com when finished if you don't need it stored." -ForegroundColor Yellow

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1) Go to Vercel (https://vercel.com) and import the repository: $repoUrl" -NoNewline; Write-Host " (or run vercel CLI locally)" -ForegroundColor Gray
Write-Host "2) In Vercel, set environment variables: MONGODB_URI, CLAUDE_API_KEY, JWT_SECRET, REACT_APP_API_URL" -ForegroundColor Cyan
Write-Host "3) Deploy and test the live site." -ForegroundColor Cyan
