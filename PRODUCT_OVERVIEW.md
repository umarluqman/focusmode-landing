# FocusMode v3.0 — Comprehensive Product Overview

> This document is a complete reference for generating an SEO-optimized landing page update for focusmode.app.

---

## 1. Product Identity

- **Name**: FocusMode
- **Tagline**: "Stay focused, be present"
- **Version**: 3.0 (complete rewrite from v2.x)
- **Category**: Browser Extension / Digital Wellness / Productivity
- **Platform**: Chrome (Manifest V3), built with WXT Framework + React + TypeScript
- **Pricing**: Free tier + PRO at **$20.99 one-time lifetime purchase** (via Polar.sh)
- **Website**: https://focusmode.app (Next.js)
- **Chrome Web Store**: 15,000+ users, 4.7/5 star rating
- **Purchase link**: https://polar.sh/focusmode

---

## 2. Core Value Proposition

FocusMode is a **mindfulness-first website blocker** that reduces mindless browsing through intelligent, friction-based interventions — not brute-force blocking.

**Key differentiators:**
- 4 unique intervention types that use psychological friction (hold, watch, wait) instead of hard blocks
- Calm, zen-inspired aesthetic that feels like self-care, not punishment
- Break management with flexible durations (5/10/15/30 min) that respects user autonomy
- Progressive escalation that adapts to behavior without being punitive
- Built-in analytics and mindfulness streak tracking for accountability
- Group-based organization for nuanced control over different site categories

**One-liner**: "A mindful website intervention tool that helps you browse with intention — not a blocker that locks you out."

**Claim**: "Reduce mindless browsing by 10x" (existing hero headline)

---

## 3. Target Audience & Pain Points

### Primary Audiences
1. **Knowledge workers & remote workers** — Losing 2-3 hours/day to distracting websites during work
2. **Students** — Struggling to focus during study sessions, reflexively opening social media
3. **Digital wellness seekers** — Anyone wanting to be more intentional with screen time
4. **People who tried other blockers** — Found them too harsh, too easy to bypass, or too ugly

### Pain Points Addressed
- Guilt after mindless scrolling sessions
- Broken flow states from "just checking" social media
- Missed deadlines due to YouTube/Reddit rabbit holes
- Feeling controlled or punished by traditional blockers
- Blocker fatigue (habituation to the same block screen)
- All-or-nothing blocking that doesn't allow for legitimate use

### Emotional Outcome
Users feel **in control, calm, and self-aware** — not restricted. The extension is a "personal focus coach" in the browser.

---

## 4. Complete Feature Set (v3.0)

### A. Group-Based Website Blocking
- Organize blocked sites into logical groups: "Social Media", "News", "Video", "Shopping", etc.
- Each group has its own intervention settings, break limits, and trigger rules
- Advanced URL pattern matching:
  - Wildcards: `*.example.com`, `example.com/reels/*`
  - Exclusions: `!allowed.example.com`
  - Path-based: `example.com/feed` (block feed but not homepage)
  - Comments: Lines starting with `#` are ignored
  - Auto-includes www: `example.com` also blocks `www.example.com`
- **Free**: 1 group | **PRO**: Unlimited groups

### B. 4 Intervention Types (Core Differentiator)

Each intervention is designed around a different psychological approach to prevent habituation:

1. **Instant Block** — "A moment of stillness"
   - Calm, immediate pause with a leaf icon and pulsing animation
   - Zero-friction reflection point before choosing to continue
   - Encouraging copy: "Continue mindfully" or "Return to focus"

2. **Hold to Complete** — "Cultivate patience"
   - Press and hold a circular button for 3-15 seconds (configurable)
   - SVG circular progress indicator with green-to-teal gradient
   - Real-time countdown: "X seconds remaining"
   - Tactile feedback: button scales when pressed

3. **Slide to Continue** — "Flow with intention"
   - Full-screen gradient animation slides across the screen
   - Duration: 3-15 seconds (configurable)
   - Mix-blend-difference effect creates dynamic visual
   - Meditative, passive observation experience

