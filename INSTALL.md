# Merge Instructions — Run These On Morgan's Machine

This is NOT a fresh install. This merges into Morgan's existing system at /Users/morgannelson/Documents/Claude/

## Step 1: Copy new agent directories

```bash
cp -r /tmp/morgan-merge/Agents/ea /Users/morgannelson/Documents/Claude/Agents/ea
cp -r /tmp/morgan-merge/Agents/dev-security /Users/morgannelson/Documents/Claude/Agents/dev-security
cp -r /tmp/morgan-merge/Agents/revenue-ops /Users/morgannelson/Documents/Claude/Agents/revenue-ops
```

## Step 2: Replace root CLAUDE.md (keeps all existing rules, adds agent routing + session recovery)

```bash
cp /Users/morgannelson/Documents/Claude/CLAUDE.md /Users/morgannelson/Documents/Claude/CLAUDE.md.backup
cp /tmp/morgan-merge/CLAUDE.md.upgrade /Users/morgannelson/Documents/Claude/CLAUDE.md
```

## Step 3: Append Zara enhancements (DO NOT replace her CLAUDE.md)

```bash
cat /tmp/morgan-merge/Zara-CLAUDE-additions.md >> /Users/morgannelson/Documents/Claude/Zara/CLAUDE.md
```

## Step 4: Update sub-agent registry

```bash
cp /Users/morgannelson/Documents/Claude/Knowledge/Agents/zara-sub-agents.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/zara-sub-agents.md.backup
cp /tmp/morgan-merge/Knowledge/Agents/zara-sub-agents-updated.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/zara-sub-agents.md
```

## Step 5: Add agent identity files to Knowledge vault

```bash
cp /tmp/morgan-merge/Knowledge/Agents/ea-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
cp /tmp/morgan-merge/Knowledge/Agents/dev-security-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
cp /tmp/morgan-merge/Knowledge/Agents/revenue-ops-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
```

## Step 6: Add health beacon

```bash
cp /tmp/morgan-merge/scripts/health-beacon.js /Users/morgannelson/Documents/Claude/scripts/
```

## Step 7: Create beacon config (LOCAL ONLY — not in git)

```bash
cat > /Users/morgannelson/Documents/Claude/scripts/beacon-config.json << 'EOF'
{
  "beaconUrl": "https://hub.dojomedia.group/api/client-beacon",
  "clientId": "morgan-nelson",
  "clientToken": "8546b342b0165feedb22b27fa38c55ad55ba96fdeb514bc866cfef0f1f1423cf",
  "intervalMs": 300000,
  "projectDir": "/Users/morgannelson/Documents/Claude"
}
EOF
```

## Step 8: Test health beacon

```bash
cd /Users/morgannelson/Documents/Claude
node scripts/health-beacon.js
# Should see "Beacon sent successfully" — Ctrl+C after confirming
```

## Step 9: Start beacon as background process

```bash
nohup node /Users/morgannelson/Documents/Claude/scripts/health-beacon.js > /dev/null 2>&1 &
```

## Step 10: Test the system

```bash
cd /Users/morgannelson/Documents/Claude
claude
# Ask: "Read CLAUDE.md and tell me about my agent team"
```
