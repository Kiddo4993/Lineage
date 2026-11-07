# LINEAGE

**Learn to draw in 45 days.** One short lesson a day, a drawing task to finish on paper, and feedback on the photo you upload.

**[Try it live →](https://lineage-ruddy.vercel.app)**

## What's inside

- **A 45-day course in 5 phases**, laid out as a roadmap you work through one day at a time:

  | Phase | Days | You learn |
  |---|---|---|
  | Foundations | 1–9 | lines, shapes, contours, ellipses, boxes, cylinders, gesture |
  | Proportions | 10–18 | measuring, head proportions, profiles, the 8-heads figure |
  | Anatomy Lite | 19–27 | the skeleton, torso, limbs, hands, feet, faces and expressions |
  | Drawing Smarter | 28–36 | light and shadow, value, texture, hatching, silhouettes, focal points |
  | Hero Mode | 37–45 | drawing from photos, environments, creature and character design, a final project |

- **Drawing feedback.** Upload a photo of your drawing and get 2 strengths, 2 things to improve and a next challenge. The feedback comes from Google Gemini through a small serverless function (`api/analyze-drawing.ts`); if that's unavailable, the app falls back to built-in tips.
- **Streaks**, to keep you drawing every day.
- **A sketchbook** of everything you've uploaded, saved in your browser (IndexedDB), so you can compare day 1 with day 30.

## Run it locally

```bash
npm install
npm run dev
```

For AI feedback, set `GEMINI_API_KEY` in your environment. The `/api` function runs on Vercel (`vercel dev` locally). Without a key, everything else still works.

## Built with

React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion, and Google Gemini for feedback, deployed on Vercel.