4. **Pixel Garden** — "Watch the garden grow"
   - 400 pixels bloom across the screen in randomized order (Fisher-Yates shuffle)
   - 20x20 grid with gradient colors from primary to accent
   - Duration: 3-15 seconds (configurable)
   - Creates organic "garden growth" visual effect

**All interventions feature:**
- Customizable duration per group (3-15 seconds, doubling under escalation up to 30s)
- Custom messages per intervention type per group
- Visual editor for full appearance customization (opens in dedicated tab)
- Shadow DOM isolation — works on ANY website without style conflicts (even YouTube)
- Dark/light mode detection

### C. Smart Triggering (3 Modes)

1. **Always On** — Block whenever a listed site is visited
2. **On Schedule** — Block only during configured time windows (e.g., 9 AM–5 PM weekdays)
   - Multiple schedules per group
   - Schedule manager UI with day/time picker
3. **After Usage** — Block only after daily time limit is exceeded
   - Configurable daily limit in minutes (e.g., 30 min of Reddit before blocking starts)
   - Tracks seconds spent on group sites in real-time

### D. Break Management System

- **Daily break limits** per group (configurable, e.g., 3 breaks/day for Social Media)
- **Flexible break durations**: 5, 10, 15, or 30 minutes (Free: 5 min only, PRO: all durations)
- **Badge countdown** showing remaining break time in the extension icon
- **Break selector UI** with visual card interface and checkmark animation
- **Automatic break end** when duration expires — sites block again immediately
- **Smart tracking**: If daily time limit is exceeded during a break, the break ends automatically

### E. Progressive Escalation System

When users exceed their daily break limit or usage limits, the extension can optionally:
- **Double intervention duration** (5s → 10s, max 30s) — make users wait longer
- **Remove Instant Block** — force harder intervention types only (hold/slide/pixel)
- **Show streak warning banner** — orange motivational warning about breaking their streak

Escalation is:
- Opt-in per group (users choose "Keep breaks easy" vs "Increase friction")
- Each escalation behavior is individually toggleable
- Designed to be firm but encouraging, not punitive

### F. Mindfulness Streak Tracking

- **Current streak**: Consecutive days staying within break/usage limits
- **Longest streak**: Personal best record
- **Growth Calendar**: Visual 7/30/90-day calendar showing mindful vs missed days
  - Green leaf icons for maintained days
  - Dashed circles for missed days
  - Ring highlight for today
- **Total blocks prevented**: Running counter of how many times the extension intervened
- Gamification that encourages consistency through visible progress

### G. Analytics Dashboard (PRO)

- **Website Usage Chart**: Top 10 domains by time spent, with horizontal bar chart
  - Gradient bars from primary to accent color
  - Shows hours/minutes per domain
  - Percentage breakdown
- **Key Metrics**: Current streak, longest streak, total blocks prevented
- **Date Range Filters**: 7D, 30D, 90D views
- **"Time in Garden"** — zen-inspired section title for usage data

### H. Additional Features

- **Right-click context menu**: "Add to FocusMode Group" → shows all groups + "Create New Group"
- **Theme**: Light / Dark / System (auto-detects OS preference)
- **Data export/import**: JSON backup of all settings, groups, and analytics
- **Overlay mode**: Show interventions as overlays vs full-page
- **Show stats on interventions**: Optionally display usage chart during intervention
- **Offline-first**: Works without internet, PRO license cached for 24 hours
- **Privacy-respecting**: No external tracking, all data stored locally

---

## 5. Free vs PRO Comparison

| Feature | Free | PRO ($20.99 lifetime) |
|---|---|---|
| Focus groups | 1 | Unlimited |
| Intervention types | All 4 | All 4 |
| Break durations | 5 min only | 5 / 10 / 15 / 30 min |
| Schedule-based triggering | Yes | Yes |
| Usage-based triggering | Yes | Yes |
| Escalation system | Yes | Yes |
| Streak tracking | Yes | Yes |
| Analytics dashboard | Basic | Full (usage charts, date ranges) |
| Website usage charts | — | Top 10 domains breakdown |
| Data export/import | — | Full backup & restore |
| Context menu | Yes | Yes |
| Dark mode | Yes | Yes |
| Custom intervention messages | Yes | Yes |
| Intervention editor | Yes | Yes |

