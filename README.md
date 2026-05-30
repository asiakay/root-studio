# Root Studio Collective — Landing Page

React + TypeScript + Vite, configured for Cloudflare Pages deployment.

## Local dev

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

### Option A — CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name=root-studio
```

### Option B — Git integration
1. Push repo to GitHub
2. Cloudflare Dashboard → Pages → Create a project
3. Connect repo, set build command: `npm run build`, output dir: `dist`

## Customization checklist

- [ ] Update `INQUIRY_EMAIL` in `src/data/content.ts`
- [ ] Adjust pricing in `src/data/content.ts`
- [ ] Swap CTA from `mailto:` to your booking/form URL
- [ ] Update `<title>` and meta tags in `index.html`

## Project structure

```
src/
  components/
    Hero.tsx
    Services.tsx
    ServiceCard.tsx
    HowItWorks.tsx
    WhyUs.tsx
    CTA.tsx
  data/
    content.ts      ← edit copy and pricing here
  types/
    index.ts
  App.tsx
  App.css           ← all styles, dark mode included
```
