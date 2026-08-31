# Geirfa — Drilio Geirfa Gymraeg

A standalone version of the Welsh vocabulary drill app, built to run
outside Claude's artifact sandbox — mainly so the Welsh pronunciation
feature (via Bangor University's free Techiaith TTS API) can actually
work, without whatever network restriction blocks it inside Claude.

## What's different from the Claude artifact version

- **Progress storage**: uses the browser's `localStorage` instead of
  Claude's `window.storage`. Works the same way (struggling/mastered
  flags persist between visits), but only on the one browser/device
  you use it in — it won't sync across devices the way the Claude
  version's account-linked storage does.
- Everything else (the word list, matching logic, fuzzy-typing
  tolerance, gender colour-coding, the intensifier cluster, etc.) is
  identical.

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (any reasonably
recent version, 18+).

```bash
npm install
npm run dev
```

Then open the local address it prints (usually `http://localhost:5173`).

## Deploying to Vercel

**Easiest way — no command line needed:**

1. Put this folder in a GitHub repository (create a new repo, upload
   these files, or use `git init` / `git push` if you're comfortable
   with git).
2. Go to [vercel.com](https://vercel.com), sign in (a GitHub account
   works fine for this), and click **"Add New… → Project"**.
3. Select your repository. Vercel automatically detects this is a
   Vite project — you shouldn't need to change any settings.
4. Click **Deploy**. You'll get a live URL in about a minute.

**Alternative — Vercel's own command-line tool:**

```bash
npm install -g vercel
vercel
```

Follow the prompts; it'll deploy straight from this folder without
needing GitHub at all.

## Updating the word list later

All the vocabulary lives in the `WORDS` array near the top of
`src/App.jsx` — just add new `{ cy: "...", en: "...", type: "..." }`
entries in the same style as the existing ones, save, and redeploy
(or just `git push` if it's connected to Vercel — it'll redeploy
automatically).