**PRO purchase**: One-time $20.99 via Polar.sh — no subscription, no recurring fees.

---

## 6. Competitive Positioning

### vs Freedom ($8.99/mo or $39.99/yr)
- FocusMode is **free to start** with a one-time PRO upgrade
- FocusMode uses **mindful interventions** instead of hard blocks
- FocusMode has **built-in analytics and streak tracking**
- Freedom requires a subscription; FocusMode is pay-once

### vs Cold Turkey (free basic, $39 lifetime)
- FocusMode offers **4 unique intervention types** vs simple blocking
- FocusMode has a **calm, zen aesthetic** vs Cold Turkey's utilitarian UI
- FocusMode includes **break management** with flexible durations
- FocusMode is **$20.99** vs Cold Turkey's **$39**

### vs LeechBlock (free)
- FocusMode has a **modern, beautiful UI** vs LeechBlock's dated interface
- FocusMode offers **escalation and streak tracking** beyond basic scheduling
- FocusMode has **4 intervention types** vs LeechBlock's simple block page
- FocusMode provides **analytics** for tracking progress

### vs Forest ($3.99)
- FocusMode is **group-based** (not just a single focus timer)
- FocusMode offers **granular per-site and per-path controls**
- FocusMode has **4 intervention types** vs Forest's tree-growing mechanic
- FocusMode costs **$20.99 one-time** vs Forest's per-device pricing

### vs StayFocusd (free)
- FocusMode has **modern UI** vs StayFocusd's basic interface
- FocusMode offers **4 intervention types** vs simple time-based blocking
- FocusMode has **break management, escalation, and streaks**
- FocusMode includes **analytics dashboard**

### vs BlockSite ($10.99/mo)
- FocusMode is **$20.99 one-time** vs BlockSite's **$131.88/yr subscription**
- FocusMode uses **mindful interventions** vs hard blocks
- FocusMode has **no ads or upselling** in the free tier
- FocusMode is **privacy-respecting** (no data collection)

---

## 7. SEO Keyword Strategy

### Primary Keywords
- focus mode extension
- website blocker chrome
- website blocker extension
- digital wellness chrome extension
- mindful browsing extension

### Secondary Keywords
- block distracting websites chrome
- reduce screen time chrome extension
- productivity extension chrome
- focus app for chrome
- website intervention tool
- mindless browsing blocker

### Long-tail Keywords
- how to stop mindless scrolling on chrome
- chrome extension to block social media during work hours
- website blocker with breaks and timer
- best website blocker that doesn't fully block sites
- chrome extension for digital wellness and focus
- how to reduce time on distracting websites
- website blocker with analytics and tracking
- gentle website blocker with interventions

### Comparison Keywords
- focusmode vs freedom app
- focusmode vs cold turkey
- focusmode vs leechblock
- focusmode vs forest app
- best website blocker chrome 2026
- website blocker alternatives
- freedom app alternative free

### Feature-Specific Keywords
- website blocker with break timer
- website blocker with streak tracking
- website blocker with analytics
- website blocker with schedule
- mindful browsing chrome extension
- zen website blocker

---

## 8. Social Proof

### Chrome Web Store Stats
- 15,000+ active users
- 4.7 out of 5 stars rating

### Testimonial Themes (from existing landing page)
- Easy to use and set up
- Beautiful, aesthetic design (zen/calming)
- Actually effective at preventing procrastination
- Love the gamification features
- Scheduled blocking is a game-changer
- Feels encouraging, not restrictive

---

## 9. Design & Brand Language

