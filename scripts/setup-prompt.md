# First Conversation Prompt — Catalyst Tier

Paste this into Claude Code after the scaffolding is set up. This is the "first conversation" that teaches Claude about the system.

---

## PASTE THIS INTO CLAUDE CODE:

Hi — I'm Morgan. You've just been set up as the Director of my AI team inside Claude Code. Before we start working together, I need you to get oriented.

Please do the following:

1. Read the CLAUDE.md file in this project root. Understand your role as Director and how the agent team works.

2. Read AGENTS.md to understand the full team: Director, EA, Dev/Security, and Specialist.

3. Explore the folder structure. Confirm these directories exist:
   - agents/ (with 4 agent subdirectories)
   - knowledge/vault/ (with the 11 standard folders)
   - scripts/ (with the health beacon)
   - shared/ (with system config)

4. Read each agent's CLAUDE.md in agents/*/ and give me a one-line summary of what each one does.

5. Check if knowledge/vault/founder/profile.md exists. If it does, that's where you'll store what you learn about me over time.

6. Check if scripts/beacon-config.json exists (not the .example file). If it does, confirm the health beacon is configured (don't show me the values).

7. Tell me what's NOT set up yet and what I should configure.

After all that, suggest the single most impactful thing we can do together right now in 15 minutes.

---

## NOTES FOR JACK:

- This prompt orients the Director agent without the client explaining everything
- It surfaces gaps in the setup immediately
- The "15 minute quick win" gives instant dopamine — they see value immediately
- After this, the client can just talk naturally and the Director knows the context
- To use a specialist agent: cd agents/ea && claude (for EA), etc.
- OR the client can just tell the Director what they need and the Director triages
