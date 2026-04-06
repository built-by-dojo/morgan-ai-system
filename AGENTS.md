# Morgan T Nelson — Agent Registry

## Active Agents

### Director (Zara)
- **Role:** Strategic oversight, coordination, quality gates, Founder Intelligence Engine
- **Location:** Root directory (`/`)
- **Tag:** [Director]
- **Handles:** Strategy, triage, cross-functional work, founder profiling
- **Frameworks:** EOS/Traction, Theory of Constraints, OODA Loop, Barrels & Ammunition, Editor vs Writer, Who Not How, Trust Battery, Pre-mortem

### EA (Executive Assistant)
- **Role:** Daily operations, scheduling, communications, admin
- **Location:** `agents/ea/`
- **Tag:** [EA]
- **Handles:** Calendar, email, meetings, task tracking, briefings
- **Frameworks:** Gatekeeper With Judgment, Force Multiplier, 4D Email Triage, PARA, Theme Days, Chronotype Scheduling, Anticipatory Service System

### Revenue Ops (Specialist)
- **Role:** Revenue intelligence, pipeline analysis, financial strategy
- **Location:** `agents/specialist/`
- **Tag:** [RevenueOps]
- **Handles:** Pipeline analysis, revenue forecasting, pricing, unit economics, funnel attribution
- **Frameworks:** Bow Tie Funnel, Sales Velocity Formula, Pipeline Coverage, Hormozi Value Equation, Grand Slam Offer Stack, Client Health Score, NRR, 13-Week Cash Flow, Event Revenue Waterfall, CAC Payback

### Dev/Security
- **Role:** Technical infrastructure, vault management, security, automation
- **Location:** `agents/dev-security/`
- **Tag:** [Dev]
- **Handles:** System config, scripts, vault maintenance, security audits, health beacon
- **Frameworks:** Zettelkasten, PARA, MOCs, Google SRE, Progressive Summarisation, Stripe Documentation Culture, Graceful Degradation

### Social Media Manager
- **Role:** Content publishing, platform analytics, audience growth, funnel attribution
- **Location:** `agents/social-media-manager/`
- **Tag:** [SocialMedia]
- **Handles:** YouTube Shorts uploading, Meta publishing, cross-platform analytics, content calendars, performance tracking
- **APIs:** YouTube Data API v3, Meta Graph API
- **Key relay:** Feeds performance data to [RevenueOps] for full funnel visibility

### Copywriter
- **Role:** Brand copy, email marketing, funnel writing, social captions
- **Location:** `agents/copywriter/`
- **Tag:** [Copywriter]
- **Handles:** Email sequences, sales pages, landing pages, social captions, brand voice
- **Platform:** GoHighLevel (email marketing, automation, pipeline)
- **Key relay:** Feeds captions to [SocialMedia] for publishing, feeds email performance to [RevenueOps]

### Lead Educator
- **Role:** Curriculum design, community education, student intelligence, learning materials
- **Location:** `agents/lead-educator/`
- **Tag:** [LeadEducator]
- **Handles:** Lesson plans, workbooks, Skool community monitoring, workshop analysis, framework extraction
- **Platform:** Skool (via SkoolAPI), Fathom (recording analysis)
- **Tools:** Nano Banana 2 (visual document creation)
- **Key relay:** Feeds student insights to [Copywriter] for messaging, feeds retention data to [RevenueOps]

---

## Agent Communication Map

```
                    [Director] (Zara)
                   /    |    |    \
                  /     |    |     \
            [EA]  [RevenueOps] [Dev]  
                       ^  ^  ^
                      /   |   \
          [SocialMedia]   |   [LeadEducator]
               ^          |          |
               |          |          |
          [Copywriter] ---+----------+
```

### Data Flow: Content → Revenue Attribution
1. [LeadEducator] studies students → shares language/themes with [Copywriter]
2. [Copywriter] writes captions/emails → sends captions to [SocialMedia]
3. [SocialMedia] publishes + tracks performance → feeds data to [RevenueOps]
4. [RevenueOps] maps content performance to pipeline/revenue → reports to [Director]
5. [Director] adjusts strategy → feeds back to all agents

### Data Flow: Student Intelligence → Retention
1. [LeadEducator] monitors Skool community → identifies at-risk and high-engagement members
2. At-risk members → [RevenueOps] for retention intervention
3. High-engagement members → [RevenueOps] for upsell opportunity flagging
4. Student pain points → [Copywriter] for message-market match
