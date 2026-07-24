# LINEAGE — Steps: What We're Building First

> Selects a first implementation batch from [BRAINSTORM.md](./BRAINSTORM.md) / [TASKS.md](./TASKS.md), in the order it'll actually get built. Chosen for: no backend/accounts required yet, highest visible impact, and each step unblocks the next.

## Why this batch

Everything below is buildable on top of the current stack (React + Vite + TypeScript + localStorage) plus **one** new piece of infra — a serverless function to call a vision AI model. No Supabase, no auth, no Stripe yet. Those come later (Phase F/G in TASKS.md) once it's clear the core loop is worth investing further in.

---

## 📋 Progress Log (current status, updated live)

| Step | Status | Notes |
|---|---|---|
| 1. Streak fix | ✅ Done | `App.tsx` tracks `lastCompletedDate`; verified via build + typecheck |
| 2. Persist drawings (IndexedDB) | ✅ Done | `src/lib/drawingStore.ts`; wired into `LessonView`/`CoachingView` |
| 4. Sketchbook gallery | ✅ Done | `SketchbookView.tsx`, nav icon on home screen; Playwright-verified, no console errors |
| 3. Real AI feedback (Gemini) | ✅ Done (local) | Verified end-to-end via `vercel dev` + Playwright: uploaded a real test drawing, got back specific, accurate Gemini feedback (not canned text), zero console errors. Model name fixed (`gemini-2.5-flash` → `gemini-flash-latest`, since 2.5 was deprecated for new API keys). **Remaining: production deploy** — push to GitHub + deploy on Vercel to test the live URL. |
| 5. PWA install support | ⬜ Not started | Waiting until Step 3 is confirmed working |
| 6. Native mobile app (React Native) | ⬜ Not started, scoped | New — see below. Large effort, separate codebase. Will start after the web app's core loop (Steps 1–5) is solid |

### Known findings from setup so far
- **Model name deprecated:** `gemini-2.5-flash` returned a 404 ("no longer available to new users") for a freshly created API key. Fixed by switching to the `gemini-flash-latest` alias, which Google keeps pointed at their current recommended flash model (resolved to `gemini-3.5-flash` at time of testing) — this avoids needing to update the model string again as Google rotates versions.
- **`npm run build` does NOT test the AI feature** — it only builds static frontend files. Use `npx vercel dev` (starts frontend + `/api` function together on `localhost:3000`) to test AI feedback locally.
- **`.env.local` is local-only** and is *not* used by the deployed site — Vercel reads env vars from the dashboard at build/deploy time instead. No second "production env file" is needed.
- **`vercel dev` pulls env vars from the linked Vercel project (remote), not from `.env.local`**, once a project is linked — confirmed via `--debug` log (`Fetching Environment Variables of prj_...`). So the dashboard variable name/value is what actually matters for both local `vercel dev` testing and production.
- Vercel's "Sensitive" environment variables **cannot be scoped to Development** (their values can't be decrypted for local pulls) — we're keeping `GEMINI_API_KEY` as a plain (non-sensitive) variable across all three environments to sidestep this, acceptable given it's a free-tier key with low stakes.
- The Gemini key was pasted into chat/screenshots during setup — flagged and the user rotated it.

---

## Step 1 — Fix streak logic (foundation)
**No new tools. No user input needed.**

Right now `handleCompleteLesson` in `src/App.tsx` bumps `streakDays` on *every* lesson completion, even multiple in one day or after a big gap. Fix: track `lastCompletedDate`, only increment once per calendar day, reset if a day was missed.

---

## Step 2 — Persist uploaded drawings locally
**New dependency:** `idb` (npm package, MIT license, no account/API key needed) — a thin wrapper around the browser's built-in IndexedDB.

Currently `uploadedImage` is thrown away the moment you leave `LessonView`/`CoachingView`. This step saves every drawing (as base64) into IndexedDB, keyed by day, so nothing is lost. Unlocks Steps 3 and 4.

**User input needed:** none — this is fully local/offline, purely a code change.

---

## Step 3 — Real AI feedback (the big one)
**This is the step that needs your input and an external service.**

Replaces the fake, canned feedback (`generateFeedback()` in `LessonView.tsx`, `FEEDBACK_BY_CATEGORY` in `CoachingView.tsx`) with a real call to a vision-capable AI model that actually looks at the uploaded drawing.

