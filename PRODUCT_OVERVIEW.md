# FocusMode 3.0: Product Overview

> Reference for writing copy, SEO pages and schema for focusmode.app. Every claim here is checked against the landing code (`src/lib/pricing.ts`, `src/components/home/*`, `src/lib/license.ts`) or the extension source (`focusmode-revamp/focusmode-wxt`). If you add a claim, verify it the same way.

---

## 1. Product Identity

- **Name**: FocusMode
- **Tagline**: "A pause before the scroll"
- **Version**: 3.0 (rewrite of v2.x, WXT + React + TypeScript; Manifest V3 on Chrome)
- **Category**: Browser extension / website blocker / digital wellness
- **Browsers**: Chrome. Edge, Brave and Arc install it from the Chrome Web Store. Firefox build exists (`wxt build -b firefox`, MV2) but the AMO listing is not live yet (`FIREFOX_STORE_URL` is `null`), so don't link AMO or promise Firefox in copy.
- **Pricing**: Free, plus Pro as a one-time payment from $20 (see section 5)
- **Website**: https://focusmode.app (Next.js App Router, hosted on AWS Amplify)
- **Chrome Web Store**: `CHROME_STORE_URL` in `src/lib/pricing.ts`. Always link through `storeUrl(placement)` for UTM.
- **Store stats**: never hardcode. Use `getCwsStats()` (`src/lib/cws.ts`, refreshed daily). Baseline on 2026-11-16: about 10k users, 4.6 stars from 323 ratings.
- **Account**: none. No sign-up, no email needed to use it. (`/sign-in/` is a legacy page for v2 subscribers only.)

---

## 2. Core Value Proposition

FocusMode is a **mindful website blocker**. When you open a distracting site it pauses you with a short intervention instead of a hard wall. You can still go through, but you have to choose to.

**Key differentiators:**
- 7 interventions, rotated within a group so the pause doesn't turn into a reflex
- Groups of sites, each with its own schedule, time limit, pause, break budget and message
- Counted breaks per day, with optional escalation when you overdo them
- Strict mode when you want a real hard stop
- Local-first: usage data stays on the device; nothing about your browsing is sent to FocusMode

**One-liner**: "Free Chrome website blocker that pauses distracting sites instead of walling them off."

---

## 3. Target Audience & Pain Points

### Primary audiences
1. **Knowledge and remote workers** losing work hours to feeds and news
2. **Students** who open social media on reflex while studying
3. **People who want less screen time** without a tool that feels like punishment
4. **People who tried other blockers** and found them too harsh, too easy to switch off, or too ugly

### Pain points addressed
- "Just checking" a site and losing 40 minutes
- Short-video rabbit holes (YouTube Shorts, Reels, TikTok)
- All-or-nothing blockers that also block legitimate use
- The same block screen every time, which you stop seeing
- Blockers you can switch off in two clicks

---

## 4. Feature Set (v3.0)

### A. Groups and URL rules
- Sites are organized into groups ("Deep work", "Doom-scroll", "Study only").
- Each group has its own trigger, interventions, durations, break limit, escalation and custom messages.
- Two modes: **Block these sites**, or **Allow only these sites** (everything else is paused while the group is on).
- URL rules (`lib/blocking.ts`):
  - `example.com` matches `example.com` and `www.example.com` (not other subdomains)
  - `*.example.com` matches the domain and all subdomains
  - `example.com/path` is an **exact** path (also `/path/`); `example.com/` is the main page only
  - `example.com/path/*` matches everything under that path. Use `youtube.com/shorts/*` to pause every Short and leave the rest of YouTube open (`youtube.com/shorts` alone only matches the bare `/shorts` page)
  - `?` matches one character in a path; `*keyword*` matches the keyword anywhere in host, path or query
  - `!` exception rules let one path or subdomain through (e.g. `!music.youtube.com`)
  - Lines starting with `#` are comments
- Right-click menu: "Add to FocusMode Group", with every group plus "Create New Group".
- **Free**: 1 group. **Pro**: unlimited groups.

### B. 7 interventions

Names as shown in the extension and on the landing page:

1. **Shader Light** (new in 3.0): a live GPU scene rises and settles while the timer runs. 23 scenes across Dither, Paper, Liquid, Marble and Fluid families. Free gets the Dither family; Pro gets the full gallery.
2. **Texture Field** (new in 3.0): a quiet animated pattern settles before you continue. 9 patterns, 4 palettes.
3. **Breathing Exercise** (Pro): a guided breath before you decide. Patterns: 4-7-8, 5-0-5, 7-1-1, box.
4. **Hold to Continue**: press and hold a button to go through.
5. **Slide to Continue**: a panel slides over the page and back. Wait it out.
6. **Pixel Animation**: pixel blocks fill the screen one by one.
7. **Instant Block**: a calm stop with one question. No timer.

