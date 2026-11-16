# FocusMode launch plan (v3 + Black Friday + growth)

Status: planned 2026-11-16. Waiting for extension 3.0 approval on the Chrome Web Store (CWS).
Research: OpenSEO project `focusmode.app`, research log 2026-11-16 (~604 credits).
Hosting: AWS Amplify.

## TODO now (Black Friday starts at launch)

After CWS approval:
- [ ] Amplify console → Environment variables: set `STRIPE_PRICE_PERSONAL`, `STRIPE_PRICE_PLUS`, `STRIPE_PRICE_UNLIMITED` (live price ids), `RESEND_API_KEY`, `RESEND_FROM_EMAIL`. `amplify.yml` already echoes them into `.env`.
- [ ] Run `scripts/setup-stripe.sh` for live mode (needs `sk_live_` key from dashboard.stripe.com/apikeys): creates products, prices, `BRIGHTFRIDAY` coupon + promo code.
- [ ] Redeploy on Amplify.
- [ ] Test checkout in live: promo field accepts `BRIGHTFRIDAY`, 50% off, refund after.
- [ ] Turn on Cloudflare Web Analytics (automatic setup) with the deploy; privacy policy already mentions it.
- [ ] Firefox: once the AMO listing is live, set `FIREFOX_STORE_URL` in `src/lib/pricing.ts`. Until then Firefox visitors get the Chrome button, while the copy already says Firefox is supported.

Decided / done (2026-11-16):
- [x] Sale display: keep halved price cards + "50% off with code BRIGHTFRIDAY" banner. Sale starts at launch.
- [x] Grandfather backfill: low priority, v2 Pro users get Pro automatically in the extension.
- [x] `prisma migrate status` on Neon: up to date (4 migrations), nothing pending.
- [x] 0.6 CWS listing: done in `focusmode-wxt`.
- [x] GSC domain verified.
- [x] Local `.env`: unused `PLUNK_API_KEY`, `EMAIL_FROM`, `STRIPE_SALE_COUPON_*` removed.
- [x] Cloudflare proxies focusmode.app (Web Analytics needs no code; no custom events).
- 0.8 outreach: after launch.

---

**Rule: nothing in Phase 1 goes live until CWS shows 3.0.** Pro keys only activate on 3.0+ (`src/components/home/pricing.tsx:137`). If the site deploys first, people buy keys they can't use.

Baseline (OpenSEO, US): 84 organic visits/mo, 27 keywords (all brand variants), 0 rankings for "website blocker", 95 referring domains (~8 editorial). CWS: 10k users, 4.6★ / 323 ratings, v2.8.7.

---

## Open questions (answer before Phase 1)

1. **Hosting:** Amplify. The www→apex redirect and analytics go there.
2. **v2 "Upgrade" link:** what URL does the v2 extension open? If it is `/pro`, v2 users land on v3 pricing.
3. **Free tier downgrade:** does v3 Free remove anything v2 free users had? If yes, expect 1-star reviews. Decide the messaging.
4. **Partnership page:** still active? If not, delete it; if yes, noindex it.
5. **Edge / Firefox:** can the WXT build ship to Edge Add-ons and Firefox AMO?
6. **Brand name for AI tracking in OpenSEO:** "FocusMode"?

---

## Phase 0 progress (2026-11-16, uncommitted, verified with local `next build` + curl)

Done: 0.2 a–f (self-canonicals; `/pro` → `/pricing/` 308 with `/pro/success/` still 200; sitemap with trailing slashes + fixed dates, `/whats-new/` added; `aggregateRating` removed; FAQPage only on `/faq/`; `sameAs` AlternativeTo/SaaSHub; titles for pricing/faq/privacy; meta description 138 chars). 0.3 hero eyebrow + hero copy + home FAQ link + "Works in Chrome, Edge, Brave and Arc" + mobile line. 0.4 b (UTM via `storeUrl()` on header/hero/pricing/closing CTA), d (Stripe `source` = page path, checkout cancel → `/pricing/`), e (pay once / refund / local-first line), i. Also fixed a lint error in `see-it.tsx` that broke `next build`.

