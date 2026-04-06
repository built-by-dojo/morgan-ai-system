# Agent System Configuration

## Agent Registry

| Agent | Tag | Directory | Status |
|-------|-----|-----------|--------|
| Director (Zara) | [Director] | `/` | Active |
| EA | [EA] | `agents/ea/` | Active |
| Revenue Ops | [RevenueOps] | `agents/specialist/` | Active |
| Dev/Security | [Dev] | `agents/dev-security/` | Active |
| Social Media Manager | [SocialMedia] | `agents/social-media-manager/` | Active |
| Copywriter | [Copywriter] | `agents/copywriter/` | Active |
| Lead Educator | [LeadEducator] | `agents/lead-educator/` | Active |

## Routing Rules

1. Default handler: Director (root CLAUDE.md)
2. Calendar, email triage, meetings, admin, briefings → [EA]
3. Technical, security, vault, scripts, system maintenance → [Dev]
4. Revenue, pipeline, pricing, forecasting, financial analysis → [RevenueOps]
5. YouTube, Instagram, Facebook, content publishing, platform analytics → [SocialMedia]
6. Email copy, funnel writing, sales pages, captions, brand voice → [Copywriter]
7. Curriculum, lesson plans, Skool community, student questions, workbooks, workshops → [LeadEducator]
8. Strategy, cross-functional, ambiguous → [Director]

## Cross-Agent Routing (agent-to-agent)

| From | To | Trigger |
|------|----|---------|
| [Copywriter] | [SocialMedia] | Caption/content ready for publishing |
| [SocialMedia] | [RevenueOps] | Performance data for funnel attribution |
| [SocialMedia] | [Copywriter] | Copy performance feedback |
| [LeadEducator] | [Copywriter] | Student language and pain points |
| [LeadEducator] | [RevenueOps] | Retention signals (at-risk/upsell-ready members) |
| [Copywriter] | [RevenueOps] | Email performance data |
| Any agent | [Director] | Strategic decisions, blockers, approvals |
| Any agent | [Dev] | Technical issues, API errors, system problems |

## Escalation Rules

1. Agent stuck for >2 attempts → escalate to Director
2. Director stuck → present options to Morgan (never guess)
3. Security concern → [Dev] handles immediately, logs to vault
4. Financial decision → always escalate to Morgan
5. Publishing content → [Director] or Morgan approves first
6. Email to full list → Morgan must approve
7. Student welfare concern → [Director] immediately

## Git Rules

- Commit after significant changes (agent configs, vault updates, scripts)
- Commit message format: "type: description" (fix:, feat:, docs:, vault:)
- Never commit .env, credentials, or sensitive data
- Push to remote at end of each work session

## Vault Directories

```
Knowledge/
  Agents/              ← Agent identity docs, session logs
  Context/             ← Business context, founder profile, financial intel
  Decisions/           ← Decision log with reasoning
  Fathom/              ← Call transcripts, meeting intelligence
  Learnings/           ← Insights, patterns, gotchas
  Projects/            ← Project status, goals, milestones
  analytics/
    social/            ← [SocialMedia] writes, [RevenueOps] reads
  brand/
    voice-notes.md     ← [Copywriter] maintains
  content/
    copy/
      emails/          ← [Copywriter] writes
      funnels/         ← [Copywriter] writes
      captions/        ← [Copywriter] writes, [SocialMedia] reads
      templates/       ← [Copywriter] maintains
    calendar/          ← [SocialMedia] maintains
    published/         ← [SocialMedia] logs published content
  education/
    frameworks/        ← [LeadEducator] writes
    curriculum-map.md
    recordings/        ← [LeadEducator] writes (Fathom/Skool analysis)
    materials/         ← [LeadEducator] writes (lesson plans, workbooks)
    students/          ← [LeadEducator] writes (anonymised patterns)
    community/         ← [LeadEducator] writes (weekly reports)
```

## API Connections (Phase 2)

| API | Used By | Auth Method | Notes |
|-----|---------|-------------|-------|
| YouTube Data API v3 | [SocialMedia] | OAuth 2.0 (Google Cloud) | 10K units/day, uploads cost 1600 |
| Meta Graph API | [SocialMedia] | Long-lived access token | 200 calls/user/hour |
| GoHighLevel | [Copywriter], [RevenueOps] | API key | Email marketing, pipeline |
| SkoolAPI | [LeadEducator] | API key in headers | Third-party API (skoolapi.com) |
| Nano Banana 2 | [LeadEducator], [Copywriter] | MCP server | AI image generation |
| Fathom | [EA], [LeadEducator] | API key | Call transcripts |