All timed interventions:
- Duration 3 to 15 seconds per group (default 5)
- Several can be enabled per group; FocusMode rotates between them
- Custom message per intervention type per group
- Shown as an overlay on the page (overlay mode can be switched off in Settings)

Free gets 6 of the 7. Breathing is Pro.

### C. Triggers (per group)
1. **Always on**: pause whenever a listed site is opened
2. **On schedule**: only during chosen schedules (days + start/end time; several groups can share a schedule)
3. **After usage**: pause after a daily time limit on the group's sites (e.g. 45 minutes a day)

Schedules and time limits are free.

### D. Breaks
- Daily break limit per group (default 3)
- **Free**: 5-minute breaks. **Pro**: 5, 10, 15, 30 minutes or custom lengths
- Site pauses again when the break ends

### E. Escalation (per group, on by default)
When you go past your break limit:
- **Double intervention duration** (max 30 seconds)
- **Remove Instant Block**, so only timed interventions show

Escalation and each option are separate toggles, all on for new groups. Free.

### F. Strict mode
- Locks for 1, 5, 10 or 15 minutes
- Every active group pauses instantly, no breaks
- Groups can't be switched off or edited until the timer ends; import is disabled
- Free
- PIN lock from v2 is **not** in 3.0 yet

### G. Streaks and analytics
- **Streaks** (free): current and longest streak of days kept within limits
- **Usage analytics** (Pro): time per site on your device, with 7 / 30 / 90-day ranges. Free users see it blurred with an upgrade prompt.

### H. Other
- Theme: light, dark or system
- Export and import all data as a JSON backup (free)
- Works offline; if the license server can't be reached, Pro stays on for up to 14 days since the last successful check

### I. Privacy
- Usage stats, breaks and streaks live in local extension storage on the device
- Groups (with their site lists), schedules, settings and the license key live in the browser's extension sync storage; if browser sync is on, the browser vendor (e.g. Google) copies them between the user's browsers. FocusMode never receives them (matches `/privacy-policy/`)
- No analytics SDK, no trackers, no telemetry, no account
- One exception: Pro sends the license key, a random install ID and the browser's name to `/api/license/validate`. No browsing data.

---

## 5. Free vs Pro

Source of truth: `FREE_FEATURES`, `PRO_FEATURES` and `TIERS` in `src/lib/pricing.ts`.

| Feature | Free | Pro |
|---|---|---|
| Focus groups | 1 | Unlimited |
| Interventions | 6 of 7 | All 7 (adds Breathing) |
| Shader scenes | Dither family | Full gallery, 23 scenes |
| Schedules and daily time limits | Yes | Yes |
| Block lists and allow-only groups | Yes | Yes |
| Strict mode | Yes | Yes |
| Break length | 5 minutes | Longer and custom |
| Streaks | Yes | Yes |
| Escalation | Yes | Yes |
| Usage analytics | No | Yes |
| Export / import | Yes | Yes |
| Future updates | Yes | Every future update |

### Pro tiers (one-time payment, no subscription)

| Tier | Price | Browsers (max activations) |
|---|---|---|
| Personal | $20 | 1 |
| Plus | $30 | 3 |
| Unlimited | $45 | Unlimited |

- A "browser" is one browser profile with FocusMode installed. Work Chrome and personal Chrome count as two.
- A seat can be freed from Settings in the extension and reused elsewhere.
- Keys only work on FocusMode 3.0 and later.
- Refund: full refund within 14 days, by email to focusmode.app@gmail.com.
- v2 Pro customers (including lapsed subscriptions) are grandfathered: Pro for life on unlimited browsers, sent a key by email.

### Black Friday 2026
- Code **BRIGHTFRIDAY**, **50% off** any tier: $10 / $15 / $22.50
- Runs **Nov 27 – Dec 15, 2026** (Pacific time), `SALE` in `src/lib/pricing.ts`
- Stripe coupon `BRIGHTFRIDAY` (duration once, expires at sale end) + promotion code of the same name, created by `scripts/create-stripe-products.ts`
- Customer types the code in Stripe Checkout (`allow_promotion_codes: true`); it isn't applied automatically

---

## 6. Purchase and License Flow

