# LINEAGE — Steps: What We're Building First

> Selects a first implementation batch from [BRAINSTORM.md](./BRAINSTORM.md) / [TASKS.md](./TASKS.md), in the order it'll actually get built. Chosen for: no backend/accounts required yet, highest visible impact, and each step unblocks the next.

## Why this batch

Everything below is buildable on top of the current stack (React + Vite + TypeScript + localStorage) plus **one** new piece of infra — a serverless function to call a vision AI model. No Supabase, no auth, no Stripe yet. Those come later (Phase F/G in TASKS.md) once it's clear the core loop is worth investing further in.

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
