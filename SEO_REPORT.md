# FocusMode SEO Analysis & Landing Page Optimization Report

> Generated: 2026-02-18 | Site: https://focusmode.app | Product: FocusMode v3.0

---

## SEO Health Score: 28/100

| Category | Weight | Score | Status |
|----------|--------|-------|--------|
| Technical SEO | 25% | 35/100 | Missing sitemap, robots.txt, schema |
| Content Quality | 25% | 20/100 | Thin (~850 words), outdated v2.x content |
| On-Page SEO | 20% | 15/100 | ZERO target keywords on page |
| Schema / Structured Data | 10% | 0/100 | Completely absent |
| Performance (CWV) | 10% | 60/100 | Next.js, decent load time |
| Images | 5% | 40/100 | Broken video, missing alt text |
| AI Search Readiness | 5% | 10/100 | No structured content for AI citation |

---

## CRITICAL FINDINGS

### 1. Zero Target Keywords on Page

The page contains **none** of the target keywords anywhere — not in the title, meta description, headings, or body text. The words "Chrome extension," "website blocker," "screen time," and "digital wellness" do not appear at all.

| Target Keyword | In Title | Meta Desc | H1 | Headings | Body |
|---|---|---|---|---|---|
| website blocker chrome | No | No | No | No | No |
| focus mode extension | No | No | No | No | No |
| digital wellness chrome extension | No | No | No | No | No |
| mindful browsing extension | No | No | No | No | Partial |
| block distracting websites | No | No | No | No | Partial |
| reduce screen time chrome | No | No | No | No | No |

### 2. No Structured Data / Schema Markup

Zero JSON-LD, Microdata, or RDFa detected. Missing out on rich results (star ratings, pricing, FAQ snippets).

### 3. Missing sitemap.xml and robots.txt

Both return 404. Google can still crawl but cannot efficiently discover pages.

### 4. Broken Hero Video

The demo video shows "Media Error" on both desktop and mobile. This occupies ~50% of above-the-fold visual weight and severely damages first impressions.

### 5. Content Reflects v2.x, Not v3.0

Major v3.0 features entirely absent from the page:
- 4 intervention types (hold, slide, pixel, instant)
- Group-based blocking
- Break management with escalation
- Streak tracking & growth calendar
- Analytics dashboard

---

## RECOMMENDED META TAGS

### Title Tag (57 chars)
```
FocusMode - Website Blocker & Focus Mode Chrome Extension
```

### Meta Description (155 chars)
```
Block distracting websites mindfully with FocusMode. 4 intervention types, break management, streak tracking & analytics. Free Chrome extension used by 15k+ people.
```

### Open Graph
```html
<meta property="og:title" content="FocusMode — Mindful Website Blocker for Chrome" />
<meta property="og:description" content="Gentle interventions that help you stay focused. Not a blunt blocker — a mindful browsing companion. Free with optional $20.99 PRO." />
```

---

## SCHEMA MARKUP (Ready to Implement)

### Block 1: Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://focusmode.app/#organization",
  "name": "FocusMode",
  "url": "https://focusmode.app",
  "logo": {
    "@type": "ImageObject",
    "url": "https://focusmode.app/focusmode-logo.png",
    "width": 32,
    "height": 32
  },
  "image": "https://focusmode.app/public/focusmode-og-img.png",
  "email": "focusmode.app@gmail.com",
  "sameAs": [
    "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
  ]
}
```

### Block 2: WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://focusmode.app/#website",
  "name": "FocusMode",
  "url": "https://focusmode.app",
  "publisher": { "@id": "https://focusmode.app/#organization" },
  "description": "Reduce mindless browsing with gentle interventions. A Chrome extension for mindful, intentional browsing.",
  "inLanguage": "en-US"
}
```

### Block 3: SoftwareApplication
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://focusmode.app/#software",
  "name": "FocusMode",
  "description": "A Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks. 4 intervention types, break management, streak tracking, and analytics.",
  "url": "https://focusmode.app",
  "applicationCategory": "BrowserApplication",
  "operatingSystem": "Chrome",
  "browserRequirements": "Requires Google Chrome",
  "softwareVersion": "3.0",
  "installUrl": "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc",
  "author": { "@id": "https://focusmode.app/#organization" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "15000"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Free",
      "price": "0",
      "priceCurrency": "USD",
      "description": "1 group, all 4 intervention types, 5-min breaks",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "PRO Lifetime",
      "price": "20.99",
      "priceCurrency": "USD",
      "description": "Unlimited groups, all break durations, full analytics, data export",
      "availability": "https://schema.org/InStock",
      "url": "https://focusmode.app/pro/"
    }
  ],
  "featureList": [
    "4 mindful intervention types",
    "Group-based website blocking",
    "Schedule-based triggering",
    "Usage-based triggering",
    "Break management with escalation",
    "Mindfulness streak tracking",
    "Analytics dashboard",
    "Path-based blocking with wildcards",
    "Shadow DOM isolation",
    "Privacy-respecting local storage"
  ]
}
```

### Block 4: BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://focusmode.app/" },
    { "@type": "ListItem", "position": 2, "name": "PRO Version", "item": "https://focusmode.app/pro/" },
    { "@type": "ListItem", "position": 3, "name": "Changelog", "item": "https://focusmode.app/changelog/" },
    { "@type": "ListItem", "position": 4, "name": "Privacy Policy", "item": "https://focusmode.app/privacy-policy/" }
  ]
}
```

