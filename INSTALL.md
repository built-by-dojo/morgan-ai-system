# Phase 2 Merge Instructions — Run These On Morgan's Machine

This merges Phase 2 agents into Morgan's existing system at /Users/morgannelson/Documents/Claude/

Phase 1 agents (EA, Dev/Security, Revenue Ops) are already deployed. This adds: Social Media Manager, Copywriter, Lead Educator, plus system-dna.md and capabilities-registry.md.

## Pre-Flight Check

```bash
# Verify existing system is intact
ls /Users/morgannelson/Documents/Claude/CLAUDE.md
ls /Users/morgannelson/Documents/Claude/Agents/ea/CLAUDE.md
ls /Users/morgannelson/Documents/Claude/Agents/dev-security/CLAUDE.md
ls /Users/morgannelson/Documents/Claude/Agents/specialist/CLAUDE.md
ls /Users/morgannelson/Documents/Claude/Knowledge/
```

## Step 1: Backup current root CLAUDE.md

```bash
cp /Users/morgannelson/Documents/Claude/CLAUDE.md /Users/morgannelson/Documents/Claude/CLAUDE.md.phase1-backup
```

## Step 2: Copy new agent directories

```bash
cp -r agents/social-media-manager /Users/morgannelson/Documents/Claude/Agents/social-media-manager
cp -r agents/copywriter /Users/morgannelson/Documents/Claude/Agents/copywriter
cp -r agents/lead-educator /Users/morgannelson/Documents/Claude/Agents/lead-educator
```

NOTE: Template uses lowercase `agents/`, Morgan's system uses `Agents/` (capital A). The cp commands above handle this.

## Step 3: Deploy system-dna and capabilities-registry

```bash
mkdir -p /Users/morgannelson/Documents/Claude/shared
cp shared/system-dna.md /Users/morgannelson/Documents/Claude/shared/
cp shared/capabilities-registry.md /Users/morgannelson/Documents/Claude/shared/
cp shared/config.md /Users/morgannelson/Documents/Claude/shared/
```

## Step 4: Update root CLAUDE.md (unified Zara config with all 7 agents)

```bash
cp CLAUDE.md /Users/morgannelson/Documents/Claude/CLAUDE.md
```

## Step 5: Update AGENTS.md

```bash
cp AGENTS.md /Users/morgannelson/Documents/Claude/AGENTS.md
```

## Step 6: Update existing agent CLAUDE.md files (adds system-dna reference)

```bash
cp agents/ea/CLAUDE.md /Users/morgannelson/Documents/Claude/Agents/ea/CLAUDE.md
cp agents/dev-security/CLAUDE.md /Users/morgannelson/Documents/Claude/Agents/dev-security/CLAUDE.md
cp agents/revenue-ops/CLAUDE.md /Users/morgannelson/Documents/Claude/Agents/revenue-ops/CLAUDE.md
cp agents/specialist/CLAUDE.md /Users/morgannelson/Documents/Claude/Agents/specialist/CLAUDE.md
cp agents/director/CLAUDE.md /Users/morgannelson/Documents/Claude/Agents/director/CLAUDE.md
```

## Step 7: Update Knowledge vault with new agent identities

```bash
cp Knowledge/Agents/social-media-manager-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
cp Knowledge/Agents/copywriter-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
cp Knowledge/Agents/lead-educator-identity.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/
cp Knowledge/Agents/zara-sub-agents-updated.md /Users/morgannelson/Documents/Claude/Knowledge/Agents/zara-sub-agents.md
```

## Step 8: Create vault directories for new agents

```bash
cd /Users/morgannelson/Documents/Claude
mkdir -p Knowledge/analytics/social
mkdir -p Knowledge/content/copy/emails
mkdir -p Knowledge/content/copy/funnels
mkdir -p Knowledge/content/copy/captions
mkdir -p Knowledge/content/copy/templates
mkdir -p Knowledge/content/calendar
mkdir -p Knowledge/content/published
mkdir -p Knowledge/education/frameworks
mkdir -p Knowledge/education/recordings
mkdir -p Knowledge/education/materials
mkdir -p Knowledge/education/students
mkdir -p Knowledge/education/community
mkdir -p Knowledge/brand
mkdir -p Knowledge/Context/founder-insights
```

## Step 9: Fix system-dna.md path references in new agent CLAUDE.md files

The template uses `../../shared/system-dna.md`. On Morgan's machine, the path from `Agents/social-media-manager/` to `shared/` is also `../../shared/system-dna.md`. Verify:

```bash
# This should output the file contents
cat /Users/morgannelson/Documents/Claude/Agents/social-media-manager/../../shared/system-dna.md
```

If the path doesn't resolve, adjust the system-dna reference in each new agent CLAUDE.md.

## Step 10: Set up API credentials

See `scripts/api-setup-guide.md` for detailed instructions. Jack walks through each with Morgan:

1. YouTube Data API v3 (OAuth 2.0 — needs browser consent)
2. Meta Graph API (long-lived access token)
3. GoHighLevel (API key from GHL settings)
4. SkoolAPI (API key from skoolapi.com)
5. Nano Banana 2 (MCP server install)

Create `.env` in project root with all credentials.

## Step 11: Verify the system

```bash
cd /Users/morgannelson/Documents/Claude
claude
# Ask: "Read CLAUDE.md and tell me about my full agent team"
# Should list all 7 agents with correct tags and roles
```

## Step 12: Test each new agent

```bash
# In Claude Code:
# "As [SocialMedia], what's your role and what APIs do you use?"
# "As [Copywriter], describe Morgan's voice guidelines"
# "As [LeadEducator], what Skool capabilities do you have?"
```

## Step 13: Commit and push

```bash
cd /Users/morgannelson/Documents/Claude
git add -A
git commit -m "feat: Phase 2 deployment — Social Media Manager, Copywriter, Lead Educator"
git push origin main
```
