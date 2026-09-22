# Maaf Fashion — Frontend (Next.js)

Corporate marketing site for Maaf Fashion, consuming the Django REST API in
`../backend`. Built with Next.js App Router, Tailwind CSS, and Bootstrap's
grid utilities.

## Stack

- Next.js 16 (App Router, React 19)
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Bootstrap grid utilities (layout scaffolding only)
- Self-hosted fonts via `@fontsource` (Fraunces / Inter / IBM Plex Mono) —
  no runtime dependency on fonts.googleapis.com
- `yet-another-react-lightbox` for the Gallery page
- Axios for API calls, with automatic fallback to bundled mock data
  (`src/lib/mockData.js`) if the backend is unreachable, so every page
  always renders

## Local setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # points at http://localhost:8000/api by default
npm run dev
```

Site is live at `http://localhost:3000`. Start the Django backend first
(see `../backend/README.md`) for real data — otherwise pages render with
bundled sample content automatically.

## Pages

| Route          | Purpose                                              |
|-----------------|-------------------------------------------------------|
| `/`             | Home — hero, stats, certifications, about snapshot   |
| `/about`        | Company story, credentials, QC process, welfare      |
| `/products`     | Filterable product catalogue                         |
| `/capacity`     | Departmental manufacturing capacity                   |
| `/compliance`   | Certifications grid + fire safety & welfare policy    |
| `/gallery`      | Filterable media grid with lightbox                   |
| `/contact`      | Addresses, map, and inquiry form → `POST /api/inquiries/` |
| `/privacy`, `/terms` | Legal boilerplate                                |

## Design system

- **Palette**: deep navy (`--navy-950/900/800`) + charcoal base with a
  muted gold accent (`--gold-500/400`), on a cool off-white paper
  background — evokes industrial trust rather than a generic warm/cream
  template.
- **Type**: Fraunces (display), Inter (body), IBM Plex Mono (SKU codes,
  stats, capacity figures — a nod to spec-sheet precision).
- **Signature element**: a stitched-thread SVG divider (`StitchDivider`)
  used between sections, referencing knitwear seams.

## Connecting to the backend

Set `NEXT_PUBLIC_API_URL` in `.env.local` (or your hosting provider's
environment variables) to the deployed Django API root, e.g.
`https://api.maaffashion.com/api`.

## Deploying to Namecheap cPanel

1. In cPanel, create a Node.js App (**Setup Node.js App**) pointed at this
   `frontend/` directory, running on `maaffashion.com`.
2. Set the environment variable `NEXT_PUBLIC_API_URL=https://api.maaffashion.com/api`.
3. `npm install && npm run build`
4. Set the app's startup file / command to run `npm run start` (Next.js
   will run behind cPanel's Node.js App Manager / Passenger).
5. Restart the Node.js app from cPanel.