Round 2 (answers: Amplify, partnership inactive, v2 Upgrade opens pricing): www→apex 308 in `next.config.mjs` (also turn on Amplify console's www redirect, it's one hop shorter); `/partnership` deleted + redirects to `/`; section H2s carry "website blocker", "7 ways to pause", "schedules and time limits", "private site blocker"; `/block/` hub + `/block/{youtube-shorts,youtube,reddit,instagram}/` built from `src/lib/block-pages.ts` (all 20 rules tested against the v3 matcher in `focusmode-wxt/lib/blocking.ts`), linked from the footer and in the sitemap; OpenSEO context saved.

Still open: analytics tool (0.4 c). Extension: background only checks URLs on `webNavigation.onCommitted` and `tabs.onUpdated` status `complete`; test whether a Short opened from the YouTube home page (in-page navigation) gets paused. If not, add a `webNavigation.onHistoryStateUpdated` listener in 3.0.1.

Skipped: 0.4 a (release flag; the existing "Pro keys work with 3.0+" note plus deploying after approval covers it), 0.4 f teaser, 0.4 h (review ask on the free sales page would compete with Buy), section H2 rewrites (brand voice, your call).

## Phase 0: prep now, on `feat/v-three`, no deploy

Everything here is code or copy that sits on the branch. Zero user impact until merge.

### 0.1 Commit the v3 work in progress
Uncommitted: 6 modified files + `src/app/whats-new/`, `public/demo/`, `intervention-frame.tsx`. Commit so the launch is one reviewed merge.

### 0.2 Technical SEO fixes

| # | Change | File | Risk |
|---|---|---|---|
| a | Self-canonical: `alternates: { canonical: "./" }`, `openGraph.url: "./"` | `src/app/layout.tsx:35` | Low. Verify after deploy with curl per page. |
| b | `/pro` → `/pricing/` 301. Delete `src/app/pro/page.tsx`, keep `pro/success`. Redirect `{ source: "/pro", destination: "/pricing/", permanent: true }`. **Exact match only**, not `/pro/:path*`, because Stripe `success_url` is `/pro/success`. | `next.config.mjs`, `src/app/pro/page.tsx` | Medium: wrong pattern breaks checkout success. Test `/pro/success/` after deploy. |
| c | Sitemap: trailing slashes (`trailingSlash: true` makes slashless URLs 308), fixed `lastModified` dates instead of `new Date()`. Add new pages as they ship. | `src/app/sitemap.ts` | Low |
| d | Remove `aggregateRating` (Google disallows ratings sourced from another site). Move FAQPage schema to `/faq/` only. Add AlternativeTo + SaaSHub to `sameAs`. | `src/components/json-ld.tsx:34-41` | Low. Loses nothing that was allowed. |
| e | Metadata: privacy-policy gets `title: "Privacy Policy"`; partnership gets `robots: { index: false }` (or delete, see Q4). Pricing title → "Pricing: Free Website Blocker, Lifetime Pro (No Subscription)". FAQ title → "FAQ: Website Blocker for Chrome". | `privacy-policy/page.tsx`, `partnership/page.tsx`, `pricing/page.tsx:9`, `faq/page.tsx:7` | Low |
| f | Meta description ≤155 chars (current is ~210, gets cut): "Free Chrome website blocker that pauses distracting sites instead of walling them off. Schedules, limits, 7 interventions. Pay once for Pro." | `src/app/layout.tsx:16` | Low |
| g | www → apex 301 (host or `redirects()` with `has: [{ type: "host", value: "www.focusmode.app" }]`). | Host console / `next.config.mjs` | Low |

### 0.3 On-page keywords (homepage)
Keep the poetic H1. Add the functional words around it.
- Hero eyebrow: "FocusMode 3.0 is here" → "Mindful website blocker for Chrome" (`src/components/home/hero.tsx`).
- 2–3 H2s: "Block distracting websites like YouTube, Reddit and Instagram", "7 ways to pause, not just block" (`blocked-moment.tsx`, `interventions.tsx`, `groups.tsx`).
- One plain paragraph using: website blocker, block websites in Chrome, screen time, Focus Mode.
- Home FAQ: add "See all questions →" link to `/faq/` (`src/components/home/faq.tsx`).
- Hero: "Featured on the Chrome Web Store" next to the stars; "Works in Chrome, Edge, Brave, Arc" under the CTA.

