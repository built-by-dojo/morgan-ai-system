# Capabilities Registry — Dream Out Loud AI Team

Before building or recommending anything new, CHECK THIS FILE. If the capability exists, use it. If another agent owns it, route to them.

Last updated: 2026-04-06

---

## Communication & Scheduling

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| Email triage & drafting | [EA] | Gmail MCP | morgantnelson93@gmail.com |
| Calendar management | [EA] | Google Calendar MCP | 12 calendars |
| Meeting prep briefs | [EA] | Fathom + vault context | Pre-meeting intelligence |
| Post-meeting capture | [EA] | Manual + Fathom transcripts | Action items, decisions, follow-ups |
| Slack monitoring | [Zara] | Slack MCP | mn-dream-team.slack.com |
| Notion workspace | [Zara] | Notion MCP | Payment tracking, SOPs, databases |

## Content Creation & Copy

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| Email sequences (GHL) | [Copywriter] | GoHighLevel API | Welcome, launch, nurture, re-engagement |
| Broadcast emails | [Copywriter] | GoHighLevel API | One-off announcements, promos |
| Sales page copy | [Copywriter] | Hormozi frameworks | Long-form conversion copy |
| Landing page copy | [Copywriter] | Funnel frameworks | Opt-in, webinar, event sign-ups |
| Social media captions | [Copywriter] | Brand voice calibrated | Feeds to [SocialMedia] for publishing |
| YouTube descriptions | [Copywriter] | SEO-optimised | Timestamps, links, tags |
| Brand voice maintenance | [Copywriter] | Knowledge/brand/voice-notes.md | Continuously updated |

## Publishing & Distribution

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| YouTube Shorts upload | [SocialMedia] | YouTube Data API v3 | 10K units/day quota |
| YouTube analytics | [SocialMedia] | YouTube Data API v3 | Views, CTR, retention, subscribers |
| Instagram/Facebook publishing | [SocialMedia] | Meta Graph API | 200 calls/user/hour |
| Instagram/Facebook analytics | [SocialMedia] | Meta Graph API | Reach, engagement, follower growth |
| Content calendar management | [SocialMedia] | Knowledge/content/calendar/ | Upcoming, published, ideas |
| Cross-platform performance reports | [SocialMedia] | Multi-API aggregation | Daily snapshots, weekly full reports |

## Revenue & Pipeline

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| Pipeline analysis | [RevenueOps] | GHL pipeline data | Bottlenecks, conversion rates, velocity |
| Revenue forecasting | [RevenueOps] | Financial models | Projections, risk flags |
| Pricing optimisation | [RevenueOps] | Value analysis | Ceilings, sensitivity, packaging |
| Unit economics | [RevenueOps] | CAC/LTV/payback models | Cohort tracking, margin analysis |
| Full funnel attribution | [RevenueOps] | Data from [SocialMedia] | Content → leads → pipeline → revenue |
| Event revenue modelling | [RevenueOps] | Revenue waterfall | DreamFest 2026 and future events |
| GHL contact management | [Copywriter]/[RevenueOps] | GoHighLevel API | Contacts, tags, automation |

## Education & Community

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| Skool community monitoring | [LeadEducator] | SkoolAPI | Posts, comments, engagement patterns |
| Student pattern analysis | [LeadEducator] | SkoolAPI + vault | Segments, pain points, breakthroughs |
| Framework extraction | [LeadEducator] | Fathom + Skool recordings | Morgan's teaching models documented |
| Lesson plan creation | [LeadEducator] | Structured template | Hook → Framework → Practice → Action |
| Workbook design | [LeadEducator] | Nano Banana 2 + design tools | Branded, action-oriented materials |
| Curriculum mapping | [LeadEducator] | Knowledge/education/ | Full program structure |
| Community health reports | [LeadEducator] | SkoolAPI analytics | Weekly engagement and retention signals |

## Design & Visual

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| AI image generation | All | Nano Banana 2 MCP | Visual assets, mockups, diagrams |
| UI component generation | All | 21st.dev Magic MCP | Production-grade React components |
| UI design concepts | All | Google Stitch MCP | HTML/CSS from text descriptions |
| UI component library | All | shadcn-ui MCP | Consistent, accessible components |
| UX validation | All | UI UX Pro Max skill | 67 styles, 96 palettes, behavioural UX |
| Frontend implementation | All | Frontend Design skill | High-fidelity builds |

## Infrastructure & System

| Capability | Owner | Tool/Method | Notes |
|-----------|-------|-------------|-------|
| Knowledge vault maintenance | [Dev] | File system (Obsidian) | Formatting, wikilinks, deduplication |
| System troubleshooting | [Dev] | Scripts, config | MCP servers, API connections |
| Security audits | [Dev] | Manual review | Credentials, access, exposure |
| Health beacon monitoring | [Dev] | scripts/health-beacon.js | Managed support service component |
| Script writing & automation | [Dev] | Bash, Node.js | Custom automation as needed |

## External Services Connected

| Service | Auth Method | Used By | Status |
|---------|------------|---------|--------|
| Gmail | MCP integration | [EA] | Active |
| Google Calendar | MCP integration | [EA] | Active |
| Slack | MCP integration | [Zara] | Active |
| Notion | MCP integration | [Zara], [EA] | Active |
| Fathom | API key | [EA], [LeadEducator] | Active |
| GoHighLevel | API key | [Copywriter], [RevenueOps] | Pending setup |
| YouTube Data API v3 | OAuth 2.0 | [SocialMedia] | Pending setup |
| Meta Graph API | Long-lived token | [SocialMedia] | Pending setup |
| SkoolAPI | API key | [LeadEducator] | Pending setup |
| Nano Banana 2 | MCP server | [LeadEducator], [Copywriter] | Pending setup |

---

## How to Update This File

When a new capability is added to any agent:
1. Add it to the relevant section above
2. Include: what it does, who owns it, what tool/method, any notes
3. Update the "Last updated" date at the top

When a capability is removed or deprecated:
1. Remove the row
2. Don't leave commented-out entries
