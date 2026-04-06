# Phase 2 API Setup Guide

This guide covers setting up the 5 API connections needed for Phase 2 agents. Jack will walk through these with Morgan on-site.

---

## 1. YouTube Data API v3 (for [SocialMedia])

**Used for:** Upload Shorts, read analytics, manage channel

### Setup Steps
1. Go to https://console.cloud.google.com
2. Create a new project (or use existing): "Dream Out Loud AI"
3. Enable "YouTube Data API v3" in APIs & Services
4. Create OAuth 2.0 credentials:
   - Application type: Desktop app
   - Download the `client_secret.json`
5. **IMPORTANT:** Go to OAuth consent screen → PUBLISH the app (move from Testing to Production)
   - If left in Testing mode, tokens expire after 7 days
   - Publishing is free and doesn't require review for personal use
6. Add Morgan's YouTube account email as a test user (if not publishing immediately)
7. Place `client_secret.json` in project root (add to .gitignore)
8. First run will open browser for Morgan to grant consent
9. Store refresh token in `.env` as `YOUTUBE_REFRESH_TOKEN`

### MCP Server Config
Add to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "youtube": {
      "command": "node",
      "args": ["scripts/youtube-mcp.js"],
      "env": {
        "YOUTUBE_CLIENT_ID": "from client_secret.json",
        "YOUTUBE_CLIENT_SECRET": "from client_secret.json",
        "YOUTUBE_REFRESH_TOKEN": "from first auth flow"
      }
    }
  }
}
```

### Rate Limits
- 10,000 units/day (default quota)
- Video upload = 1,600 units
- Video list = 1 unit per call
- Request quota increase if needed: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

---

## 2. Meta Graph API (for [SocialMedia])

**Used for:** Instagram/Facebook publishing and analytics

### Setup Steps
1. Go to https://developers.facebook.com
2. Create a new app: Business type, "Dream Out Loud AI"
3. Add Instagram Graph API and Pages API products
4. Connect Morgan's Facebook Page and Instagram Professional account
5. Generate a long-lived access token:
   - Get short-lived token from Graph API Explorer
   - Exchange for long-lived token (60 days):
     ```
     GET https://graph.facebook.com/v19.0/oauth/access_token?
       grant_type=fb_exchange_token&
       client_id={app-id}&
       client_secret={app-secret}&
       fb_exchange_token={short-lived-token}
     ```
6. Store in `.env` as `META_ACCESS_TOKEN`
7. Get Instagram User ID: `GET /me/accounts` → page ID → `GET /{page-id}?fields=instagram_business_account`
8. Store in `.env` as `INSTAGRAM_USER_ID`

### Token Refresh
- Long-lived tokens last 60 days
- Set a reminder to refresh before expiry
- Future: build auto-refresh into the MCP server

### Rate Limits
- 200 calls/user/hour
- Batch requests where possible

---

## 3. GoHighLevel (for [Copywriter] and [RevenueOps])

**Used for:** Email marketing, contact management, pipeline, automation

### Setup Steps
1. Log into Morgan's GHL account
2. Go to Settings → API Keys → Create new API key
3. Name it "AI Team - Read/Write"
4. Permissions needed:
   - Contacts: Read, Write
   - Opportunities: Read, Write
   - Campaigns: Read, Write
   - Workflows: Read
   - Conversations: Read, Write
5. Copy the API key
6. Store in `.env` as `GHL_API_KEY`
7. Get the Location ID from Settings → Business Info
8. Store in `.env` as `GHL_LOCATION_ID`

### GHL MCP Server
The GHL MCP server is already available in Claude Code. Configure credentials:
```json
{
  "mcpServers": {
    "ghl": {
      "env": {
        "GHL_API_KEY": "from step 5",
        "GHL_LOCATION_ID": "from step 7"
      }
    }
  }
}
```

---

## 4. SkoolAPI (for [LeadEducator])

**Used for:** Community monitoring, post management, member analytics

### Setup Steps
1. Go to https://skoolapi.com
2. Sign up / log in
3. Connect Morgan's Skool account
4. Generate an API key
5. Note the community ID / group slug
6. Store in `.env`:
   - `SKOOL_API_KEY` — your API key
   - `SKOOL_GROUP_ID` — Morgan's community identifier

### Key Endpoints
- `GET /groups/{id}/posts` — read community posts
- `POST /groups/{id}/posts` — create a post
- `GET /groups/{id}/members` — list members
- `GET /groups/{id}/analytics` — engagement analytics
- Webhooks available for real-time notifications

### MCP Server Config
```json
{
  "mcpServers": {
    "skool": {
      "command": "node",
      "args": ["scripts/skool-mcp.js"],
      "env": {
        "SKOOL_API_KEY": "from step 4",
        "SKOOL_GROUP_ID": "from step 5"
      }
    }
  }
}
```

---

## 5. Nano Banana 2 (for [LeadEducator] and [Copywriter])

**Used for:** AI image generation for educational materials, funnel visuals, social assets

### Setup Steps
1. Nano Banana 2 is an MCP server — install via Claude Code MCP settings
2. It connects to Gemini for image generation
3. No separate API key needed if using the Dojo project configuration
4. If Morgan needs his own: set up a Google AI Studio API key at https://aistudio.google.com/apikey

### MCP Server Config
The Nano Banana 2 MCP server should already be available. Verify it appears in Claude Code's MCP server list.

If not installed:
```bash
claude mcp add nano-banana-2 -- npx -y nano-banana-mcp
```

---

## Environment File Template

Create `.env` in project root (already in .gitignore):

```bash
# YouTube Data API v3
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=

# Meta Graph API
META_ACCESS_TOKEN=
META_APP_ID=
META_APP_SECRET=
INSTAGRAM_USER_ID=

# GoHighLevel
GHL_API_KEY=
GHL_LOCATION_ID=

# SkoolAPI
SKOOL_API_KEY=
SKOOL_GROUP_ID=

# Existing (from Phase 1)
FATHOM_API_KEY=existing_value
BEACON_TOKEN=existing_value
```

---

## Verification Checklist

After setup, verify each connection:

- [ ] YouTube: `GET https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true` returns Morgan's channel
- [ ] Meta: `GET https://graph.facebook.com/v19.0/me?access_token={token}` returns Morgan's account
- [ ] GHL: `GET https://rest.gohighlevel.com/v1/contacts/?limit=1` with API key returns a contact
- [ ] Skool: `GET /groups/{id}` returns Morgan's community info
- [ ] Nano Banana 2: Generate a test image via Claude Code

---

## Permanent Auth Strategy

All connections must be permanent — no recurring reauth for Morgan.

- **YouTube:** Publish OAuth consent screen (not testing mode). Refresh tokens don't expire when published.
- **Meta:** Long-lived tokens last 60 days. Build auto-refresh or set calendar reminder 7 days before expiry.
- **GHL:** API keys don't expire. Rotate annually for security.
- **Skool:** API keys don't expire unless revoked.
- **Google (general):** Always use refresh tokens, never short-lived access tokens. LaunchAgents for persistent MCP servers.