### 0.4 Conversion

| # | Change | File |
|---|---|---|
| a | **Release flag:** `NEXT_PUBLIC_V3_LIVE`. While false, `BuyButton` shows "Pro unlocks with 3.0, rolling out now" and doesn't call checkout. Flip to true once CWS shows 3.0. A safety net in case the deploy goes out early. | `src/components/buy-button.tsx` |
| b | **UTM links:** `storeUrl(placement)` in `src/lib/pricing.ts` appends `utm_source=focusmode.app&utm_medium=<placement>&utm_campaign=v3`. Use it everywhere `CHROME_STORE_URL` is used (header, hero, pricing, closing-cta, reviews, footer, whats-new). Use one CWS URL in `pricing.ts:80` and `cws.ts:1`. | `src/lib/pricing.ts`, components |
| c | **Analytics:** one cookieless tool (Plausible, Umami or Cloudflare Web Analytics; pick by host, see Q1). Events: `add_to_chrome` (with placement), `buy_click` (with tier). Update `privacy-policy/page.tsx:148`, which currently says "does not use analytics". | `layout.tsx`, `privacy-policy/page.tsx` |
| d | **Stripe source:** `BuyButton` sends `{ tier, source }`; checkout stores `source` in session metadata. | `buy-button.tsx`, `api/checkout/route.ts` |
| e | **Risk reversal under tier grid:** "14-day refund · pay once · local-first". During the sale: "You save $X" per card. Reuse the copy from the `whats-new` offer. | `home/pricing.tsx` |
| f | **Sale teaser** Nov 16–26: `SALE.teaserStart`; banner says "Black Friday: 50% off lifetime Pro starts Nov 27". Skip if launch slips past Nov 27. | `src/lib/pricing.ts`, `src/components/sale.tsx` |
| g | **v2 buyers:** show the v2 lifetime → v3 path on `/pricing/` and in the FAQ, not only `/whats-new?pro=1`. | `pricing/page.tsx`, `faq` |
| h | **Reviews:** show `ReviewAsk` to free users too (`whats-new/page.tsx:70-78` gates it on `?pro=1`). | `whats-new/page.tsx` |
| i | **Mobile:** on coarse-pointer devices, line under CTA: "Desktop Chrome extension, open this on your computer". | `home/hero.tsx` |
| j | **Truth in numbers:** site claims 15k+ / 4.7, CWS shows 10k / 4.6. Use live `getCwsStats()` everywhere or match CWS. Fix `PRODUCT_OVERVIEW.md` (tiers, Stripe, 7 interventions). | components, `PRODUCT_OVERVIEW.md` |

### 0.5 Extension-side (separate repo, can ship in 3.0.x)
- Review prompt after ~7 days or ~20 pauses.
- Open `https://focusmode.app/welcome/?utm_source=extension` on install (`onInstalled`, reason `install`). Build `/welcome/` as noindex onboarding + soft Pro upsell.
- Upgrade links → `/pricing/?utm_source=extension&utm_medium=upgrade`.

### 0.6 CWS listing (prepare now, submit with or right after 3.0)
- **Title:** "FocusMode: Mindful Website Blocker – Block Sites, Limits & Schedules"
- **Short description:** "Block distracting websites with a calm pause, not a wall. Time limits, schedules, breaks & strict mode. Local-first, no tracking."
- **Long description order:** what it is → 7 interventions + groups → site names (YouTube / Shorts, Reddit, Instagram, X, TikTok, Facebook, news) → use cases (study, work, ADHD) → Free vs Pro ("one-time payment, no subscription") → privacy → `https://focusmode.app/?utm_source=cws&utm_medium=listing`.
- **Assets:** 5 screenshots 1280×800 with captions (shader pause over YouTube, groups/rules, schedules/limits, breaks/streaks, privacy); 30–45s video from `public/demo/`; 440×280 tile; 1400×560 marquee.
- Risk: title change can shift CWS ranking for current brand queries briefly. Keep "FocusMode" first.

