# LINEAGE — Build Tasks for Brainstormed Features

> Companion to [BRAINSTORM.md](./BRAINSTORM.md). Each section is a buildable unit: what to build, which files it touches, what languages/libraries/services it needs, and rough sequencing. Ordered roughly by priority from the brainstorm's impact/effort table.

**Current stack (unchanged baseline):** React 18 · Vite · TypeScript · Tailwind CSS v3 · shadcn/ui (manual) · canvas-confetti · Lucide icons · localStorage persistence, no backend.

---

## Phase A — Foundation fixes (do first, unblocks everything else)

### A1. Date-gated streak logic
**Why first:** small, isolated bug-fix; other features (skill trees, reminders) assume streak data is trustworthy.

- **Language/tools:** TypeScript only, no new deps.
- **Files:** `src/App.tsx` (`AppState`, `handleCompleteLesson`), `src/data/curriculum.ts` (`getStreakMessage`).
- **Steps:**
  1. Add `lastCompletedDate: string | null` (ISO date) to `AppState`.
  2. In `handleCompleteLesson`, compare `lastCompletedDate` to today: same day → no streak change; yesterday → `streakDays + 1`; older → reset to 1.
  3. Add a `todayCompleted` reset on app load if `lastCompletedDate !== today`.
  4. Update `StreakBanner.tsx` / `StreakIndicator.tsx` if they assume `todayCompleted` persists incorrectly.

### A2. Persist uploaded drawings (unlocks sketchbook gallery, before/after, AI history)
- **Language/tools:** TypeScript, `IndexedDB` (via a tiny wrapper like `idb`, or hand-rolled) — localStorage is too small for many base64 images.
- **Files:** new `src/lib/drawingStore.ts`; touches `LessonView.tsx`, `CoachingView.tsx`.
- **Steps:**
  1. `npm install idb`.
  2. Create `drawingStore.ts` exposing `saveDrawing(day, dataUrl)`, `getDrawing(day)`, `getAllDrawings()`.
  3. In `LessonView.handleComplete`, persist `uploadedImage` keyed by `day` before calling `onComplete`.
  4. In `CoachingView`, persist ad-hoc uploads keyed by timestamp + category (separate namespace from curriculum drawings).

---

## Phase B — Real AI feedback (highest impact)

### B1. Wire a real vision model into lesson + coaching feedback
- **Language/tools:** TypeScript (frontend) + a serverless/backend function (Node.js or Python) to keep the API key off the client. Use the Anthropic API (Claude with vision) or another multimodal vision API.
- **New infra:** a minimal backend — options: Vercel/Netlify serverless function, or a small Express/Fastify server. Given no backend exists yet, a serverless function is the lowest-effort path.
- **Files:**
  - New `api/analyze-drawing.ts` (serverless function) — receives `{ imageBase64, prompt, categoryOrDay }`, calls the vision model, returns structured JSON `{ strengths: string[], improvements: string[], next: string, scores?: Record<string, number> }`.
  - `src/lib/aiClient.ts` — frontend fetch wrapper calling `/api/analyze-drawing`.
  - Replace `generateFeedback()` in `LessonView.tsx` and the static `FEEDBACK_BY_CATEGORY` lookup in `CoachingView.tsx` with calls to `aiClient`.
  - `.env` / `.env.example` for `ANTHROPIC_API_KEY` (server-side only, never exposed to client).
- **Steps:**
  1. Stand up serverless function scaffold (`vercel dev` or equivalent) if not already deployable that way — confirm hosting target first.
  2. Define the JSON response schema once, share as a TS type in `src/types/feedback.ts`.
  3. Implement server function: build a prompt combining `lesson.aiFeedbackPrompt` (or category tip) + image, request structured output (use tool-use/JSON mode for reliability).
  4. Update `LessonView` / `CoachingView` to show a real loading state while awaiting network response instead of the current fixed `setTimeout`.
  5. Add error handling / fallback to the old canned feedback if the API call fails (keeps app usable offline or if quota exceeded).
  6. Persist the returned feedback alongside the drawing (`drawingStore.ts` from A2) for history/comparison.

### B2. On-canvas AI markup (stretch, after B1 ships)
- **Language/tools:** TypeScript, HTML5 Canvas 2D API (draw over the uploaded image).
- **Files:** new `src/components/AnnotatedImage.tsx`.
- **Steps:**
  1. Extend the B1 response schema with optional `annotations: { x: number, y: number, label: string }[]` (normalized 0–1 coordinates).
  2. Render the uploaded image on a `<canvas>`, draw markers/arrows + labels from `annotations` on top.
  3. Swap the plain `<img>` in the feedback steps of `LessonView`/`CoachingView` for `AnnotatedImage`.

