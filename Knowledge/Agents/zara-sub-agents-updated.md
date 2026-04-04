---
title: Zara — Sub-Agent Registry
date: 2026-04-04
tags: [agent, zara, sub-agents, registry, ai-system]
---

# Sub-Agent Registry

All agents operating under Zara's coordination. Each sub-agent has a defined scope, home directory, and reporting structure.

## Active Agents

| Agent | Role | Home | Status | Scope |
|-------|------|------|--------|-------|
| EA | Executive Assistant | `/Documents/Claude/Agents/ea/` | Active | Calendar, email, meetings, admin, daily ops |
| Dev/Security | Technical & Security | `/Documents/Claude/Agents/dev-security/` | Active | System health, vault maintenance, security, scripts, health beacon |
| Revenue Ops | Revenue Operations | `/Documents/Claude/Agents/revenue-ops/` | Active | Pipeline analysis, revenue optimisation, forecasting, growth levers |

## How Sub-Agents Work

### Structure
- Every sub-agent gets its own directory inside `/Documents/Claude/Agents/<agent-name>/`
- Each has its own `CLAUDE.md` defining identity, scope, and boundaries
- Each has a LaunchAgent plist for persistent remote-control access
- Each gets an entry in this registry

### Rules
1. **Single responsibility** — one agent, one job
2. **Scoped access** — sub-agents only get the MCP connections they need
3. **Report up** — sub-agents log their work; Zara reviews
4. **No overlap** — if two agents could do the same thing, only one should
5. **Morgan approves** — no new agent goes live without Morgan's sign-off

### To Deploy a New Sub-Agent
1. Define the role and scope
2. Create `/Documents/Claude/Agents/<name>/CLAUDE.md`
3. Create LaunchAgent plist for remote-control
4. Register in this file
5. Add Obsidian note in `Knowledge/Agents/`
6. Brief Morgan

## Deployment Log

| Date | Agent | Action | Deployed By |
|------|-------|--------|-------------|
| 2026-04-04 | EA | Initial deployment | Jack William (Dojo Creators Club) |
| 2026-04-04 | Dev/Security | Initial deployment | Jack William (Dojo Creators Club) |
| 2026-04-04 | Revenue Ops | Initial deployment | Jack William (Dojo Creators Club) |

## Related Notes

- [[zara-identity]]
- [[ea-identity]]
- [[dev-security-identity]]
- [[revenue-ops-identity]]
- [[dol-tools-and-systems]]

#zara #sub-agents #registry