### 0.7 Content: write now, publish after launch
Template: `src/app/block/[site]/page.tsx` with a data file per site (unique intro, steps, screenshots, FAQ). Each page: native how-to first (Chrome settings / hosts / DNS), then the FocusMode way, then CTA. No thin copy-paste pages.

| Order | URL | Target keywords | Vol / KD |
|---|---|---|---|
| 1 | `/block/youtube-shorts/` | how to block youtube shorts, remove youtube shorts | 2,400 / 0; 720 / 4 |
| 2 | `/block/youtube/` | how to block youtube on chrome, youtube blocker | 1,600 / 8; 1,300 / 27 |
| 3 | `/block/reddit/` | reddit blocker, block reddit | ~1,870 / 31; 390 / 0 |
| 4 | `/block/instagram/` | instagram blocker (desktop, Reels) | ~2,270 / 32 |
| 5 | `/guides/how-to-block-websites-on-chrome/` | block websites on chrome, how to block certain websites | ~2,700 / 11; 880 / 3 |
| 6 | `/block/facebook/`, `/x-twitter/`, `/netflix/`, `/linkedin/`, `/amazon/`, `/tiktok/` | "[site] blocker", "block [site]" | 320–4,400 / 0–34 |
| 7 | `/alternatives/` (= "best website blockers for Chrome") | best website blocker; cold turkey / freedom / opal alternative | 140 / 31 |
| 8 | `/alternatives/blocksite/`, `/alternatives/stayfocusd/` | blocksite alternative, stayfocusd alternative | low vol, high intent |
| 9 | `/blog/how-to-stop-doomscrolling/` | how to stop doomscrolling | 1,900 / 20 |

Volumes are Google Ads numbers unless marked ~ (clickstream). Ads numbers ran high in this niche; re-pull with clickstream before writing pages 6+.

Homepage gets a "Block a specific site" section linking all `/block/*` pages.

### 0.8 Outreach drafts (send after launch)
Pitch angle: "mindful, not a hard block" + one-time pricing + free Pro key for the reviewer. Mention the sale only while it's live.
1. tooltivity.com: submit extension; ask for inclusion in "Best Site Blocker Browser Extensions (2026)" and StayFocusd alternatives.
2. alternativeto.net/software/focusmode: rewrite with v3 copy + screenshots; suggest as alternative under StayFocusd, BlockSite, one sec, Freedom, LeechBlock, Mindful Browsing.
3. saashub.com/focusmode: refresh copy.
4. Listicles (page 1, no FocusMode): cisdem, productive.fish, creolestudios, techlockdown, juliety, web-highlights, bitrix24, luxafor, dayhub, qrius, educatorstechnology, kivlio.
5. Product Hunt: "FocusMode 3.0 – the mindful website blocker". Prep assets now. Launch in January (not BF week).
6. Reddit (r/productivity, r/nosurf): helpful, disclosed replies to blocker-recommendation threads only.

Everywhere: "FocusMode – Mindful Website Blocker for Chrome" (8+ CWS extensions are called "Focus Mode").

---

## Phase 1: launch day (CWS shows 3.0)

