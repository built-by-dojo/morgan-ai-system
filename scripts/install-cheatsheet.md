# Catalyst Tier Install — Command Cheatsheet
# Save on your phone. Every command you need, in order.
# This is for Morgan Nelson — Mac install.

---

## BEFORE YOU ARRIVE

### 1. Generate client token on YOUR machine (one command)

Open a terminal on YOUR Mac and run:

```bash
curl -sk -X POST https://localhost:3500/api/client-tokens -H "Content-Type: application/json" -H "Cookie: YOUR_SESSION_COOKIE" -d '{"clientId":"morgan-nelson","name":"Morgan Nelson","tier":"catalyst"}'
```

SAVE THE TOKEN IT RETURNS. You need it for the beacon config.

### 2. Files you need (on your phone or USB)

Everything is in: `miyagi/client-scaffolding/catalyst-template/`

- CLAUDE.md (root)
- AGENTS.md
- agents/*/CLAUDE.md (all 4)
- shared/config.md
- scripts/health-beacon.js
- scripts/beacon-config.example.json
- scripts/setup-prompt.md
- scripts/setup-mac.sh

OR just AirDrop the whole catalyst-template folder to Morgan's Mac.

---

## HOUR 1 — DISCOVERY + CONSOLIDATION (30 min)

### Verbal discovery (15 min)
Ask Morgan:
1. What does your business actually do day-to-day?
2. Who's on your team and what do they handle?
3. What tools do you use? (CRM, email, calendar, project management)
4. What takes up most of your time that shouldn't?
5. What does a perfect week look like for you?

### System scan
```bash
node --version
npm --version
git --version
echo $SHELL
```

### Find or create project directory
```bash
# If Morgan has an existing project:
cd ~/path/to/project

# If starting fresh:
mkdir -p ~/Documents/morgan-ai && cd ~/Documents/morgan-ai
```

---

## HOUR 2 — SCAFFOLDING + AGENTS (45 min)

### Run setup script
```bash
chmod +x scripts/setup-mac.sh
bash scripts/setup-mac.sh
```

### Copy all CLAUDE.md files
```bash
# Root CLAUDE.md and AGENTS.md should already be in place from setup
# Verify:
cat CLAUDE.md | head -5
cat AGENTS.md | head -5
cat agents/director/CLAUDE.md | head -5
cat agents/ea/CLAUDE.md | head -5
cat agents/dev-security/CLAUDE.md | head -5
cat agents/specialist/CLAUDE.md | head -5
```

### Fill in placeholders
Replace these in ALL files:
- Morgan → Morgan
- revenue operations → whatever Morgan's industry is
-  → domain-specific context from discovery

Use find-and-replace:
```bash
# Example (adjust for Morgan's actual details):
find . -name "CLAUDE.md" -o -name "AGENTS.md" -o -name "config.md" | xargs sed -i '' 's/Morgan/Morgan/g'
find . -name "CLAUDE.md" -o -name "AGENTS.md" -o -name "config.md" | xargs sed -i '' 's/revenue operations/coaching/g'
```

### Configure health beacon
```bash
cp scripts/beacon-config.example.json scripts/beacon-config.json
```

Edit `scripts/beacon-config.json`:
```json
{
  "beaconUrl": "https://hub.dojomedia.group/api/client-beacon",
  "clientId": "morgan-nelson",
  "clientToken": "THE_TOKEN_FROM_STEP_1",
  "intervalMs": 300000,
  "projectDir": "/Users/morgan/Documents/morgan-ai"
}
```

### Install Claude Code (if not installed)
```bash
npm install -g @anthropic-ai/claude-code
```

### Log in with YOUR account (temporary)
```bash
claude
# Auth in browser with YOUR Anthropic account — temporary for setup/testing
```

---

## HOUR 3 — VAULT + REMOTE ACCESS (30 min)

### Connect Obsidian vault
```bash
# If Morgan already has Obsidian:
ln -s /path/to/morgans/vault knowledge/vault

# If new vault:
# Already created by setup script. Open Obsidian → Open Vault → select knowledge/vault/
```

### Disable sleep
```bash
sudo pmset -a disablesleep 1
# OR for non-sudo:
caffeinate -s &
```

### VS Code Tunnel
```bash
code tunnel --name morgan-ai --accept-server-license-terms
# Follow prompts to auth with Morgan's GitHub
# Then install as service:
code tunnel service install
```

### Claude Remote Control
```bash
claude remote-control --spawn=same-dir
# Morgan opens Claude app on phone → should see remote session
```

### IMPORTANT: Account swap
```bash
# Sign out YOUR account
claude /logout

# Sign in with MORGAN'S account
claude /login
# Morgan logs in with their Anthropic account (needs Max subscription)
```

### Start health beacon
```bash
# Test first:
node scripts/health-beacon.js
# Should see "Beacon sent successfully"
# Ctrl+C to stop

# Run as background process:
nohup node scripts/health-beacon.js > /dev/null 2>&1 &

# For persistence (LaunchAgent):
# Create ~/Library/LaunchAgents/com.dojo.health-beacon.plist
```

---

## HOUR 4 — TESTING + HANDOFF (30 min)

### Run first conversation
```bash
cd ~/Documents/morgan-ai
claude
# Paste contents of scripts/setup-prompt.md
```

### Quick wins to demo:
1. "What do you know about me so far?" (tests founder intelligence)
2. "Help me prep for my next meeting" (tests EA routing)
3. "What's in my vault?" (tests Dev agent)
4. "What trends should I watch in [industry]?" (tests Specialist)

### Git commit + push
```bash
git add -A
git commit -m "feat: Catalyst AI team installed and configured"
git remote add origin [MORGAN_REPO_URL]
git push -u origin main
```

### Verify health beacon on YOUR dashboard
On your Mac, check:
```bash
curl -sk https://localhost:3500/api/client-beacons | python3 -m json.tool
```
Should show Morgan's latest beacon.

### Create Notion handoff guide
Use the template — fill in Morgan's specifics.

---

## ISOLATION RULES

### Protecting YOUR system:
- Sign out YOUR Anthropic account before leaving
- Do NOT clone dojo-agents to Morgan's machine
- Do NOT copy orchestrator code, agent configs, or routing tables
- The template is standalone — references nothing from your system
- The health beacon only sends TO your system, never reads FROM it

### Protecting MORGAN'S system:
- Do NOT restructure existing files
- Do NOT import your conventions
- The agents are built for Morgan's business, not yours

### What you CAN take home:
- Notes on pain points (helps productise)
- What confused Morgan (helps improve onboarding)
- Save insights to Miyagi memory when you get home

---

## IF THINGS GO WRONG

### Remote doesn't show on phone
1. Check account: `claude /login` — must be Morgan's account
2. Clear cache: `rm ~/.claude/statsig.*`
3. Restart: `claude /logout` → `claude /login` → `claude remote-control --spawn=same-dir`

### Beacon won't send
1. Check config: `cat scripts/beacon-config.json`
2. Check network: `curl -s https://hub.dojomedia.group/health`
3. Check token: token must match what you generated in Step 1

### Claude can't read files
1. Check you're in project directory: `pwd`
2. Check CLAUDE.md exists: `ls -la CLAUDE.md`
3. Check .claude/settings.json allows tools
