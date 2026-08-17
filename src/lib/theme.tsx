import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Three states, not two.
 *  - 'system' stamps nothing on <html>, so prefers-color-scheme decides.
 *  - 'light' / 'dark' stamp data-theme and beat the OS in both directions.
 */
export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'portfolio-theme'

function read(): Theme {
  if (typeof localStorage === 'undefined') return 'system'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'system'
}

function apply(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
}

type ThemeContextValue = {
  theme: Theme
  /** What the viewer is actually seeing right now. */
  resolved: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  /** Cycles light → dark → system. */
  cycle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(read)
  const [systemDark, setSystemDark] = useState(
    () =>
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    apply(next)
    if (next === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, next)
  }, [])

  // Keep <html> in sync if state was restored without going through setTheme.
  useEffect(() => {
    apply(theme)
  }, [theme])

  const resolved: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  // Lets the browser render form controls and scrollbars in the right theme.
  useEffect(() => {
    document.documentElement.style.colorScheme = resolved
  }, [resolved])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolved,
      setTheme,
      cycle: () =>
        setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'),
    }),
    [theme, resolved, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
