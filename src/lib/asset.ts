/**
 * Resolves a path in /public against the site's base.
 *
 * Vite rewrites asset URLs it can see — imports, and url() in CSS — but the
 * screenshot paths in profile.ts are plain strings, so it cannot. On GitHub
 * Pages the site lives at /portfolio/, and those strings resolved against
 * the domain root instead: every project screenshot 404'd while the page
 * itself loaded fine, which is the sort of break that only shows up once it
 * is deployed.
 */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
