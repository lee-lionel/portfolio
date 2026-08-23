import { createContext, useContext } from 'react'

/**
 * Three states, not two.
 *  - 'system' stamps nothing on <html>, so prefers-color-scheme decides.
 *  - 'light' / 'dark' stamp data-theme and beat the OS in both directions.
 */
export type Theme = 'light' | 'dark' | 'system'

export type ThemeContextValue = {
  theme: Theme
  /** What the viewer is actually seeing right now. */
  resolved: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  /** Cycles light -> dark -> system. */
  cycle: () => void
}

/* Kept apart from the provider component: a file that exports both a
   component and a hook trips react(only-export-components), because fast
   refresh cannot tell which of them to remount. */
export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside a ThemeProvider')
  return value
}
