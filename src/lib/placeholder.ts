/**
 * profile.ts carries deliberate TODO markers where the résumé ran out —
 * the current employer, a repo that was never pushed. They are notes to the
 * author, not content, so nothing that still says TODO is ever rendered.
 *
 * Filtering here rather than editing the data keeps the markers where they
 * are useful: visible in the file that needs filling in.
 */
export function isReal(value?: string | null): value is string {
  return !!value && !value.trim().startsWith('TODO')
}

/** Drops any placeholder entries from a list, and reports whether any survive. */
export function realOnly(values?: readonly string[]): string[] {
  return (values ?? []).filter(isReal)
}
