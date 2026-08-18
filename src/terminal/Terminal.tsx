import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { profile } from '../data/profile'
import {
  COMMAND_NAMES,
  PROJECT_SLUGS,
  runLine,
  type CommandContext,
} from './commands'
import { useTheme } from '../lib/theme'

type Line = { id: number; kind: 'input' | 'output'; content: ReactNode }

const PROMPT = 'lionel@portfolio ~ %'

/** Typed on load, so the screen is never an empty prompt. */
const BOOT = ['whoami']

/**
 * The command in the URL, if any: /#open sanjis-kitchen
 *
 * Without this there is no way to link anyone to a particular project —
 * every visitor lands on the same prompt and has to be told what to type.
 */
function commandFromUrl() {
  if (typeof window === 'undefined') return ''
  try {
    return decodeURIComponent(window.location.hash.replace(/^#/, '')).trim()
  } catch {
    return ''
  }
}

/** Offered under the prompt — nobody should have to guess a command. */
const SUGGESTIONS = ['help', 'ls', 'experience', 'skills', 'contact']

let nextId = 0

export function Terminal() {
  const { resolved, setTheme } = useTheme()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [booted, setBooted] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = useCallback((kind: Line['kind'], content: ReactNode) => {
    setLines((current) => [...current, { id: nextId++, kind, content }])
  }, [])

  const context: CommandContext = {
    clear: () => setLines([]),
    setTheme,
    currentTheme: resolved,
    prefill: (text) => {
      setInput(text)
      inputRef.current?.focus()
    },
  }

  const submit = useCallback(
    (raw: string) => {
      const line = raw.trim()
      push('input', line)
      if (!line) return

      setHistory((current) => [line, ...current])
      setHistoryIndex(-1)

      const { output, known } = runLine(line, context)
      if (output) push('output', output)

      // Keep the URL pointing at the last real command, so the address bar
      // is always something worth copying. replaceState, so this doesn't
      // fill the back button with every keystroke of a session.
      if (known && line !== 'clear') {
        try {
          window.history.replaceState(null, '', `#${encodeURIComponent(line)}`)
        } catch {
          /* history is unavailable in some embeds; the terminal still works */
        }
      }
    },
    // context is rebuilt each render but only reads current values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push, resolved],
  )

  // Boot: run whatever the URL asked for, or the opening command.
  useEffect(() => {
    const timer = setTimeout(() => {
      const requested = commandFromUrl()
      for (const line of requested ? [...BOOT, requested] : BOOT) submit(line)
      setBooted(true)
    }, 340)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the newest line in view.
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  /** Completes a command name, or a project slug after `open`. */
  const complete = () => {
    const parts = input.split(/\s+/)
    const editing = parts[parts.length - 1] ?? ''
    const pool = parts.length > 1 ? PROJECT_SLUGS : COMMAND_NAMES
    const matches = pool.filter((name) => name.startsWith(editing.toLowerCase()))

    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0]
      setInput(parts.join(' ') + ' ')
    } else if (matches.length > 1) {
      push('input', input)
      push(
        'output',
        <p className="muted">{matches.join('   ')}</p>,
      )
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(input)
      setInput('')
      return
    }
    if (e.key === 'Tab') {
      // Tab completes only when there is something to complete. With an
      // empty prompt it moves focus normally, so the terminal is never a
      // keyboard trap — WCAG 2.1.2. Shift+Tab always leaves.
      if (!input.trim() || e.shiftKey) return
      e.preventDefault()
      complete()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      if (next >= 0) {
        setHistoryIndex(next)
        setInput(history[next])
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIndex - 1
      setHistoryIndex(next)
      setInput(next >= 0 ? history[next] : '')
      return
    }
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
      return
    }
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      push('input', input + ' ^C')
      setInput('')
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <header className="term-bar">
        <span className="lights" aria-hidden="true">
          <span /> <span /> <span />
        </span>
        <span className="term-title">
          {profile.name.toLowerCase().replace(/\s+/g, '')} — {profile.role.toLowerCase()}
        </span>
        <button
          type="button"
          className="term-theme"
          onClick={(e) => {
            e.stopPropagation()
            setTheme(resolved === 'dark' ? 'light' : 'dark')
          }}
          aria-label={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} theme`}
        >
          {resolved === 'dark' ? 'light' : 'dark'}
        </button>
      </header>

      <div className="term-body" ref={scrollRef}>
        {/* The document had no h1 at all, so its first heading was the h2
            inside a project — nothing to navigate to by heading, and no
            top-level heading for a crawler. Visually hidden, because the
            banner below already says it on screen. */}
        <h1 className="sr-only">
          {profile.name} — {profile.role}, {profile.location}
        </h1>

        <p className="banner">
          {profile.name} — {profile.role}, {profile.location}.
          <br />
          <span className="muted">
            Type <code>help</code>, or press <kbd>Tab</kbd> to complete.
          </span>
        </p>

        {lines.map((line) =>
          line.kind === 'input' ? (
            <p className="line-in" key={line.id}>
              <span className="prompt">{PROMPT}</span> {line.content}
            </p>
          ) : (
            <div className="line-out" key={line.id}>
              {line.content}
            </div>
          ),
        )}

        {/* The live prompt */}
        <p className="line-in live">
          <label className="prompt" htmlFor="term-input">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
            autoFocus
          />
        </p>
      </div>

      <footer className="term-hints" hidden={!booted}>
        {SUGGESTIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              submit(name)
              setInput('')
              inputRef.current?.focus()
            }}
          >
            {name}
          </button>
        ))}
      </footer>
    </div>
  )
}