**Decisions locked in:**
- **AI provider:** Google Gemini (`gemini-2.5-flash` or similar vision-capable model) via the Gemini API. Chosen because it has a genuinely free tier (rate-limited, no credit card required) through [Google AI Studio](https://aistudio.google.com/app/apikey) — Anthropic's API only gives a small trial credit, then becomes pay-as-you-go.
- **Hosting for the serverless function:** Vercel — you already have an account, deploys from GitHub, first-class Vite support.

**Why a backend is required:** The API key must never be shipped in frontend code (anyone could open dev tools and steal it). We need one small serverless function that receives the image from the browser, calls the Gemini API server-side, and returns structured feedback. This is a small addition, not a full backend — no database, no auth.

**Still needed from you before this step can go live:**
1. **A Gemini API key** — go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey), sign in with a Google account, click "Create API key" (free, no card needed for the free tier). I'll help you wire it into a local `.env` file (never committed to git) when we get here.
2. **Connect this repo to your Vercel account** (push to GitHub + import in Vercel, or use the `vercel` CLI directly) so the function can deploy.
3. Confirm you're okay with **image data being sent to Google's Gemini API** for analysis (standard for any AI vision feature, worth confirming since it's user-generated content).
4. Be aware the **free tier has rate limits** (requests per minute/day) — fine for personal use and testing, but if LINEAGE gets real traffic later we'd revisit a paid tier or a different provider.

The code for the serverless function and frontend wiring can be written *before* you have the key — it just won't be testable end-to-end until it exists.

### ✅ Code status: written and building cleanly

- `api/analyze-drawing.ts` — Vercel serverless function, calls Gemini (`gemini-2.5-flash`) with the uploaded image + lesson/category prompt, requests structured JSON (`strengths`, `improvements`, `next`).
- `src/lib/aiClient.ts` — frontend fetch wrapper; returns `null` on any failure.
- `src/types/feedback.ts` — shared `DrawingFeedback` type.
- `LessonView.tsx` and `CoachingView.tsx` now call the real API on "Get AI Feedback" / "Analyze My Drawing", and **automatically fall back to the original canned feedback** if the API call fails (offline, quota exceeded, missing key, etc.) — the app never breaks even without a key configured.
- `.env.example` added (copy to `.env.local`, fill in your key — `.env*` is gitignored).

### To actually test this end-to-end

1. ✅ Key created at aistudio.google.com/app/apikey (rotated after being exposed in chat).
2. ✅ Vercel CLI installed locally (`npm install -D vercel`, run via `npx vercel`), logged in, project linked (`npx vercel link`).
3. 🟡 **Remaining:** rename the `Gemini_API_Key` dashboard variable to exactly `GEMINI_API_KEY`, then re-run `npx vercel dev` and test `/api/analyze-drawing`.
4. **Production deploy** (once local test passes): push this repo to GitHub, import it in the Vercel dashboard (or run `npx vercel --prod`) — the same `GEMINI_API_KEY` dashboard variable is used automatically.

---

## Step 4 — Sketchbook gallery
**No new external services. No user input needed beyond approving the feature.**

Once Steps 2 and 3 are in place, this is just a new view (`SketchbookView.tsx`) that reads everything out of IndexedDB and displays it in a grid, with each drawing's saved AI feedback attached. Pure frontend work.

---

## Step 5 — PWA install support
**New dependency:** `vite-plugin-pwa` (npm package, free, no account needed).

Makes the app installable to a phone home screen with an offline-capable shell. Low effort, meaningfully boosts daily-use habit formation.

**What I need from you:**
- **App icons**: a square logo/icon image (ideally 512×512px PNG, plus a 192×192px version) to use as the home-screen icon. If you don't have one yet, I can generate a simple placeholder icon, or we can skip this step until you have branded artwork.

---

## Step 6 — Native mobile app (React Native)
**Decided:** you want a real native app (App Store / Play Store), not just the PWA from Step 5. This is a significantly larger scope than everything above — worth understanding before we start:

- **What it means:** a **separate codebase** using React Native (or Expo, which wraps React Native with a much easier build/deploy toolchain — recommended). The UI (roadmap, lesson flow, coaching, sketchbook) gets rebuilt with React Native components — web `<div>`/Tailwind doesn't run natively, though the *logic* (curriculum data, streak/XP logic, drawing store schema, API calls to `/api/analyze-drawing`) can largely be reused/ported.
- **Recommended approach:** Expo (`npx create-expo-app`) — handles iOS/Android builds without needing a Mac + Xcode for most of development, has Expo Go for instant device testing, and EAS Build/Submit for shipping to the app stores without maintaining native build infra yourself.
- **New external services/accounts needed:**
  - **Apple Developer Program** ($99/year) — required to publish to the App Store, and needed even for some testing (TestFlight).
  - **Google Play Console** ($25 one-time) — required to publish to the Play Store.
  - **Expo/EAS account** (free tier available) — for build/submit tooling.
- **Sequencing recommendation:** finish validating the web app's core loop first (Steps 1–5, especially confirming real AI feedback works and people actually use it), *then* invest in the native rebuild — porting a validated product is a much better bet than building two versions in parallel from day one.

This step is scoped but **not started** — say the word when you want to kick it off, ideally after Step 3 is confirmed working end-to-end.

---

## Summary: what's needed from you before I can start Step 3 and Step 5

| Item | Needed for | Where to get it |
|---|---|---|
| ~~AI provider choice~~ | Step 3 | ✅ Decided: Google Gemini (free tier) |
| ~~Hosting platform choice~~ | Step 3 | ✅ Decided: Vercel |
| Gemini API key | Step 3 (to test end-to-end) | aistudio.google.com/app/apikey (free) |
| ~~Vercel account~~ | Step 3 (to deploy) | ✅ You already have one |
| Repo pushed to GitHub + connected to Vercel | Step 3 (to deploy) | github.com + your Vercel dashboard |
| Confirmation on sending user drawings to Gemini API | Step 3 | Your call |
| App icon (512×512 + 192×192 PNG) | Step 5 | You provide, or I generate a placeholder |

**Steps 1, 2, and 4 need no external accounts or input from you — starting now.** Step 3's code can be written ahead of the API key/Vercel setup; it just can't be tested live until those exist.
