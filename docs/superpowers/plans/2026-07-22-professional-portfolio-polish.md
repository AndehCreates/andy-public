# Professional Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the portfolio's first impression and navigation quality with restrained, accessible interaction while preserving the evidence-led content model.

**Architecture:** Keep all public content server-rendered in Astro. Refine shared navigation and homepage presentation with semantic HTML and CSS-only enhancements, including a native `details` disclosure for mobile navigation. Motion remains transform/opacity-only and is disabled by the existing reduced-motion rule.

**Tech Stack:** Astro 6, TypeScript, CSS, Playwright.

---

### Task 1: Make mobile navigation concise without hiding public routes

**Files:**
- Modify: `src/components/layout/SiteHeader.astro`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write a failing mobile navigation test**

Assert that the primary task routes remain visible at 375px and that secondary links are exposed by a native disclosure.

- [ ] **Step 2: Run the responsive test to verify it fails**

Run: `npx playwright test tests/e2e/responsive.spec.ts --reporter=list`

Expected: FAIL because all seven links are currently always expanded.

- [ ] **Step 3: Implement the semantic responsive navigation**

Keep Work, Systems, and About visible on small screens; expose Handbook, Signal Library, and Resume through a labelled `details` control. Preserve the complete list at desktop width and current-page semantics.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npx playwright test tests/e2e/responsive.spec.ts --reporter=list`

Expected: PASS at mobile and desktop sizes with no horizontal overflow.

### Task 2: Give the homepage a more professional, tactile first impression

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/homepage.spec.ts`

- [ ] **Step 1: Write failing homepage presentation assertions**

Assert one opportunity signal, accurate CTA labels, an asymmetric flagship layout, and CSS hooks for the polished interaction states.

- [ ] **Step 2: Run the homepage test to verify it fails**

Run: `npx playwright test tests/e2e/homepage.spec.ts --reporter=list`

Expected: FAIL on the new layout and interaction contracts.

- [ ] **Step 3: Implement the smallest presentation change**

Clarify the primary CTA, keep the opportunity signal only in the hero, make the lead flagship visually primary, and add shared hover/active/focus transitions that use only opacity, color, border, and transform.

- [ ] **Step 4: Run focused verification**

Run: `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts --reporter=list`

Expected: PASS.

### Task 3: Verify and commit the polish pass

**Files:**
- Modify: files from Tasks 1 and 2 only

- [ ] **Step 1: Run complete verification**

Run: `npm run build` and `CI=1 npx playwright test --reporter=list`

Expected: type, unit, content, static build, and browser checks pass.

- [ ] **Step 2: Inspect desktop and mobile rendered surfaces**

Verify the homepage and navigation at 1280px and 375px, including the no-JavaScript disclosure path and reduced-motion style behavior.

- [ ] **Step 3: Commit**

```powershell
git add src/components/layout/SiteHeader.astro src/pages/index.astro src/styles/global.css tests/e2e/homepage.spec.ts tests/e2e/responsive.spec.ts docs/superpowers/plans/2026-07-22-professional-portfolio-polish.md
git commit -m "feat: polish portfolio interactions"
```