### Block 5: FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FocusMode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FocusMode is a Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks. Rather than simply preventing access to websites, it uses 4 unique mindfulness-based approaches to help you make conscious decisions about your browsing habits."
      }
    },
    {
      "@type": "Question",
      "name": "Is FocusMode free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, FocusMode has a free tier that includes 1 group and all 4 intervention types (hold, slide, pixel, and instant). The PRO version is a one-time payment of $20.99 that unlocks unlimited groups, full analytics, flexible break durations, and data export. No subscription required."
      }
    },
    {
      "@type": "Question",
      "name": "How is FocusMode different from other website blockers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FocusMode uses 4 unique mindfulness-based interventions (hold, slide, pixel, and instant) instead of simply blocking sites. It respects user autonomy with flexible breaks and progressive escalation, encouraging mindful browsing rather than rigid restriction."
      }
    },
    {
      "@type": "Question",
      "name": "Does FocusMode work on all websites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, FocusMode uses Shadow DOM isolation to work on any website without style conflicts. This ensures the intervention overlays display correctly regardless of a website's existing CSS or JavaScript."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use FocusMode during work hours only?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, schedule-based triggering lets you activate blocking during specific time windows. You can configure FocusMode to only intervene during your work hours or study sessions, and browse freely outside those windows."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I exceed my break limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Optional escalation increases intervention duration, removes easy interventions, and shows streak warnings. This progressive approach helps reinforce mindful browsing habits without being overly punitive. You control what escalation behaviors are enabled per group."
      }
    },
    {
      "@type": "Question",
      "name": "Does FocusMode collect my data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, all data is stored locally in your browser. FocusMode is privacy-respecting with no external tracking. Your browsing data never leaves your device."
      }
    },
    {
      "@type": "Question",
      "name": "Can I block specific pages instead of entire websites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, FocusMode supports path-based blocking with wildcards. For example, you can block youtube.com/shorts while still allowing access to youtube.com for other content. You can also use exclusion patterns like !allowed.example.com."
      }
    }
  ]
}
```

---

## RECOMMENDED PAGE STRUCTURE

### Updated Landing Page Sections

1. **Hero** — "Block Distracting Websites Mindfully"
   - Subtitle: "The Chrome extension that helps you reduce screen time without going cold turkey. Used by 15,000+ people."
   - CTA: "Install Free" + Chrome logo
   - Social proof: 15k+ users, 4.7/5 rating badge
   - Fix or replace broken video with static screenshots

2. **How It Works** — 3-step visual flow
   - Visit blocked site → See calming intervention → Choose break or return to focus
   - Target keyword: "block distracting websites"

3. **4 Intervention Types** — Individual showcase cards
   - Instant Block, Hold to Complete, Slide to Continue, Pixel Garden
   - Screenshots/animations of each
   - Target keyword: "mindful browsing extension"

4. **Feature Deep Dive** — Group blocking, scheduling, break management
   - Target keywords: "website blocker chrome", "digital wellness chrome extension"

5. **Analytics & Streaks** — Dashboard preview
   - Growth calendar, usage charts, blocks prevented
   - Target keyword: "screen time tracker chrome"

6. **Pricing** — Free vs PRO comparison table
   - Emphasize: "$20.99 once, not $8.99/month"
   - Target keyword: "free website blocker chrome"

7. **Testimonials** — Existing reviews (fix truncation)

8. **FAQ** — 8 questions with schema markup
   - Target: Long-tail keywords and featured snippets

9. **Final CTA** — Install + PRO purchase link

### Content Target
- Expand from ~850 words to **1,500-2,000 words**
- Every section should naturally include at least one target keyword

---

## VISUAL & MOBILE FIXES

| Priority | Issue | Fix |
|----------|-------|-----|
| P0 | Broken hero video ("Media Error") | Add poster image fallback, test codec compatibility, provide multiple `<source>` formats |
| P1 | Mobile nav overlap (375px) | Add hamburger menu or simplify mobile nav |
| P1 | Touch targets too small on mobile | Increase button padding to meet 48x48px minimum |
| P2 | Review cards clipped on right edge | Add proper container padding or overflow handling |
| P2 | "4.7 / 5" line break on mobile | Use `white-space: nowrap` |
| P3 | Subtitle text contrast | Darken from `rgb(113,113,122)` to at least `rgb(82,82,91)` |
| P3 | Tab labels lack context | Add "Intervention Styles" label above tabs |

---

## TECHNICAL SEO CHECKLIST

### Immediate (Week 1)
- [ ] Create `robots.txt` allowing all crawlers + AI bots (GPTBot, ClaudeBot, PerplexityBot)
- [ ] Create `sitemap.xml` with all pages
- [ ] Add 5 JSON-LD schema blocks (Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage)
- [ ] Fix title tag: `FocusMode - Website Blocker & Focus Mode Chrome Extension`
- [ ] Fix meta description with target keywords
- [ ] Fix OG/Twitter title from lowercase "focusmode" to proper casing
- [ ] Add `twitter:description` meta tag
- [ ] Update changelog link from v2.7.4 to v3.0
- [ ] Fix broken hero video or add poster fallback
- [ ] Submit sitemap to Google Search Console

### Short-term (Weeks 2-4)
- [ ] Update all page content to reflect v3.0 features
- [ ] Add FAQ section with schema markup
- [ ] Add "How It Works" section
- [ ] Add pricing comparison table (Free vs PRO)
- [ ] Expand content to 1,500-2,000 words
- [ ] Add target keywords to H1, H2s, and body text naturally
- [ ] Fix mobile nav and touch target issues

### Medium-term (Weeks 4-8)
- [ ] Create `/pricing` page
- [ ] Create `/features/` hub + 4 feature sub-pages
- [ ] Create top 3 comparison pages (`/compare/freedom`, `/compare/cold-turkey`, `/compare/blocksite`)
- [ ] Create standalone `/faq` page
- [ ] Implement internal linking across all pages

### Long-term (Weeks 8-16)
- [ ] Launch `/blog` with 8 articles targeting informational keywords
- [ ] Build remaining comparison pages (LeechBlock, StayFocusd)
- [ ] Product Hunt launch for v3.0
- [ ] Chrome Web Store listing optimization
- [ ] Monthly blog cadence (2 posts/month)
- [ ] Link building outreach

---

## SITE ARCHITECTURE (Target State)

```
focusmode.app/
├── /                           ← enhanced homepage
├── /features/                  ← feature overview hub
│   ├── /features/interventions ← 4 intervention types
│   ├── /features/analytics     ← usage tracking
│   ├── /features/scheduling    ← time-based blocking
│   └── /features/groups        ← site group management
├── /pricing                    ← Free vs PRO
├── /compare/                   ← comparison hub
│   ├── /compare/freedom
│   ├── /compare/cold-turkey
│   ├── /compare/blocksite
│   ├── /compare/leechblock
│   └── /compare/stayfocusd
├── /faq                        ← standalone FAQ
├── /blog/                      ← content hub
├── /changelog                  ← v3.0 release notes
├── /privacy-policy
├── /robots.txt
└── /sitemap.xml
```

---

## KEYWORD-TO-PAGE MAPPING

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| `/` | website blocker chrome | focus mode extension, digital wellness chrome extension |
| `/features/interventions` | mindful browsing extension | gentle website blocker, website intervention tool |
| `/features/analytics` | screen time tracker chrome | browsing analytics extension |
| `/features/scheduling` | schedule website blocker | block websites during work hours |
| `/features/groups` | block social media chrome | website blocker categories |
| `/pricing` | focusmode pricing | free website blocker, one-time website blocker |
| `/compare/freedom` | focusmode vs freedom | freedom alternative free |
| `/compare/cold-turkey` | focusmode vs cold turkey | cold turkey alternative |
| `/compare/blocksite` | focusmode vs blocksite | blocksite alternative no subscription |
| `/faq` | focusmode faq | how does focusmode work |
| `/blog/*` | informational long-tail keywords | how to stop mindless scrolling, etc. |

---

## AI SEARCH OPTIMIZATION

### robots.txt — Allow AI Crawlers
```
User-agent: *
Allow: /
Sitemap: https://focusmode.app/sitemap.xml

User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
```

### Content Structure for AI Citation
- Use question-as-heading format for FAQ content
- Provide concise definitions in the first paragraph of each section
- Use comparison tables that AI can extract and cite
- Structure feature descriptions as lists with clear labels

---

## NEXT STEPS

This report + `PRODUCT_OVERVIEW.md` together provide everything needed for another agent to:
1. Update the existing Next.js landing page with SEO-optimized content
2. Implement the 5 JSON-LD schema blocks
3. Create new pages (pricing, features, comparisons)
4. Write blog content targeting the keyword strategy

Both files are at the project root:
- `/PRODUCT_OVERVIEW.md` — comprehensive product details
- `/SEO_REPORT.md` — this file (SEO analysis + action plan)
