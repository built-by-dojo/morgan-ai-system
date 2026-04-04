#!/bin/bash
# Catalyst Tier Setup — Mac
# Run from the client's project root directory

set -e

echo "=== Catalyst Tier Setup ==="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
node --version > /dev/null 2>&1 || { echo "ERROR: Node.js not installed. Install from https://nodejs.org"; exit 1; }
npm --version > /dev/null 2>&1 || { echo "ERROR: npm not installed"; exit 1; }
git --version > /dev/null 2>&1 || { echo "ERROR: Git not installed"; exit 1; }
echo "All prerequisites met."

# Create directory structure
echo ""
echo "Creating directory structure..."
mkdir -p agents/{director,ea,dev-security,specialist}
mkdir -p shared
mkdir -p scripts
mkdir -p knowledge/vault/{00-Inbox,01-Clients,02-Business-Intelligence,03-Call-Notes,04-SOPs,05-Brand-Voice,06-Research,07-Security-Logs,08-Agent-Logs,09-Finance,10-Content-Calendar,founder/{insights,pulse}}
mkdir -p .claude

echo "Directory structure created."

# Create .env template
if [ ! -f .env ]; then
  cat > .env.example << 'ENVEOF'
# Client System Environment Variables
# Fill these in during install

# Notion (optional — for tool integration tier)
NOTION_TOKEN=
NOTION_WORKSPACE_ID=

# Other tool integrations go here as they're added
ENVEOF
  echo ".env.example created."
fi

# Create .gitignore
cat > .gitignore << 'GIEOF'
.env
node_modules/
scripts/beacon-config.json
scripts/beacon.log
.DS_Store
*.log
GIEOF

echo ".gitignore created."

# Create vault seed files
cat > knowledge/vault/README.md << 'VEOF'
# Knowledge Vault

This is your AI team's shared brain. Every important piece of information gets saved here so your agents can learn and improve over time.

## Folder Structure
- 00-Inbox: Unsorted items, quick captures
- 01-Clients: Client profiles, call notes, journey maps
- 02-Business-Intelligence: Market research, competitive analysis
- 03-Call-Notes: Meeting notes and action items
- 04-SOPs: Standard operating procedures
- 05-Brand-Voice: Voice guidelines, tone examples
- 06-Research: Industry research, trend analysis
- 07-Security-Logs: Security events and audits
- 08-Agent-Logs: Agent activity and learning logs
- 09-Finance: Financial tracking and reports
- 10-Content-Calendar: Content planning and scheduling
- founder/: Your personal profile and insights (auto-generated)

## How It Works
Your agents automatically save learnings here after every interaction. Over time, this vault becomes an incredibly detailed understanding of your business, your preferences, and your way of working.
VEOF

cat > knowledge/vault/founder/profile.md << 'FPEOF'
# Founder Profile

This file is automatically updated by the Director agent as it learns about you.

## Communication Preferences
(Will be populated after interactions)

## Decision Patterns
(Will be populated after interactions)

## Business Priorities
(Will be populated after interactions)

## Key Relationships
(Will be populated after interactions)

## Schedule Patterns
(Will be populated after interactions)
FPEOF

echo "Vault seeded."

# Init git if needed
if [ ! -d .git ]; then
  git init
  git add -A
  git commit -m "Initial setup: Catalyst AI team"
  echo "Git repository initialised."
else
  echo "Git repository already exists."
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Copy agent CLAUDE.md files into agents/*/"
echo "2. Copy root CLAUDE.md into project root"
echo "3. Fill in {{placeholders}} with client details"
echo "4. Configure scripts/beacon-config.json"
echo "5. Run: claude (to start first conversation)"
echo ""
