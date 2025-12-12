# Portfolio – Nitin Bhatti (Gatsby.js)

A fast, responsive developer portfolio built with Gatsby.js and React to showcase projects, experience, skills, and contact information. This repo is adapted from a Gatsby starter and fully customized for Nitin Bhatti’s personal branding.

---

## 🚀 Live Demo

> ⏳ The Netlify deployment link will be added here after going live.  
> Example: `https://nitin-bhatti-portfolio.netlify.app`

---

## ✨ Features

- **Hero / Introduction** – concise summary of who Nitin is, current focus, and call-to-action buttons.
- **Responsive navigation** – desktop and mobile menus with smooth scrolling between sections.
- **Experience & Education** – timeline-style cards for roles, technologies, and impact.
- **Projects grid** – visually rich project cards with tech stack, descriptions, and links.
- **Skills overview** – grouped technical skills for quick scanning by recruiters.
- **Certificates / Achievements** – optional section to highlight certifications and awards.
- **Contact section** – links to email and social profiles for quick reach-out.
- **Performance-focused** – Gatsby static generation + image optimization + global CDN hosting.

---

## 🧱 Tech Stack

- **Framework:** Gatsby.js (React)
- **Language:** JavaScript (ESNext)
- **Styling:** CSS / Gatsby starter styles (custom components & layout tweaks)
- **Build Tooling:** Node.js, Yarn / npm
- **Linting & Formatting:** ESLint, Prettier
- **Deployment Target:** Netlify (static hosting + CI/CD)

> Recommended Node.js version: `v16.16.0` (based on `.nvmrc` in the project).

---

## 📁 Project Structure

```text
Portfolio---Nitin_Bhatti/
├─ content/        # Portfolio content: profile, projects, skills, experience, socials, etc.
├─ src/            # React components, pages, layout, and section logic
├─ static/         # Static assets served as-is (favicons, images that don’t go through Gatsby)
├─ gatsby-*.js     # Gatsby configuration (config, node, browser, ssr)
├─ .husky/         # Optional Git hooks
├─ .eslintrc       # ESLint config
├─ prettier.config.js
├─ .nvmrc          # Node version pin (v16.16.0)
└─ package.json    # Scripts and dependencies
```

Keep most portfolio data inside `content/` and assets inside `static/` so the UI stays reusable and easy to maintain.

---

## 🛠️ Getting Started (Local Development)

### 1️⃣ Clone the repo

```bash
git clone https://github.com/nitinbhatti1907/Portfolio---Nitin_Bhatti.git
cd Portfolio---Nitin_Bhatti
```

### 2️⃣ Install dependencies

If you use `nvm`:

```bash
nvm install
nvm use
```

Then install packages (pick one):

```bash
yarn
# or
npm install
```

### 3️⃣ Run the development server

```bash
npm start
# or
yarn start
```

By default the site runs at: `http://localhost:8000`.

### 4️⃣ Production build & preview

```bash
npm run build   # generates the production build into /public
npm run serve   # serves the built site for local preview
```

---

## ✏️ Customizing the Portfolio

Most content can be updated without touching the core React components:

- **Profile & Hero:** Update name, title, summary, and CTA text in the relevant files under `content/`.
- **Social Links:** Edit GitHub, LinkedIn, email, etc. in `content/` so they stay consistent across the site.
- **Projects:** Add or edit entries with title, description, tech stack, GitHub repo, and live demo links.
- **Experience / Education:** Modify timeline entries to reflect roles, dates, organizations, and key impact.
- **Skills:** Group skills by category (Frontend, Backend, Tools, Data, etc.) for better readability.
- **Certificates / Achievements:** Add new items as you earn them; these can be shown as cards or list items.

After changing content, restart the dev server if you don’t see updates immediately.

---

## ☁️ Deploying to Netlify

Once the repo is on GitHub, deploying to Netlify is straightforward:

1. Go to **Netlify → Add new site → Import an existing project**.
2. Choose **GitHub** and select `Portfolio---Nitin_Bhatti`.
3. Netlify should auto-detect **Gatsby**. If needed, use:
   - **Build command:** `npm run build`
   - **Publish directory:** `public`
4. (Optional) Set **Node version** to `16.16.0` under  
   *Site settings → Build & deploy → Environment → Environment variables* using `NODE_VERSION=16.16.0`.
5. Click **Deploy site**.
6. After the first deploy, customize your site name (e.g., `nitin-bhatti-portfolio`) under **Site settings → Change site name**.
7. Copy the Netlify URL and update the **Live Demo** section in this README.

---

## 🧪 Quality & Formatting

If scripts are configured in `package.json`, you can run:

```bash
npm run lint     # Lint the codebase with ESLint
npm run format   # Format code with Prettier
```

These help keep the codebase consistent and review-friendly for collaborators and recruiters.

---

## 🔮 Possible Enhancements (Roadmap)

- Add a **theme toggle** (light/dark mode).
- Introduce **project filters** by tech stack or category.
- Add a **blog** section powered by Markdown or MDX.
- Integrate **analytics** (e.g., Plausible, Google Analytics).
- Further **Lighthouse optimization** (image lazy-loading, font preloading, etc.).

---

## 📬 Contact

If you’re reviewing this portfolio as a recruiter or collaborator and want to connect:

- **Author:** Nitin Bhatti  
- **GitHub:** [@nitinbhatti1907](https://github.com/nitinbhatti1907)

Feel free to open an issue or reach out through the contact links on the live site.

---

## 📄 License

This project is currently intended for personal portfolio use.  
If you plan to reuse or open-source it, consider adding a standard license (e.g., MIT) to this repository.