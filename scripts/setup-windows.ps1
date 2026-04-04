# Catalyst Tier Setup — Windows
# Run from the client's project root directory in PowerShell

Write-Host "=== Catalyst Tier Setup ===" -ForegroundColor Green
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..."
try { node --version | Out-Null } catch { Write-Host "ERROR: Node.js not installed. Install from https://nodejs.org" -ForegroundColor Red; exit 1 }
try { npm --version | Out-Null } catch { Write-Host "ERROR: npm not installed" -ForegroundColor Red; exit 1 }
try { git --version | Out-Null } catch { Write-Host "ERROR: Git not installed" -ForegroundColor Red; exit 1 }
Write-Host "All prerequisites met." -ForegroundColor Green

# Create directory structure
Write-Host ""
Write-Host "Creating directory structure..."
$dirs = @(
    "agents\director",
    "agents\ea",
    "agents\dev-security",
    "agents\specialist",
    "shared",
    "scripts",
    "knowledge\vault\00-Inbox",
    "knowledge\vault\01-Clients",
    "knowledge\vault\02-Business-Intelligence",
    "knowledge\vault\03-Call-Notes",
    "knowledge\vault\04-SOPs",
    "knowledge\vault\05-Brand-Voice",
    "knowledge\vault\06-Research",
    "knowledge\vault\07-Security-Logs",
    "knowledge\vault\08-Agent-Logs",
    "knowledge\vault\09-Finance",
    "knowledge\vault\10-Content-Calendar",
    "knowledge\vault\founder\insights",
    "knowledge\vault\founder\pulse",
    ".claude"
)
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}
Write-Host "Directory structure created." -ForegroundColor Green

# Create .gitignore
@"
.env
node_modules/
scripts/beacon-config.json
scripts/beacon.log
*.log
"@ | Out-File -Encoding utf8 .gitignore

Write-Host ".gitignore created."

# Create vault README
@"
# Knowledge Vault

This is your AI team's shared brain. Every important piece of information gets saved here so your agents can learn and improve over time.
"@ | Out-File -Encoding utf8 "knowledge\vault\README.md"

# Create founder profile
@"
# Founder Profile

This file is automatically updated by the Director agent as it learns about you.

## Communication Preferences
(Will be populated after interactions)

## Decision Patterns
(Will be populated after interactions)

## Business Priorities
(Will be populated after interactions)
"@ | Out-File -Encoding utf8 "knowledge\vault\founder\profile.md"

Write-Host "Vault seeded." -ForegroundColor Green

# Init git if needed
if (!(Test-Path .git)) {
    git init
    git add -A
    git commit -m "Initial setup: Catalyst AI team"
    Write-Host "Git repository initialised." -ForegroundColor Green
} else {
    Write-Host "Git repository already exists."
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Copy agent CLAUDE.md files into agents\*\"
Write-Host "2. Copy root CLAUDE.md into project root"
Write-Host "3. Fill in {{placeholders}} with client details"
Write-Host "4. Configure scripts\beacon-config.json"
Write-Host "5. Run: claude (to start first conversation)"