1. Confirm 3.0 is live on CWS (listing version + install fresh in a clean profile, activate a test Pro key).
2. Run the [Launch runbook](#launch-runbook-stripe-db-email) (env vars, DB migrations, Stripe).
3. Merge `feat/v-three` → `main`, deploy, set `NEXT_PUBLIC_V3_LIVE=true`.
4. Smoke test (curl):
   - `/`, `/pricing/`, `/faq/`, `/changelog/`, `/whats-new/` → 200, self-canonical.
   - `/pro` → 301 `/pricing/`; `/pro/success/` → 200.
   - `/sitemap.xml`, `/robots.txt` → 200; every sitemap URL → 200 (no 308).
   - `https://www.focusmode.app` → 301 apex.
   - Unknown URL → real 404 (check Amplify `customRules` doesn't turn 404 into 200).
   - Test purchase end-to-end with a real card, refund it.
5. Submit CWS listing update (title, descriptions, screenshots, video).
6. Google Search Console: verify domain, submit sitemap, request indexing for `/`, `/pricing/`, `/faq/`. Connect GSC in OpenSEO.
7. Rich Results Test on `/` and `/faq/`.
8. Send: AlternativeTo, SaaSHub, Tooltivity.

## Phase 2: days 1–30
- Ship `/block/youtube-shorts`, `/block/youtube`, `/block/reddit`, `/block/instagram` + homepage section. Add to sitemap, request indexing.
- `/welcome/` onboarding + extension review prompt (3.0.x).
- First 6 listicle pitches.
- BF sale launch – Dec 15: watch refunds and "key won't activate" tickets daily.

## Phase 3: days 31–60
- How-to-block-websites guide, remaining 6 `/block/*` pages.
- `/alternatives/` hub + BlockSite + StayFocusd pages.
- Edge / AMO listings (if Q5 = yes).
- Product Hunt launch (January).

## Phase 4: days 61–90
- Doomscrolling post.
- GSC query data: expand pages that get impressions, fix or prune ones that don't.
- Second pitch wave.
- Re-run OpenSEO domain overview + backlinks vs baseline.

---

## Measure

| Metric | Source | Baseline → day-90 target |
|---|---|---|
| Organic visits / ranked keywords | OpenSEO, GSC | 84/mo, 27 → 1k/mo, 150+ |
| Impressions / clicks per `/block/*` page | GSC | new |
| CWS installs by `utm_source` | CWS dashboard | new |
| Add-to-Chrome / Buy click rate by page | analytics events | new |
| Revenue by `source` + tier, BF vs normal | Stripe metadata | new |
| CWS ratings | CWS | 323 @ 4.6 → 423+ |
| Refunds / activation tickets in BF | Stripe, inbox | ~0 |
| Editorial referring domains | OpenSEO backlinks | ~8 → 20 |

---

## Launch runbook (Stripe, DB, email)

Sale window: starts at launch (`SALE.start` is 2026-11-16, so it is live from the first deploy) to 2026-12-15 23:59 PT (`SALE` in `src/lib/pricing.ts`).

### 1. Env vars on Amplify (Hosting → Environment variables)

Every var must also be echoed into `.env` in `amplify.yml`, or the server never sees it.

| Var | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (already set) |
| `NEXT_PUBLIC_WEBSITE_URL` | `https://focusmode.app` |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | live keys (already set) |
| `STRIPE_PRICE_PERSONAL` / `STRIPE_PRICE_PLUS` / `STRIPE_PRICE_UNLIMITED` | price ids printed by step 3 |
| `RESEND_API_KEY` | Resend API key (focusmode.app domain verified in Resend) |
| `RESEND_FROM_EMAIL` | `FocusMode <hey@focusmode.app>` |

Email goes through Resend only. Local `.env` still has `PLUNK_API_KEY` / `EMAIL_FROM`, which nothing reads.

One 50%-off promo code `BRIGHTFRIDAY` for all tiers: $20→$10, $30→$15, $45→$22.50. Customers type it in the Checkout promo-code field; it expires with the sale.

### 2. Database migration

`pnpm build` runs `prisma migrate deploy`, so an Amplify deploy applies pending migrations. Before deploying, check what is pending:

```sh
DATABASE_URL=<neon> npx prisma migrate status
```

Expected pending: `20261105075037_add_license_keys` (if never deployed) and `20261108000000_add_license_tiers_and_activations`. Both are additive: new columns are nullable or have defaults, and they create new tables. To apply them manually instead:

```sh
DATABASE_URL=<neon> npx prisma migrate deploy
```

Take a Neon branch or snapshot first.

### 3. Stripe products, prices, coupon, promo code

```sh
npx tsx --env-file=.env scripts/create-stripe-products.ts          # dry run (read-only API calls)
npx tsx --env-file=.env scripts/create-stripe-products.ts --apply  # creates them
```

This is idempotent: prices are matched by `lookup_key`, the coupon by id, the promo code by code. Prices carry metadata `{tier, max_activations}`. Copy the printed env lines to Amplify. Use live keys for prod.

Webhook endpoint `https://focusmode.app/api/webhook/` events:
`checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.deleted`, `charge.refunded`, `charge.dispute.created`.

### 4. Grandfather backfill

Every user with `isSubscribed = true` gets an unlimited key with `grandfathered = true` and no subscription id, so cancelling never revokes it.

```sh
pnpm backfill:license-keys            # dry run, lists who would get a key
pnpm backfill:license-keys -- --send  # creates keys and emails at most 95
pnpm backfill:license-keys -- --send --limit 50  # custom cap
```

Resend free plan caps at 100 emails/day, shared with buyer and resend emails. 279 users → run `--send` once a day for 3 days, all before the sale starts. Each run skips users already emailed.

The backfill is idempotent (`stripeSessionId = backfill_<userId>`) and safe to re-run. It also upgrades that user's older keys (an earlier `backfill_<userId>` row, or keys issued by legacy subscription checkouts) to unlimited, grandfathered and no subscription id. If one of those keys was already emailed, no second key is created. New tier checkouts never set `isSubscribed`, so buyers after launch are not picked up. Emails can't be unsent, so read the dry-run list first.

The cancel webhook sets `isSubscribed = false`, so users who lapsed before launch are not included. `stripeCustomerId` is no help here because sign-up creates a Stripe customer for every user. To include lapsed users, export the customers who ever had a subscription from Stripe and set `isSubscribed = true` on them before running.

### 5. Verification

```sql
-- migration applied
SELECT column_name FROM information_schema.columns WHERE table_name = 'license_keys';
SELECT count(*) FROM license_activations;

-- backfill
SELECT count(*) FILTER (WHERE grandfathered) AS grandfathered,
       count(*) FILTER (WHERE grandfathered AND "emailedAt" IS NULL) AS not_emailed
FROM license_keys;
SELECT count(*) FROM users u
WHERE u."isSubscribed" AND NOT EXISTS (
  SELECT 1 FROM license_keys k WHERE k."stripeSessionId" = 'backfill_' || u.id);

-- sales by tier
SELECT tier, "maxActivations", status, count(*) FROM license_keys
WHERE NOT grandfathered GROUP BY 1, 2, 3;

-- keys bought but not emailed (webhook/email failures)
SELECT email, "createdAt" FROM license_keys WHERE "emailedAt" IS NULL;

-- seat usage
SELECT k.tier, k."maxActivations", count(a.id) AS used
FROM license_keys k LEFT JOIN license_activations a ON a."licenseKeyId" = k.id
GROUP BY k.id ORDER BY used DESC LIMIT 20;
```

API checks against the deployed site:

```sh
curl -sX POST https://focusmode.app/api/checkout/ -H 'content-type: application/json' -d '{"tier":"personal"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"key":"<key>"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"a"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"b"}'   # seat_limit
curl -sX POST https://focusmode.app/api/license/deactivate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"a"}'
curl -sX POST https://focusmode.app/api/license/resend/ -H 'content-type: application/json' -d '{"email":"<you>"}'
```

Do a full test-mode purchase locally with card `4242 4242 4242 4242`, then refund it and dispute it with `4000 0000 0000 0259`. Check that the key gets `status = 'revoked'`.

### 6. Rollback

- **Code:** redeploy the previous Amplify build. Old code ignores the new columns and table, and old extension builds keep sending `{key}`, which still works.
- **Migration:** leave it in place, since it is additive. If you must drop it:
  ```sql
  DROP TABLE license_activations;
  ALTER TABLE license_keys DROP COLUMN tier, DROP COLUMN "maxActivations", DROP COLUMN grandfathered;
  DELETE FROM _prisma_migrations WHERE migration_name = '20261108000000_add_license_tiers_and_activations';
  ```
- **Sale:** archive the `BRIGHTFRIDAY` promo code in Stripe. Both promo code and coupon expire on their own at the sale end.
- **Bad key:** `UPDATE license_keys SET status = 'revoked' WHERE key = '...';` and to reinstate it, `status = 'granted'`.
- **Free a seat for a customer:** `DELETE FROM license_activations WHERE "licenseKeyId" = (SELECT id FROM license_keys WHERE key = '...');`
