import { useCallback, useMemo, useState } from 'react'
import { sections, profile } from '../data/profile'
import { useActiveSection } from '../lib/reveal'
import { useTheme } from '../lib/theme'

const LABEL: Record<string, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

function ThemeButton() {
  const { theme, resolved, cycle } = useTheme()
  return (
    <button
      type="button"
      onClick={cycle}
      /* The button names which of the three states is selected; the resolved
         value is what the reader is actually looking at, and only differs
         from the label when the state is 'system'. */
      aria-label={`Theme: ${LABEL[theme]}${theme === 'system' ? ` (currently ${resolved})` : ''}. Change theme.`}
      className="rec -ml-2 flex items-center gap-2 rounded-sm px-2 py-1.5 transition-colors hover:text-ink"
    >
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full border border-current"
        style={{ background: resolved === 'dark' ? 'transparent' : 'currentColor' }}
      />
      {LABEL[theme]}
    </button>
  )
}

/**
 * The index, for wide screens. Sticky rather than fixed so it sits inside
 * the same centred group as the content — a fixed rail pins to the viewport
 * edge and leaves a widening gutter as the monitor grows.
 */
export function Rail() {
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const [active, setActive] = useState<string>(ids[0])
  const onChange = useCallback((id: string) => setActive(id), [])
  useActiveSection(ids, onChange)

  return (
    <div className="sticky top-0 hidden h-svh w-40 shrink-0 flex-col justify-between py-10 lg:flex xl:w-48">
      <a href="#top" className="rec text-ink! no-underline">
        {profile.name}
      </a>

      <nav aria-label="Sections">
        <ul className="flex flex-col gap-0.5">
          {sections.map((s) => {
            const on = active === s.id
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'true' : undefined}
                  className="rec flex items-center gap-3 py-1 transition-colors hover:text-ink"
                  style={on ? { color: 'var(--c-ink)' } : undefined}
                >
                  {/* The marker is the index: a rule that lengthens and inks
                      when its section is the one being read. */}
                  <span
                    aria-hidden="true"
                    className="h-px transition-all duration-300"
                    style={{
                      width: on ? '1.75rem' : '0.75rem',
                      background: on ? 'var(--c-ink)' : 'var(--c-rule)',
                    }}
                  />
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <ThemeButton />
    </div>
  )
}

/**
 * Narrow screens get the name and the theme control only — a vertical index
 * would cost more room than the content it indexes.
 */
export function TopBar() {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-rule bg-paper/85 px-5 py-3 backdrop-blur-md lg:hidden">
      <a href="#top" className="rec text-ink! no-underline">
        {profile.name}
      </a>
      <ThemeButton />
    </div>
  )
}