1. **Checkout** (`POST /api/checkout`): body `{ tier, source }`. Creates a Stripe Checkout Session in `payment` mode (one-time) with the tier's price (`STRIPE_PRICE_PERSONAL|PLUS|UNLIMITED`), `metadata: { tier, source }`. Success → `/pro/success?session_id=…` (308 to `/pro/success/` via `trailingSlash`), cancel → `/pricing/`.
2. **Stripe products**: `scripts/create-stripe-products.ts` (wrapped by `scripts/setup-stripe.sh`) creates one product + price per tier, lookup key `focusmode_pro_{tier}`, metadata `tier` and `max_activations`.
3. **Key issue**: the webhook (`/api/webhook`, `checkout.session.completed` / `async_payment_succeeded`) and the success page (`GET /api/checkout/session`) both call `issueKey()`; whichever runs first creates the key, the other reads it. Key format `FM-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX`.
4. **Email**: key sent through **Resend** (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`) with an idempotency key, so it's sent once.
5. **Lost key**: `/license/` page → `POST /api/license/resend` emails every active key on that address (rate limited).
6. **Activation**: extension Settings → License → paste key. `POST /api/license/validate` checks status and counts seats by `instance_id`; over the tier limit returns `seat_limit`. `POST /api/license/deactivate` frees a seat.
7. **Revocation**: `charge.refunded` (full) and `charge.dispute.created` revoke the key.

Legacy v2 subscription handlers (`customer.subscription.deleted`, NextAuth sign-in) remain only for v2 customers. Don't mention subscriptions or sign-in in copy.

---

## 7. Competitive Positioning

Angles that hold for FocusMode (check competitor prices on their own sites before publishing anything with numbers):

- **Block-page blockers** (BlockSite, StayFocusd, Cold Turkey): FocusMode pauses instead of walling off, rotates 7 interventions, and still offers strict mode for a hard stop. LeechBlock NG has a countdown "delaying page", so don't call it hard-wall only; the angle there is 7 rotating interventions and per-group breaks.
- **Subscription pricing**: BlockSite Premium and Freedom are sold mainly as subscriptions (Freedom also sells a separate lifetime plan, so don't claim it has none). FocusMode Pro is a one-time payment.
- Keep comparisons factual and neutral; no claims about competitors' quality, privacy or ratings unless sourced from their own pages.
- **Timer apps** (Forest): FocusMode works on specific sites and paths, with per-group schedules and time limits, not a single focus timer.
- **Privacy**: no account, no browsing data leaves the browser.

---

## 8. SEO Keyword Strategy

### Primary
- website blocker chrome
- website blocker extension
- focus mode extension
- mindful browsing extension

### Secondary
- block distracting websites chrome
- block youtube shorts
- reduce screen time chrome extension
- website blocker with schedule
- website blocker with time limit

### Long-tail
- how to block youtube shorts on chrome
- chrome extension to block social media during work hours
- website blocker with breaks
- website blocker that doesn't fully block sites
- private website blocker no account

Content pages (`/block/{site}/`, from `src/lib/block-pages.ts`) follow: native how-to first, then the FocusMode way, then CTA.

---

## 9. Design & Brand Language

### Visual identity (`src/app/globals.css`)
- **Primary**: deep navy-teal (`hsl(199 100% 18%)`, about `#003f5c`)
- **Accent**: orange (`hsl(18 100% 63%)`, about `#ff7c43`), darker `orange-ink` for text
- **Background**: warm off-white (`hsl(60 9% 95%)`)
- **Type**: system stack, SF Pro Display for headings, SF Pro Text for body

### Voice
- Plain, concrete, short sentences. No hype, no fear-based copy.
- Say what happens: "pauses the site", "a calm stop with one question".
- Calm and on the user's side: friction, not force.
- Never invent numbers, ratings or features.

---

## 10. Site Map (current)

- `/` home
- `/pricing/` (`/pro` 308s here)
- `/pro/success/` post-checkout key page
- `/license/` find my license key
- `/faq/` (only page with FAQPage schema)
- `/whats-new/` 3.0 release notes
- `/block/` hub + `/block/{youtube-shorts,youtube,reddit,instagram}/` (slugs from `BLOCK_PAGES`)
- `/guides/how-to-block-websites-on-chrome/`
- `/blog/how-to-stop-doomscrolling/`
- `/alternatives/`, `/alternatives/blocksite/`, `/alternatives/stayfocusd/`
- `/welcome/` post-install page
- `/changelog/`, `/privacy-policy/`
- `/sign-in/` v2 legacy only

All URLs use a trailing slash. Each page self-canonicals (`alternates: { canonical: "./" }` in the layout).

---

## 11. Schema Markup

Source: `src/components/json-ld.tsx` (`<JsonLd />` on `/` and `/pricing/`, `<JsonLd faq />` on `/faq/`). Organization + SoftwareApplication on each.

### SoftwareApplication
- Name: FocusMode
- applicationCategory: BrowserApplication
- operatingSystem: Chrome
- Offers: Free ($0); Pro $20 / $30 / $45 one-time, built from `TIERS`. During the sale the offers switch to the discounted price with `priceValidUntil` = sale end.
- No `aggregateRating` (removed on purpose). If added back, take values from `getCwsStats()` at render time.
- softwareVersion: 3.0
- Description (current): "A Chrome extension that replaces hard blocks with mindful pauses: live shader overlays, 7 interventions, per-group schedules, time limits, breaks and strict mode."

### FAQ
Use `FAQS` in `src/components/home/faq.tsx` as the single source. Don't duplicate answers here.