### B3. Skill-dimension scoring + skill tree UI
- **Language/tools:** TypeScript only.
- **Files:** `src/data/curriculum.ts` (tag each `Lesson` with a `skillFocus: ("lines"|"proportion"|"anatomy"|"value"|"composition")[]`), new `src/components/SkillTree.tsx`, `src/lib/skillProgress.ts`.
- **Steps:**
  1. Add `skillFocus` field to the `Lesson` interface and backfill all 45 lessons.
  2. When B1's scored feedback returns, accumulate per-skill scores in `AppState` (e.g., `skillXp: Record<SkillId, number>`).
  3. Build `SkillTree.tsx` — 5 progress bars, shown on `Index.tsx` or a new "Profile" view.

---

## Phase C — In-app drawing canvas

### C1. Native drawing surface as an upload alternative
- **Language/tools:** TypeScript, HTML5 Canvas + Pointer Events API (no extra library needed for basic version; consider `perfect-freehand` npm package for nicer stroke rendering).
- **Files:** new `src/components/DrawingCanvas.tsx`; integrate into `LessonView.tsx` "Upload" step as a tab alongside camera/file upload.
- **Steps:**
  1. `npm install perfect-freehand` (optional, for pressure-shaped strokes).
  2. Build `DrawingCanvas` with pointerdown/move/up handlers recording stroke points, undo button, clear button, color/brush size picker.
  3. On "done," export canvas to a `dataUrl` via `canvas.toDataURL()` — feed into the same `uploadedImage` state/flow already in `LessonView`.
  4. Store the raw stroke data (not just the flattened image) for the timelapse feature (C2).

### C2. Timelapse replay (stretch, depends on C1)
- **Language/tools:** TypeScript, Canvas API.
- **Files:** new `src/components/TimelapsePlayer.tsx`.
- **Steps:**
  1. Persist stroke-by-stroke data (array of `{points, timestamp}`) alongside the flattened image in `drawingStore.ts`.
  2. `TimelapsePlayer` replays strokes on a canvas at accelerated speed via `requestAnimationFrame`.
  3. Add a "Watch replay" button on sketchbook gallery items (Phase D).

### C3. Reference overlay / proportion grid toggle
- **Language/tools:** TypeScript + CSS (simple absolutely-positioned SVG/canvas overlay, no new deps).
- **Files:** `DrawingCanvas.tsx` — add a toggle button rendering a rule-of-thirds or axis-guide SVG overlay at low opacity.

---

## Phase D — Progress visibility

### D1. Sketchbook gallery view
**Depends on:** A2 (persisted drawings).
- **Language/tools:** TypeScript, React.
- **Files:** new `src/components/SketchbookView.tsx`, wire into `App.tsx` view state machine (`"sketchbook"` view), add nav entry point on `Index.tsx`.
- **Steps:**
  1. `getAllDrawings()` from `drawingStore.ts`, render as a responsive grid grouped by phase/day.
  2. Tap a thumbnail → detail view showing the drawing + its saved AI feedback (from B1) + optional timelapse (C2).
  3. Add filter chips (by phase, by skill focus from B3).

### D2. Before/after comparison + phase recap screens
**Depends on:** A2, D1.
- **Language/tools:** TypeScript, Canvas API for compositing (or just CSS side-by-side, simpler to start).
- **Files:** new `src/components/PhaseRecap.tsx`, `src/components/BeforeAfter.tsx`.
- **Steps:**
  1. Trigger `PhaseRecap` automatically when `completedLessons` includes a phase's last review day (9, 18, 27, 36, 45).
  2. Show a montage (CSS grid of thumbnails) + one headline stat (e.g., "9 drawings, most improved: proportion").
  3. `BeforeAfter` — simple two-image side-by-side (Day 1 task vs. matching Day 45 task), CSS `object-fit` comparison slider (can use a small library like `react-compare-image` or hand-roll with a draggable divider).

### D3. Export/share progress card
- **Language/tools:** TypeScript, `html2canvas` (npm) to rasterize a styled DOM node into a shareable PNG; or generate a PDF with `jspdf`.
- **Files:** new `src/lib/exportCard.ts`, share button in `SketchbookView.tsx` or `PhaseRecap.tsx`.
- **Steps:**
  1. `npm install html2canvas`.
  2. Design a shareable card component (streak, days completed, 4 favorite drawings).
  3. Render off-screen, rasterize with `html2canvas`, trigger download via `<a download>`.

