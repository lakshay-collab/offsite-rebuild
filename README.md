# HI Offsite website

Marketing website for HI Offsite (corporate offsites, MICE, incentive travel). A React single-page app with all of its
content, photographs and videos stored in this folder, so it runs the same anywhere: nothing is fetched from another site.

## What's in the folder

| Path | What it is |
| --- | --- |
| `frontend/` | The website (React 19, Create React App + craco, Tailwind, framer-motion, GSAP, Lenis). **This is all you need to run the site.** |
| `frontend/public/images/` | Every photograph (`site/`, `blog/`, `flags/`). Pages refer to them as `/images/...`, so keep this folder next to `src/`. |
| `frontend/public/content/` | Blog posts, sub-service pages, case studies and legal text as JSON (loaded when a page opens). |
| `frontend/src/data/content.js` | Most of the home-page copy, and the image paths for each section. |
| `backend/` | A small FastAPI + MongoDB starter. The website does **not** use it. |

## Run it locally

You need Node.js 20+ and Yarn 1 (`npm install -g yarn`).

```bash
cd frontend
yarn install
yarn start        # opens http://localhost:3000
```

## Build for hosting

```bash
cd frontend
yarn build        # outputs frontend/build, a static site you can upload anywhere
```

Hosting on Vercel / Netlify / Cloudflare Pages: set the **root directory** to `frontend`, **build command** `yarn build`,
**output directory** `build`. Add a rewrite of every path to `/index.html` (it is a single-page app with client-side routes).

## Changing images

Put the new file in `frontend/public/images/site/` (or `blog/`) and point to it as `/images/site/<file name>` in
`frontend/src/data/content.js` (home page) or the matching JSON in `frontend/public/content/`. Keep file names free of
spaces. Do not leave images outside `public/`, or they will not be found after a build.

## Environment files

- `frontend/.env` holds a public preview URL only; no secrets.
- `backend/.env` is **not** included (it is git-ignored). Copy `backend/.env.example` to `backend/.env` if you run the backend.

## Backend (optional)

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate    # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload
```