### Visual Identity
- **Primary color**: Sage green (#4A9075) — calm, natural
- **Accent**: Teal (#6AABB0) — fresh, balanced
- **Background**: Warm off-white (#FAF9F6) — paper-like, zen
- **Typography**: Nunito (body, clean) + Fraunces (headings, elegant serif)
- **Iconography**: Leaf motif throughout (growth, nature, mindfulness)

### Brand Voice
- Calm, encouraging, never punitive
- Uses nature metaphors: "zen garden", "growth calendar", "watch the garden grow"
- Active language: "cultivate patience", "flow with intention", "find your calm"
- Empowering: "continue mindfully", "resume focus", "take control"
- Avoids: urgency language, fear-based copy, aggressive blocking terminology

### UX Philosophy
- Self-care over self-control
- Friction over blocking
- Encouragement over punishment
- Awareness over restriction
- Flexibility over rigidity

---

## 10. Current Landing Page Audit (focusmode.app)

### What Exists
- Hero: "Reduce Mindless Browsing By 10x" with 15k+ users / 4.7 rating badge
- Value prop section: "We know what you're thinking"
- 3 feature cards: Structured Breaks, Personalized Prompts, Automatic Scheduling
- 5 testimonials carousel
- Meta tags: title, description, OG tags, Twitter cards
- CTA: "Install Now" → Chrome Web Store

### What's Missing / Outdated
1. **No v3.0 features**: Groups, 4 intervention types, escalation, streak calendar, analytics
2. **No schema markup**: Missing SoftwareApplication, FAQPage, Organization schemas
3. **No FAQ section**: Huge opportunity for featured snippets
4. **No pricing section**: Free vs PRO breakdown not shown
5. **No comparison content**: Missing "vs" pages for competitors
6. **Feature descriptions are thin**: Only 3 features listed, briefly described
7. **No demo video**: Video placeholder exists but is empty
8. **No internal linking**: No blog, resources, or sub-pages
9. **No how-it-works section**: Flow diagram of intervention → break → resume
10. **No stats/numbers section**: Could showcase "X blocks prevented across all users"

### Technical SEO Gaps
- Missing JSON-LD structured data
- No sitemap reference found
- No FAQ schema for rich snippets
- OG image exists but page content doesn't reflect v3.0
- Meta description doesn't mention key v3.0 features

---

## 11. Recommended Landing Page Structure

1. **Hero** — Updated headline + v3.0 value prop + social proof badge + CTA
2. **How It Works** — 3-step visual flow: Visit → Intervention → Break → Resume
3. **4 Intervention Types** — Individual showcase cards with animations/screenshots
4. **Feature Deep Dive** — Groups, scheduling, break management, escalation
5. **Analytics & Streaks** — Dashboard preview screenshots
6. **Pricing** — Free vs PRO comparison table
7. **Testimonials** — Existing + request new ones highlighting v3.0 features
8. **FAQ** — Common questions with schema markup
9. **Competitors Comparison** — Brief "Why FocusMode" section
10. **Final CTA** — Install button + PRO purchase link

---

## 12. Content for Schema Markup

### SoftwareApplication Schema
- Name: FocusMode
- Application Category: BrowserApplication
- Operating System: Chrome
- Offers: Free / $20.99 (one-time)
- Aggregate Rating: 4.7/5 (15,000+ users)
- Description: "A mindful website intervention tool for Chrome that reduces mindless browsing through intelligent, friction-based interventions."

### FAQ Items for Schema
1. "What is FocusMode?" — A Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks.
2. "Is FocusMode free?" — Yes, FocusMode has a free tier with 1 group and all 4 intervention types. PRO is a one-time $20.99 for unlimited groups and analytics.
3. "How is FocusMode different from other website blockers?" — FocusMode uses 4 unique mindfulness-based interventions (hold, slide, pixel, instant) instead of simply blocking sites. It respects user autonomy with flexible breaks and progressive escalation.
4. "Does FocusMode work on all websites?" — Yes, FocusMode uses Shadow DOM isolation to work on any website without style conflicts.
5. "Can I use FocusMode during work hours only?" — Yes, schedule-based triggering lets you activate blocking during specific time windows.
6. "What happens when I exceed my break limit?" — Optional escalation increases intervention duration, removes easy interventions, and shows streak warnings.
7. "Does FocusMode collect my data?" — No, all data is stored locally in your browser. FocusMode is privacy-respecting with no external tracking.
8. "Can I block specific pages instead of entire websites?" — Yes, FocusMode supports path-based blocking (e.g., block youtube.com/shorts but allow youtube.com).
