# Agent System Configuration

## Agent Registry

| Agent | Tag | Directory | Status |
|-------|-----|-----------|--------|
| Director | [Director] | `/` | Active |
| EA | [EA] | `agents/ea/` | Active |
| Dev/Security | [Dev] | `agents/dev-security/` | Active |
| Specialist | [Specialist] | `agents/specialist/` | Active |

## Routing Rules

1. Default handler: Director (root CLAUDE.md)
2. Calendar, email, meetings, admin → [EA]
3. Technical, security, vault, scripts → [Dev]
4. revenue operations-specific, domain expertise → [Specialist]
5. Strategy, cross-functional, ambiguous → [Director]

## Escalation Rules

1. Agent stuck for >2 attempts → escalate to Director
2. Director stuck → present options to Morgan (never guess)
3. Security concern → [Dev] handles immediately, logs to vault
4. Financial decision → always escalate to Morgan

## Git Rules

- Commit after significant changes (agent configs, vault updates, scripts)
- Commit message format: "type: description" (fix:, feat:, docs:, vault:)
- Never commit .env, credentials, or sensitive data
- Push to remote at end of each work session
