# Shatayu Mehta — Robotics Engineer Portfolio

Personal portfolio website for Shatayu Mehta, MS Robotics student at the University of Minnesota Twin Cities. Showcases mechanical design, autonomous systems, and machine learning projects.

## Tech Stack

- **React 19 + TypeScript** via Vite
- **Three.js / React Three Fiber** — interactive 3D model viewers (STL, OBJ, GLB)
- **Framer Motion v12** — scroll-triggered reveal animations
- **Web3Forms** — static-site contact form (no backend needed)
- **GitHub Actions + GitHub Pages** — CI/CD deployment

## Sections

| Section | Description |
|---|---|
| Hero | Animated intro with name and role |
| About | Background, education, what I'm looking for |
| Showcase | Live 3D viewers — FUJIN VTOL drone (STL) + Wearable Ring Mouse (OBJ) |
| Projects | Featured built work + additional projects |
| Skills | CAD, ML/Vision, Manufacturing, Control, Drone/UAV, Hardware, Code |
| Contact | Engineering drawing-style contact form |

## Local Development

```bash
npm install
npm run dev
# opens at http://localhost:5173
```

## Build & Deploy

```bash
npm run build   # outputs to ./dist
```

Deployment is automated via `.github/workflows/deploy.yml` — push to `main` and GitHub Actions publishes the `dist/` folder to GitHub Pages.

## Adding Content

- **New project**: add an entry to `src/data/projects.json`
- **New 3D model**: drop the file in `public/`, add to `src/data/designs.json`, add its `id` to `SHOWCASE_IDS` in `src/components/sections/Showcase/Showcase.tsx`
- **VGGT YouTube link**: set `"video": "YOUR_VIDEO_ID"` for id 8 in `src/data/projects.json`
- **Google Analytics**: replace `G-XXXXXXXXXX` in `index.html` with your GA4 Measurement ID

## Contact

[shatayumehta.2000@gmail.com](mailto:shatayumehta.2000@gmail.com) | [LinkedIn](https://www.linkedin.com/in/shatayumehta) | [GitHub](https://github.com/shatayu-mehta)