---

## Phase E — Retention: PWA + reminders

### E1. PWA install support
- **Language/tools:** `vite-plugin-pwa` (handles manifest + service worker generation for Vite).
- **Files:** `vite.config.ts`, new `public/manifest.webmanifest` (or plugin-generated), app icons in `public/`.
- **Steps:**
  1. `npm install -D vite-plugin-pwa`.
  2. Configure plugin in `vite.config.ts` with app name, theme colors (reuse existing design tokens from `index.css`), icons.
  3. Verify "Add to Home Screen" works on mobile Chrome/Safari.

### E2. Daily reminder notifications
- **Language/tools:** Web Notifications API + Service Worker (from E1) for local scheduling; for real cross-session/backgrounded push, need a backend + Push API (VAPID keys) — larger lift.
- **Files:** new `src/lib/notifications.ts`, settings UI (new `src/components/SettingsView.tsx` or a section in `Index.tsx`) to let users pick a reminder time and grant permission.
- **Steps (local-notification MVP, no backend):**
  1. Request `Notification.permission` from a settings toggle.
  2. Use `setTimeout`/`Service Worker` periodic sync (limited browser support) or, more reliably, check "have I completed today?" on each app open and show an in-app banner nudge — simplest, no permissions needed, ships fastest.
  2b. **Full push notifications** (stretch): requires a backend to schedule and send via the Push API — defer until a backend exists for other reasons (accounts, AI proxy).

---

## Phase F — Accounts & backend (unlocks leaderboards, cross-device sync, real premium gating)

**This is the big infrastructural fork.** Recommend Supabase (Postgres + Auth + Storage) since PROGRESS.md already anticipated it.

- **Language/tools:** TypeScript, `@supabase/supabase-js`, Supabase (Postgres, Auth, Storage buckets for drawing images).
- **Steps:**
  1. `npm install @supabase/supabase-js`.
  2. Create Supabase project; schema: `users`, `progress` (day, completed_at, xp), `drawings` (storage path, day, feedback jsonb), `streaks`.
  3. Add auth screens (email/OAuth) — new `src/pages/Auth.tsx`.
  4. Migrate `loadState`/`saveState` in `App.tsx` from localStorage to Supabase reads/writes (keep localStorage as offline cache/fallback).
  5. Move drawing storage from IndexedDB (A2) to Supabase Storage, keeping IndexedDB as a local cache for the canvas/offline case.
  6. This unlocks: **leaderboards** (Postgres query), **real premium gating** (a `subscriptions` table + Stripe webhook), **cross-device sync**.

### F1. Leaderboard (depends on Phase F backend)
- **Files:** new `src/components/Leaderboard.tsx`, Supabase query on `progress`/`xp` ordered descending, scoped to a friends list or global opt-in.

### F2. Stripe premium gating (depends on Phase F backend)
- **Language/tools:** Stripe (`stripe` npm package server-side, `@stripe/stripe-js` client-side), Supabase Edge Function or serverless function for webhook handling.
- **Steps:** Stripe Checkout session → webhook sets `subscriptions.active = true` in Supabase → client reads that flag to unlock premium features (streak freeze, bonus tracks, unlimited coaching).

---

## Phase G — Curriculum adaptivity (do last — depends on B1/B3 data existing)

### G1. Placement quiz
- **Files:** new `src/components/PlacementQuiz.tsx`, hooks into `App.tsx` onboarding flow before first roadmap view.
- Uses the same AI vision scoring from B1 to grade 2-3 quick warm-up tasks and recommend a starting day.

### G2. Adaptive remediation micro-lessons
- **Depends on:** B3 skill scoring history.
- **Files:** `src/data/remediationLessons.ts` (small bonus-lesson bank per skill), logic in `App.tsx` to detect a skill score plateau/decline over N days and insert a remediation lesson into the roadmap before the next scheduled day.

---

## Suggested build order (sequencing summary)

1. **A1, A2** — fix streak logic, persist drawings (foundation, low effort)
2. **B1** — real AI feedback (highest impact single feature)
3. **D1** — sketchbook gallery (cheap payoff once A2+B1 exist)
4. **E1** — PWA support (cheap, high retention value)
5. **C1** — in-app canvas (medium effort, big UX unlock)
6. **B3, D2, D3** — skill tree, recap screens, export card
7. **C2, C3, B2** — timelapse, overlays, AI markup (polish layer)
8. **Phase F** — accounts/backend (only once ready to invest in infra)
9. **F1, F2, G1, G2** — leaderboard, payments, adaptivity (post-backend)
