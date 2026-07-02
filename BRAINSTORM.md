# LINEAGE — Brainstorm: What Would Make This a Really Great Drawing App

> Based on a review of the current codebase (2026-06-30). LINEAGE already has a strong MVP: a 45-day curriculum, zigzag Duolingo-style roadmap, streaks/XP, a 4-step lesson flow (lesson → task → upload → AI feedback), and a standalone AI coaching mode with 8 subject categories. The ideas below build on that foundation rather than replace it.

---

## 1. Make the "AI feedback" actually AI

Right now `generateFeedback()` in `src/components/LessonView.tsx` and `FEEDBACK_BY_CATEGORY` in `src/components/CoachingView.tsx` are deterministic/static text — the same 8 canned category responses regardless of what's actually in the photo. This is the single highest-leverage upgrade:

- Swap in a real multimodal model call (Claude with vision, or another vision-capable API) that receives the uploaded image + the lesson's `aiFeedbackPrompt` and returns structured feedback (strengths / improvements / next challenge).
- Have the model return a **numeric or qualitative score per skill dimension** (line confidence, proportion, values, construction) so users can see quantified growth over time, not just prose.
- Consider **on-canvas annotation**: have the AI return normalized bounding boxes or points, then draw red/green markup directly over the uploaded image (e.g., "this ellipse's axis is off" with an arrow). Far more useful than text alone.
- Cache/log feedback history per lesson so a user can compare "my Day 1 line work" vs. "my Day 30 line work" directly.

## 2. Turn drawing into an in-app activity, not just an upload step

Currently the flow assumes users draw on physical paper and photograph it. A built-in canvas would remove that friction entirely and unlock features photos can't:

- HTML5 `<canvas>` drawing surface (pressure-sensitive via Pointer Events API) directly inside the "Task" step, as an alternative to camera upload.
- **Timelapse replay** of the user's strokes — satisfying to watch back, great for social sharing, and lets AI feedback analyze *process* (hesitation, redrawing, stroke order) not just the final image.
- **Ghost/onion-skin overlay**: show a faint reference image or a past attempt underneath the new drawing for practice tracing or side-by-side comparison.
- **Overlay grids / proportion guides** (rule of thirds, vertical/horizontal axis lines) toggleable during a task, especially useful for the Proportions and Anatomy phases.

## 3. Deepen the gamification loop beyond streaks + XP

The bones exist (`streakDays`, `xp`, confetti, node states) — there's room to make progression feel richer:

- **Levels/ranks** derived from cumulative XP (e.g., "Line Novice" → "Form Builder" → "Anatomy Adept" → "Studio Artist"), shown as a badge on the home screen.
- **Skill trees per dimension** — separate progress bars for Lines, Proportion, Anatomy, Value, Composition — populated by tagging each lesson's `aiFeedbackPrompt` focus area, so a user sees *which* skill is actually improving, not just "day completed."
- **Streak freeze / streak repair** (mentioned in PROGRESS.md as a premium idea) — let users spend earned XP to freeze a missed day instead of losing their streak, exactly like Duolingo.
- **Weekly quests**: "Complete 3 lessons this week," "Try the Coaching mode on a Portrait," "Draw without erasing for one session" — separate from the core curriculum, driven by light optional side-objectives.
- **Milestone unlockables**: unlock new pencil/brush presets in the canvas, new avatar frames, or bonus "master class" lessons at day 9/18/27/36/45 (phase boundaries already exist for this).

## 4. Build real progress visibility

A user completing 45 days should be able to *see* their own growth, which is currently not captured anywhere beyond `completedLessons: number[]`:

- A **"my sketchbook" gallery** — every uploaded drawing, chronologically, filterable by phase/day. This is the most emotionally compelling artifact of a 45-day app and currently nothing persists the images (`uploadedImage` lives only in component state and is discarded).
- **Before/after comparison**: automatically pair Day 1's first task with Day 45's final task and generate a shareable side-by-side.
- **Progress recap screens** at the end of each phase (Foundations complete! Here's what you learned + a montage of your 9 drawings).
- Export/share a "progress card" (image or PDF) — listed as a low-priority item in PROGRESS.md; worth pulling forward since it's high shareability/marketing value for a young app.

## 5. Community & social layer (careful, opt-in)

Duolingo's engagement isn't just streaks — it's leaderboards and social proof:

- Optional **weekly leaderboard** among friends/followers by XP earned (already planned as "low priority" in PROGRESS.md).
- **Drawing prompts/challenges feed** — a lightweight social wall where users can post a single drawing (not full profile) tied to a shared daily/weekly prompt, with reactions only (no comments, to avoid moderation overhead at MVP stage).
- **Mentor/peer review mode**: let two users swap Coaching-mode feedback on each other's uploads as an alternative to AI — cheap to build on top of the existing `CoachingView` upload+category UI.

## 6. Smarter curriculum adaptivity

The curriculum today (`src/data/curriculum.ts`) is a fixed, linear 45-day sequence for everyone:

- **Placement quiz / skill check** at onboarding — a short set of "draw this in 60 seconds" tasks that AI-scores, then recommends starting day (skip Foundations if the user already draws well).
- **Adaptive remediation**: if AI feedback consistently flags the same weakness (e.g., proportion) across several days, dynamically insert a bonus micro-lesson targeting that weakness before the next scheduled day.
- **Difficulty branches** at phase-review days (9, 18, 27, 36) — offer a harder "challenge path" vs. standard path based on performance so far.
- **Style-specific tracks** post-curriculum (Hero Mode already hints at this with Creature/Character Design) — e.g., a "Manga/Anime track" or "Realism track" that reuses the same engine with different lesson data.

## 7. Retention mechanics beyond the obvious

- **Daily reminder notifications** (already flagged as missing — "date-gated streak logic" and "push notifications" are both open items in PROGRESS.md). Even a simple browser/PWA notification at a user-chosen time would meaningfully lift completion rates.
- **"Draw of the day" widget** — a tiny, low-commitment daily warm-up (one gesture sketch, 60 seconds) separate from the main curriculum, for days a user doesn't have time for a full lesson but doesn't want to break their streak.
- Make the app **installable as a PWA** (manifest + service worker) so it behaves like a native app on mobile home screens — critical for a habit-forming daily-use product.

## 8. Accessibility & inclusivity

- Left-handed vs. right-handed guidance toggle (grip advice in Day 1's lesson text currently assumes nothing, but some technique tips do — good to make explicit and adjustable).
- Alternative "no camera/no upload" mode for users without a scanner/phone camera handy — direct in-app canvas drawing (see #2) solves this too.
- Adjustable text size / reduced motion setting (the app already has heavy custom animations — `pulse-glow`, `bounce-in`, `wiggle` — a `prefers-reduced-motion` fallback would be a quick accessibility win).

## 9. Monetization ideas beyond "Premium CTA"

PROGRESS.md notes premium is "UI only" today. Concrete premium value props:

- Real AI feedback with vision analysis (free tier = template feedback like today; premium = real per-drawing AI critique).
- Downloadable/exportable sketchbook PDF.
- Streak freeze tokens.
- Access to bonus tracks (Style-specific tracks from #6) beyond the core 45 days.
- Priority/unlimited Coaching Mode uploads (free tier could cap at, say, 3/week).

---

## Suggested prioritization (impact vs. effort)

| Idea | Impact | Effort | Notes |
|---|---|---|---|
| Real AI vision feedback | Very High | Medium | Single most requested "is this real?" gap |
| Sketchbook gallery (persist images) | High | Low | Images already captured as base64, just need storage |
| PWA + daily reminder notification | High | Low-Med | Big retention lever, small build |
| In-app canvas drawing | High | Medium-High | Removes camera friction, unlocks timelapse/skill scoring |
| Skill-tree progress dimensions | Medium | Low | Mostly data-tagging + a new progress UI, reuses existing components |
| Date-gated streak logic | Medium | Low | Bug-fix-adjacent; currently increments on any completion |
| Leaderboard / social wall | Medium | Medium | Needs backend/accounts first |
| Adaptive curriculum branching | Medium | High | Needs feedback-history data model first |
