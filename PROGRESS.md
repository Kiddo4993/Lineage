# LINEAGE — Build Progress

> **Status: MVP Complete** · Last updated: 2026-05-28

---

## Project Overview

LINEAGE is a beginner-friendly drawing training app with a Duolingo-style 45-day curriculum, AI coaching, streak tracking, and gamified lesson flow.

**Stack:** React 18 · Vite · TypeScript · Tailwind CSS v3 · shadcn/ui · Framer Motion · canvas-confetti

---

## ✅ Completed

### Infrastructure
- [x] Vite + React 18 + TypeScript project scaffold
- [x] Tailwind CSS v3 with full design token system (`index.css`)
- [x] Custom animations: `fade-in`, `fade-in-up`, `pulse-glow`, `bounce-in`, `wiggle`, `streak-flame`, `xp-pop`
- [x] Phase color system (green/blue/purple/orange/gold) as CSS custom properties
- [x] 3D node box-shadows (`node-shadow-green`, etc.)
- [x] `Outfit` font (800 weight headings) via Google Fonts
- [x] `canvas-confetti` installed for celebration bursts
- [x] `shadcn/ui` component base (Button, Card, Badge, Progress)
- [x] `src/lib/utils.ts` with `cn()` helper
- [x] localStorage persistence for user state

### Data
- [x] **Full 45-day curriculum** (`src/data/curriculum.ts`)
  - Phase 1: Foundations (Days 1–9) — Green
  - Phase 2: Proportions (Days 10–18) — Blue
  - Phase 3: Anatomy Lite (Days 19–27) — Purple
  - Phase 4: Drawing Smarter (Days 28–36) — Orange
  - Phase 5: Hero Mode (Days 37–45) — Gold
- [x] `getLesson(day)` and `getPhaseForDay(day)` helpers
- [x] Motivational messages array
- [x] `getStreakMessage(days)` for streak milestones

### Components
- [x] **`StreakIndicator`** — flame icon + animated streak count
- [x] **`StreakBanner`** — streak count, today's status, overall progress bar
- [x] **`PhaseHeader`** — phase name, days range, completion progress bar per phase
- [x] **`LessonNode`** — 64×64 circle node with phase color, 3D shadow, lock/complete/current states, pulse-glow animation, zigzag positioning
- [x] **`RoadmapView`** — full 45-node zigzag path with all 5 phases, sticky header, premium CTA
- [x] **`LessonView`** — 4-step flow (Lesson → Task → Upload → AI Feedback), confetti on complete, XP popup
- [x] **`CoachingView`** — 8-category picker, image upload, AI feedback display
- [x] **`PathCard`** + **`DayCard`** — stubs (spec requirement)

### Pages
- [x] **`Index`** (Home) — entry screen with CTAs, feature badges, phase dots, social proof, philosophy quote, fixed bottom nav
- [x] **`NotFound`** — 404 page

### App Shell
- [x] **`App.tsx`** — view state machine (home → roadmap → lesson → coaching → notfound), localStorage persistence, lesson completion handler with streak increment

---

## 🚧 Known Limitations (MVP)

| Area | Status | Notes |
|------|--------|-------|
| AI Feedback | Simulated | Uses deterministic seeded feedback. Replace with real AI gateway later |
| Streak date tracking | Basic | Streak increments on each completion, not date-gated. Add daily reset logic for production |
| User accounts | None | State in localStorage only. Wire to Supabase/Lovable Cloud for persistence |
| Push notifications | None | Future: remind users to draw daily |
| Premium gating | UI only | Premium upsell prompt shown; no actual paywall logic |
| Image analysis | Simulated | Upload is real; AI analysis is mocked with a 2s delay |

---

## 📦 File Structure

```
src/
├── App.tsx                     # Root view state machine + localStorage state
├── main.tsx                    # React entry point
├── index.css                   # Design tokens, Tailwind directives, animations
├── App.css                     # Minimal overrides
├── pages/
│   ├── Index.tsx               # Home / entry screen
│   └── NotFound.tsx            # 404
├── components/
│   ├── RoadmapView.tsx         # 45-day zigzag roadmap
│   ├── LessonView.tsx          # 4-step lesson flow
│   ├── CoachingView.tsx        # AI coaching mode
│   ├── LessonNode.tsx          # Individual roadmap node
│   ├── PhaseHeader.tsx         # Phase section header
│   ├── StreakBanner.tsx        # Top streak + progress banner
│   ├── StreakIndicator.tsx     # Flame icon + streak count
│   ├── PathCard.tsx            # Stub (unused)
│   ├── DayCard.tsx             # Stub (unused)
│   └── ui/
│       ├── button.tsx          # 3D gamified button with phase variants
│       ├── card.tsx            # Rounded card with soft shadow
│       ├── badge.tsx           # Phase-colored badges
│       └── progress.tsx        # Animated progress bar
├── data/
│   └── curriculum.ts           # Full 45-day curriculum + helpers
└── lib/
    └── utils.ts                # cn() helper
```

---

## 🗺️ Curriculum Coverage

| Phase | Days | Color | Lessons |
|-------|------|-------|---------|
| Foundations | 1–9 | 🟢 Green | Lines, Shapes, Contour, Ellipses, Boxes, Cylinders, Gesture, Construction, Review |
| Proportions | 10–18 | 🔵 Blue | Measuring, Head, Profile, Angles, Figure 8-heads, Negative Space, Comparing, Plumb Lines, Review |
| Anatomy Lite | 19–27 | 🟣 Purple | Skeleton, Torso, Limbs, Hands, Feet, Neck, Face Features, Expressions, Review |
| Drawing Smarter | 28–36 | 🟠 Orange | Light/Shadow, Values, Cast Shadows, Texture, Hatching, Silhouette, Focal Points, Thumbnails, Review |
| Hero Mode | 37–45 | 🟡 Gold | Full Figure, Portrait, Hands, Environment, Creature Design, Character Design, Style, Final A, Final B |

---

## 🔜 Next Steps (Post-MVP)

### High Priority
- [ ] Real AI drawing analysis via Lovable AI Gateway (multimodal image → feedback)
- [ ] Date-gated streak logic (one lesson per calendar day)
- [ ] Supabase/Lovable Cloud user accounts + progress sync

### Medium Priority
- [ ] Premium subscription flow (Stripe integration)
- [ ] Streak freeze mechanic for premium users
- [ ] Push notification reminders

### Low Priority
- [ ] Video micro-lessons (replace text cards)
- [ ] Leaderboard / community challenges
- [ ] Export progress to PDF / share drawing card

---

## 🎨 Design Tokens Quick Reference

```css
--primary: 145 65% 42%       /* Vibrant green */
--accent:  38 92% 55%        /* Warm orange/amber */
--phase-green:  145 65% 42%
--phase-blue:   210 80% 52%
--phase-purple: 270 60% 55%
--phase-orange: 32 95% 55%
--phase-gold:   45 100% 50%
--streak:       32 95% 55%
--radius:       1rem
```

Font: **Outfit** (Google Fonts) — 400/500/600/700/800 weights

---

*Built with React 18 · Vite · TypeScript · Tailwind CSS v3 · shadcn/ui*
