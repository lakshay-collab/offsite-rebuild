# plan.md — HIOffsite Homepage Pixel-Perfect Clone (React, frontend-only)

## 1) Objectives
- Rebuild **hioffsite.com homepage** pixel-to-pixel in **React** (Emergent) using **Instrument Sans (300–700)**.
- Use **static hero background image** (video poster) with correct overlays, typography, spacing.
- Preserve **full interactivity**: sticky pill navbar + dropdown mega-menus, carousels (drag/swipe), testimonial tabs, FAQ accordion, hover states.
- Keep **buttons/forms visual-only** (all CTAs link to `#`; newsletter input non-submitting).
- Use existing **Webflow CDN assets** (images/SVGs) referenced in this conversation.

## 2) Implementation Steps

### Phase 1 — Core Interactivity POC (isolation)
**Goal:** Prove the riskiest parts (dropdown layering + swipe carousels + accordion/tabs) feel identical before building full page.

User stories:
1. As a visitor, I can open/close the **Capabilities** and **Resources** dropdowns and they layer above the hero.
2. As a visitor, I can **drag/swipe** a horizontal carousel with momentum and snap.
3. As a visitor, I can switch **testimonial tabs** and see corresponding cards update instantly.
4. As a visitor, I can expand/collapse **FAQ** items with smooth animation.
5. As a visitor, I can scroll and keep the **sticky pill navbar** visible without layout jump.

Steps:
- Websearch best-practice for: **Headless dropdown + outside click**, **Swiper vs Embla** in React, **reduced-motion accessibility**.
- Create a `/poc` route or toggleable POC section containing:
  - Sticky pill nav with two dropdowns (dummy menu items from crawl data).
  - One Swiper/Embla carousel with placeholder cards.
  - Testimonial tab switcher.
  - FAQ accordion.
- Validate on desktop + mobile breakpoints; fix z-index/scroll locking/focus handling.
- Only proceed when POC interactions are stable.

### Phase 2 — V1 App Development (full homepage build)
**Goal:** Implement the entire homepage sections with real content/assets; keep interactions from POC.

User stories:
1. As a visitor, I can scan the hero message and primary CTA immediately.
2. As a visitor, I can explore **Success Stories** and **Destinations** via swipe/drag.
3. As a visitor, I can browse **Our Expertise** cards and understand offerings.
4. As a visitor, I can read testimonials by role via tabs.
5. As a visitor, I can find answers in FAQs and see the final CTA + footer links.

Steps:
- Project setup:
  - React app structure: `components/`, `sections/`, `styles/`, `data/`.
  - Load **Instrument Sans** via Google Fonts; set global typography rules.
  - Create theme tokens (approx): orange `#EA7B1E`, teal `#0F4C5C`, text `#111`, light section bg.
- Build page as composable sections in order:
  1. **Sticky pill nav** (logo, Capabilities dropdown, Explore, Resources dropdown, Company, Get in touch button).
  2. **Hero**: static poster bg + dark overlay, H1/subtext, CTA button, client logo strip.
  3. **Success Stories**: horizontal image carousel.
  4. **Stats**: 3 cards (5 stars, 500,000+ attendees, 1k+ vendor partners) with embedded imagery.
  5. **Our Expertise**: 6-card grid (images + text).
  6. **Top Destinations**: carousel (15 cities) + mid CTA banner “Ready to Plan Your Offsite?”.
  7. **Why Partner**: 6 features + center image layout.
  8. **How It Works**: 3 numbered cards with images.
  9. **Testimonials**: tabs (HR & People / Operations / Sales / Management) + 3 testimonial cards.
  10. **Resources**: “The HI Offsite Edit” + View all button + 3 blog cards.
  11. **FAQ**: split layout + contact box + 5 accordion items.
  12. **Final CTA**: beach bg + “Get a Free Proposal”.
  13. **Footer**: columns + newsletter box + bottom legal bar.
- Data management:
  - Store all text, links (`#`), and asset URLs in `data/homepage.ts` to keep components clean.
- Styling:
  - Use CSS Modules or styled-components (pick one) for deterministic styling.
  - Implement precise sizes for hero typography (H1 72px, weight 600, letter-spacing -2.16px) and section headings.
  - Add hover/focus-visible states across buttons/links.
- Interactions:
  - Dropdown mega-menu: outside click to close, ESC to close, focus management.
  - Carousels: drag/swipe, arrows (if present), pagination as needed.
  - Tabs: accessible `role="tablist"` semantics.
  - Accordion: smooth height transitions, only one open vs multi-open (match current behavior).
- Conclude Phase 2 with 1 round of testing-agent:
  - Visual comparison screenshots vs original at 1920 and mobile widths.
  - Click-through of dropdowns, tabs, accordion; drag carousels.

### Phase 3 — Polish + Hardening (pixel/perf/accessibility)
User stories:
1. As a visitor on mobile, the layout remains readable with correct spacing.
2. As a visitor, animations feel smooth and not janky.
3. As a visitor using keyboard, I can navigate menus/tabs/accordion.
4. As a visitor, images load without content shifting.
5. As a stakeholder, I can confirm pixel parity with before/after screenshots.

Steps:
- Pixel polish pass:
  - Adjust spacing, border radii, shadows, overlays, and heading color emphasis (teal word highlights).
  - Ensure sticky nav background/blur matches.
- Performance:
  - Lazy-load below-the-fold images; add `width/height` to reduce CLS.
- Accessibility:
  - Add `aria-expanded`, `aria-controls`, tab roles; ensure contrast.
- Final testing-agent pass:
  - Regression test all interactions + responsive layout.
  - Screenshot set for hero, mid-sections, footer.

## 3) Next Actions
- Confirm tool choice for carousel: **Swiper** (recommended) or Embla.
- Implement Phase 1 POC route/section and validate interactions.
- Build Phase 2 full homepage in one cohesive implementation push (minimize large fragmented edits).
- Run testing-agent and iterate until pixel/interaction match.

## 4) Success Criteria
- Visual parity: homepage matches original within practical tolerance across desktop + mobile (typography, spacing, colors, images).
- Functional parity: dropdowns, carousels (drag), tabs, accordion work reliably; sticky nav behaves correctly.
- No backend reliance: all CTAs/forms are non-submitting and link to `#`.
- Clean, maintainable React structure: section components + centralized data + consistent styling tokens.
