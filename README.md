# Portfolio — Lee Lionel

Personal portfolio and résumé site. Vite + React + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the build locally
```

## Where the content lives

**Everything is in [`src/data/profile.ts`](src/data/profile.ts).** Edit that one
file and every section updates — no component changes needed. Anything still
marked `TODO` is a placeholder waiting on the résumé.

| Export       | Feeds                                              |
| ------------ | -------------------------------------------------- |
| `profile`    | Name, role, hero thesis, location, email, PDF link  |
| `socials`    | Hero links + the Contact list                       |
| `about`      | About paragraphs                                    |
| `experience` | Experience timeline (`end: null` renders "Present") |
| `projects`   | Work section                                        |
| `skills`     | Skills groups                                       |
| `education`  | Education entries                                   |
| `sections`   | Nav order + left-rail labels                        |

To add the résumé PDF: copy `docs/Lionel_Resume_2025.pdf` into `public/`, then set
`profile.resumeUrl = '/Lionel_Resume_2025.pdf'` — the download button appears on
its own.

## Still to fill in

Content is populated from `docs/Lionel_Resume_2025.pdf`. Four things the résumé
predates or doesn't cover, all marked `TODO` in `profile.ts`:

1. **Current SWE role** — `experience[0]`: company, title, start month, and what
   you actually work on.
2. **Mobot end date** — the résumé still says "Present"; currently stubbed `2026`.
3. **Rent Haven** — no live URL or repo on the résumé, so no screenshot either.
   Add `live`, `repo`, and an `image` in `public/shots/` to replace the
   typographic fallback card.
4. **Name order** — rendering as "Lee Lionel" to match the résumé header. One
   string in `profile.name` if you'd rather lead with the given name.

Your phone number is in `profile.phone` but deliberately not rendered — a number
on a public page collects spam. It's in the PDF for anyone who needs it.

## Design system

A "specimen sheet" layout: a sticky mono label rail on the left, content on the
right, hairline rules between sections.

- **Type** — Fraunces Variable (display, `SOFT 40 / WONK 0`), IBM Plex Sans
  (body), IBM Plex Mono (labels, dates, metadata). Self-hosted via Fontsource,
  so there are no external font requests.
- **Color** — warm stone paper, green-biased neutrals, one deep pine-teal
  accent. Every color is a `--c-*` token in `src/index.css`, exposed to Tailwind
  through `@theme inline`. **Components never hardcode a color** — that's what
  keeps both themes complete.

### Motion

Apple's motion language without the scroll-jacking. Nothing pins the viewport
or intercepts scrolling — a reader can always get to the bottom at their own
pace, which matters when the reader is a recruiter scanning for 30 seconds.

- Nav condenses from `h-20` to `h-14` past 40px and picks up a blur.
- Sections and list items fade and lift in on entry, staggered 70ms apart.
- The hero name tracks and focuses in once, on load.
- A scroll-progress hairline under the nav, via CSS `animation-timeline: scroll()`.
- Work is a horizontal snap rail with arrow controls.
- `.band-invert` flips the Work section's palette against the page — a dark band
  on the light theme, a light band on the dark one.

**The reveals are fail-safe.** `.reveal` only hides content under `.js`, a class
the inline script in `index.html` adds before first paint. So crawlers, print,
full-page screenshots, and anyone whose JS failed get the complete page —
hiding is the enhancement, not the baseline. `prefers-reduced-motion` disables
all of it.

### Screenshots

`public/shots/` holds the project screenshots, captured from the live
deployments at 16:10 to match the card's aspect box exactly (no cropping).
A project without an `image` falls back to a typographic card, so nothing
breaks — that's what Rent Haven currently shows.

Tutors Connect is login-gated, so its shot is the sign-in screen. If you want
the app itself in the card, log in and screenshot a real dashboard at
880 × 550 — it'll be a much stronger card than a login form.

### Theming

Three states, not two: `light`, `dark`, and `system`.

- `system` stamps nothing on `<html>`, so `prefers-color-scheme` decides.
- An explicit choice stamps `data-theme` and wins over the OS in both directions.
- The choice persists in `localStorage`; a small inline script in `index.html`
  applies it before first paint so there's no flash.

There are no `dark:` variants anywhere — utilities compile straight to
`var(--c-*)`, which flips at runtime.

## Deploying

**Vercel / Netlify** — connect the repo. Build `npm run build`, output `dist`.

**GitHub Pages** — if it's a project site (`lee-lionel.github.io/portfolio`),
set `base: '/portfolio/'` in `vite.config.ts` first. A user site
(`lee-lionel.github.io`) or a custom domain keeps `base: '/'`.

## Note on Node

Pinned to Vite 7 because Node 22.2 is below Vite 8's required `>=22.12`.
After upgrading Node, `npm install -D vite@latest @vitejs/plugin-react@latest`
will move it forward.
