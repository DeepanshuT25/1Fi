# 1Fi Marketplace — SDE Intern Assignment

A fully working **1Fi Marketplace** section added to the Shop page, built to visually and
structurally match the existing Top Brands / Nearby Stores experience.

## Assumption flagged up front

The 1Fi app's actual tech stack wasn't available to inspect directly (the real app lives behind
login at `app.1fi.in`). This project is built as a **standalone React Native (Expo) app** —
the most common choice for a cross-platform fintech app like 1Fi. If the real codebase uses a
different stack (Flutter, native Android/iOS), the **architecture, data model, and UI spec below
still apply** — only the component syntax would need to be ported.

## What was added

The Shop page's tab selector went from 2 options to 3:

```
Top Brands | Nearby Stores | Marketplace   <-- new
```

`Top Brands` and `Nearby Stores` are reproduced as lightweight stubs (matching the provided
screenshots exactly) purely so the tab switcher has real sibling content to demo against — per
the assignment brief, no new work was required on those two.

**`Marketplace` is the actual deliverable**, fully implemented:

- Product listing (image, name, brand, starting price, EMI tenure tag)
- Search with debounced filtering
- Product detail screen (variant/storage selection, description, live price)
- Dedicated EMI plan selection screen (tenure options, monthly amount, 0%-interest badge)
- CTA to proceed with the selected plan (simulates handing off to the real eligibility-check
  flow, which is out of scope per the assignment)
- Loading, error (with retry), and empty states on every data-driven screen

## Why it's structured this way

```
src/
  theme/            Design tokens (colors, spacing, radii, typography) reverse-engineered
                     from the screenshots — one source of truth for visual consistency.
  data/mockData.js  Mock product + EMI data, shaped like a real API response.
  api/marketplaceApi.js
                     The ONLY file that talks to "the backend". Simulates network delay
                     and a realistic failure rate so loading/error states are exercised,
                     not just theoretical. Swapping in a real backend later means editing
                     only this file — no screen or component changes needed.
  components/       Reusable, presentational-only pieces (ProductCard, EMIPlanCard,
                     VariantSelector, TabSelector, SearchBar, AsyncStates, etc).
  screens/          Screen-level components that own data-fetching state and compose
                     the reusable pieces above.
  navigation/        React Navigation stack: Shop -> ProductDetail -> EMIPlanSelection.
```

**Data flow / state management:** each screen owns its own `status` (`loading` / `success` /
`error`) and data via `useState`/`useEffect`, calling the mock API layer. This keeps state local
and easy to reason about for a feature this size — no global state library was necessary. If the
Marketplace needs to be shared across more screens later (e.g. a cart), promoting the fetch
logic into a small context or a data-fetching library (React Query) would be the natural next
step, and the API layer is already isolated to make that swap painless.

**No hardcoded UI data:** every price, EMI plan, and product field is fetched asynchronously
through `marketplaceApi.js`, never inlined into a component.

## UX decisions worth calling out

- The pill tab label is shortened to **"Marketplace"** (from "1Fi Marketplace") so three segments
  fit comfortably in the existing pill without wrapping or shrinking text unreadably. The full
  name still appears as the section heading inside the tab content.
- EMI plan selection is a **separate screen** (per your direction) rather than inline or a modal,
  reached via a "View EMI Plans" CTA on the product detail screen, with its own sticky "Proceed"
  CTA at the bottom.
- EMI math: since 1Fi's core offering is 0%-interest / no-cost EMI, monthly amount = price ÷
  tenure months, with zero processing fee — matching the FAQ claims on 1fi.in.

## Running it

```bash
npm install
npm start   # then press "i" for iOS simulator, "a" for Android, or "w" for web
```

## Integrating into the real app

1. Copy `src/theme`, the new components, and the three new screens into the existing codebase.
2. Add `Marketplace` as a third entry to whatever component currently renders the
   `Top Brands | Nearby Stores` toggle on the real Shop screen.
3. Register `ProductDetail` and `EMIPlanSelection` in the existing navigation stack that already
   contains the Shop screen.
4. Replace the contents of `src/api/marketplaceApi.js` with real API calls once backend endpoints
   exist — the function signatures are designed to be a drop-in replacement.
