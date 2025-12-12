# Meet Adalaja — Developer Portfolio (Gatsby.js)

A fast, polished portfolio site built with **Gatsby.js** to showcase projects, skills, and experience —
deployed to Vercel.

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmeetadalja-portfolio.vercel.app)](https://meetadalja-portfolio.vercel.app)
[![Last commit](https://img.shields.io/github/last-commit/MeetAdalaja/meetadalja-portfolio)](https://github.com/MeetAdalaja/meetadalja-portfolio/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/MeetAdalaja/meetadalja-portfolio)](https://github.com/MeetAdalaja/meetadalja-portfolio)
![Built with](https://img.shields.io/badge/built%20with-Gatsby-7026B9)
![Deployed on](https://img.shields.io/badge/deployed%20on-Vercel-000000)

---

## ✨ Live Demo

**https://meetadalja-portfolio.vercel.app**

---

## 📦 Tech Stack

- **Framework:** Gatsby.js (React)
- **Language:** JavaScript (ESNext)
- **Styles:** CSS / Gatsby starter styles (customizable)
- **Build/Deploy:** Vercel
- **Tooling:** Yarn / npm, ESLint, Prettier

> The repo includes an `.nvmrc` — recommended Node version: **v16.16.0 (LTS)**.

---

## 🗂️ Repository Structure

```text
meetadalja-portfolio/
├─ content/        # Portfolio data (sections, projects, skills, socials, etc.)
├─ src/            # Components, pages, and UI logic
├─ static/         # Static assets served as-is
├─ gatsby-*.js     # Gatsby configuration (config/node/ssr/browser)
├─ .husky/         # Git hooks (if enabled)
├─ .eslintrc       # ESLint config
├─ prettier.config.js
├─ .nvmrc          # Node version pin (v16.16.0)
└─ package.json
```

> Tip: keep text/images for content under `content/` and `static/` so the site stays configurable.

---

## ⚙️ Local Development

### 1) Clone & install

```bash
git clone https://github.com/MeetAdalaja/meetadalja-portfolio.git
cd meetadalja-portfolio
# optional but recommended (uses .nvmrc):
nvm install && nvm use
# install deps (choose one)
yarn         # or: npm install
```

### 2) Run the dev server

```bash
npm start    # or: yarn start
# default: http://localhost:8000
```

### 3) Production build & preview

```bash
npm run build    # generates /public
npm run serve    # serves the production build
```

---

## 🧩 Customizing Content

You can update most of the portfolio without touching components:

- **Profile & socials:** Edit entries in `content/` (e.g., name, title, links).
- **Skills:** Add or reorder skills in `content/` (grouped or as a flat list).
- **Projects:** Add each project with title, tech stack, description, repo/demo links, and images.
- **Experience / Education:** Add timeline entries with role, org, dates, and highlights.

> After editing `content/`, restart the dev server to ensure changes are reflected.

---

## 🧪 Quality & Formatting

- **Lint:** `npm run lint` (if script present)
- **Format:** `npm run format` (if script present)

> ESLint and Prettier configs are included; wire scripts as desired in `package.json`.

---

## ☁️ Deploy to Vercel

A Vercel project is already connected. For a fresh deployment:

1. **New Project → Import GitHub repo**
2. **Framework Preset:** Gatsby
3. **Build Command:** `npm run build` (or `gatsby build`)
4. **Output Directory:** `public`
5. **Node Version:** respect `.nvmrc` (16.16.0) or set in Vercel’s Project → Settings → Node.js
6. Deploy — your site will be on **https://meetadalja-portfolio.vercel.app**

> For custom domains, add them under **Vercel → Project → Domains** and redeploy.

---

---

## 🧭 Roadmap (Nice-to-have)

- [ ] Add a **Projects** filter by tech/tag
- [ ] Light/Dark **theme toggle**
- [ ] **Blog** section with Markdown posts
- [ ] Add **analytics** (e.g., Plausible or Google Analytics via plugin)
- [ ] Lighthouse pass (preload fonts, optimize images, lazy-load heavier assets)

---

## 📄 License

If you intend to open-source this portfolio, add a license file (e.g., MIT).
Otherwise, you can leave it unlicensed for personal use.

---

## 🙏 Acknowledgements

- Gatsby.js community & plugin authors
- Open-source tool maintainers that power the web
