import type { ReactNode } from 'react'
import {
  about,
  education,
  experience,
  facts,
  profile,
  projects,
  skills,
  socials,
} from '../data/profile'
import { techKind } from '../lib/tech'

/** A short, typeable name for each project. */
export function slugOf(name: string) {
  return name
    .toLowerCase()
    // Drop apostrophes rather than turning them into separators, so
    // "Sanji's Kitchen" is sanjis-kitchen and not sanji-s-kitchen.
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Content still waiting on the résumé is marked TODO in profile.ts. It must
 * never reach the screen — the current role is the first thing `experience`
 * prints, and "TODO — current employer" on a live portfolio is worse than
 * saying nothing.
 */
const isPlaceholder = (value?: string) => !value || value.trim().startsWith('TODO')

const realOnly = (values?: string[]) => (values ?? []).filter((v) => !isPlaceholder(v))

export type CommandContext = {
  clear: () => void
  setTheme: (theme: 'dark' | 'light') => void
  currentTheme: 'dark' | 'light'
  /** Puts text in the prompt without running it, for the clickable hints. */
  prefill: (text: string) => void
}

export type Command = {
  name: string
  summary: string
  usage?: string
  hidden?: boolean
  run: (args: string[], ctx: CommandContext) => ReactNode | void
}

/* ---------------------------------------------------------------------------
   Output building blocks. Terminal output, but rendered — a screenshot beats
   ASCII art, and a recruiter should not have to parse a box-drawing table.
--------------------------------------------------------------------------- */

function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="rows">
      {rows.map(([label, value]) => (
        <div className="row" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item} className={`chip chip-${techKind(item)}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
      {children}
    </a>
  )
}

function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((p) => slugOf(p.name) === slug)
  if (!project) {
    return (
      <p className="err">
        no such project: {slug} — try <code>ls</code>
      </p>
    )
  }

  const shots = project.shots ?? (project.image ? [{ src: project.image, alt: '' }] : [])

  return (
    <div className="detail">
      <div className="detail-head">
        <h2>{project.name}</h2>
        <span className="year">{project.year}</span>
      </div>

      {shots.length ? (
        <div className="shots">
          {shots.slice(0, 3).map((shot) => (
            <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />
          ))}
        </div>
      ) : null}

      <p className="blurb">{project.blurb}</p>

      {project.features?.length ? (
        <ul className="features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ) : null}

      <Chips items={project.stack} />

      <p className="links">
        {project.live ? <Link href={project.live}>open live ↗</Link> : null}
        {project.repo ? <Link href={project.repo}>source ↗</Link> : null}
        {project.note ? <span className="muted">{project.note}</span> : null}
      </p>
    </div>
  )
}

/* --------------------------------------------------------------------------- */

export const COMMANDS: Command[] = [
  {
    name: 'help',
    summary: 'what you can type',
    run: () => (
      <Rows
        rows={COMMANDS.filter((c) => !c.hidden).map((c) => [
          c.usage ?? c.name,
          c.summary,
        ])}
      />
    ),
  },
  {
    name: 'whoami',
    summary: 'the short version',
    run: () => (
      <div className="stack">
        <p className="lede">
          {profile.name} — {profile.role} in {profile.location}.
        </p>
        <p>{profile.thesis}</p>
        <Rows rows={facts.map((f) => [f.label.toLowerCase(), f.value])} />
      </div>
    ),
  },
  {
    name: 'about',
    summary: 'the longer version',
    run: () => (
      <div className="stack">
        {about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    ),
  },
  {
    name: 'ls',
    summary: 'list the projects',
    usage: 'ls',
    run: () => (
      <ul className="listing">
        {projects.map((project) => (
          <li key={project.name}>
            <span className="slug">{slugOf(project.name)}</span>
            <span className="muted">{project.year}</span>
            <span className="dash">—</span>
            <span>{project.name}</span>
            {project.lead ? <span className="tag">lead</span> : null}
          </li>
        ))}
        <li className="hint-line">
          <span className="muted">
            open one with <code>open &lt;name&gt;</code>
          </span>
        </li>
      </ul>
    ),
  },
  {
    name: 'open',
    summary: 'look at one project',
    usage: 'open <project>',
    run: (args) => {
      if (!args[0]) {
        return (
          <p className="err">
            which one? try <code>ls</code>
          </p>
        )
      }
      return <ProjectDetail slug={args[0].toLowerCase()} />
    },
  },
  {
    name: 'experience',
    summary: 'where I have worked',
    run: () => (
      <ol className="roles">
        {experience.map((role) => {
          const points = realOnly(role.points)
          const stack = realOnly(role.stack)
          const company = isPlaceholder(role.company) ? null : role.company

          return (
            <li key={`${role.company}-${role.start}`}>
              <p className="role-head">
                <span className="when">
                  {role.start} – {role.end ?? 'present'}
                </span>
                <span className="role-title">{role.title}</span>
                {company ? <span className="muted">{company}</span> : null}
                {role.location ? <span className="muted">{role.location}</span> : null}
                {role.end === null ? <span className="tag">current</span> : null}
              </p>

              {points.length ? (
                <ul className="points">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="points muted">Details to follow.</p>
              )}

              {stack.length ? <Chips items={stack} /> : null}
            </li>
          )
        })}
      </ol>
    ),
  },
  {
    name: 'skills',
    summary: 'what I work in',
    run: () => (
      <Rows
        rows={skills.map(({ group, items }) => [
          group.toLowerCase(),
          <Chips key={group} items={items} />,
        ])}
      />
    ),
  },
  {
    name: 'education',
    summary: 'where I trained',
    run: () => (
      <Rows
        rows={education.map((entry) => [
          `${entry.start} – ${entry.end}`,
          <span key={entry.school}>
            <strong>{entry.school}</strong> — {entry.credential}
          </span>,
        ])}
      />
    ),
  },
  {
    name: 'contact',
    summary: 'how to reach me',
    run: () => (
      <Rows
        rows={socials.map((social) => [
          social.label.toLowerCase(),
          <Link key={social.label} href={social.href}>
            {social.handle}
          </Link>,
        ])}
      />
    ),
  },
  {
    name: 'resume',
    summary: 'the PDF',
    run: () =>
      profile.resumeUrl ? (
        <p>
          <Link href={profile.resumeUrl}>download résumé ↗</Link>
        </p>
      ) : (
        <p className="muted">
          Not published yet — <code>contact</code> works in the meantime.
        </p>
      ),
  },
  {
    name: 'theme',
    summary: 'dark or light',
    usage: 'theme [dark|light]',
    run: (args, ctx) => {
      const next =
        args[0] === 'dark' || args[0] === 'light'
          ? args[0]
          : ctx.currentTheme === 'dark'
            ? 'light'
            : 'dark'
      ctx.setTheme(next)
      return <p className="muted">theme → {next}</p>
    },
  },
  {
    name: 'clear',
    summary: 'empty the screen',
    run: (_args, ctx) => {
      ctx.clear()
    },
  },
  {
    name: 'sudo',
    summary: '',
    hidden: true,
    run: () => <p className="err">lionel is not in the sudoers file. This incident will be reported.</p>,
  },
  {
    name: 'rm',
    summary: '',
    hidden: true,
    run: () => <p className="err">nice try.</p>,
  },
  {
    name: 'exit',
    summary: '',
    hidden: true,
    run: () => (
      <p className="muted">
        There is no exit. There is only <code>contact</code>.
      </p>
    ),
  },
]

export const COMMAND_NAMES = COMMANDS.map((c) => c.name)
export const PROJECT_SLUGS = projects.map((p) => slugOf(p.name))

/** Runs a line, returning what to print. */
export function runLine(
  line: string,
  ctx: CommandContext,
): { output: ReactNode | void; known: boolean } {
  const [name, ...args] = line.trim().split(/\s+/)
  const command = COMMANDS.find((c) => c.name === name.toLowerCase())

  if (!command) {
    return {
      known: false,
      output: (
        <p className="err">
          command not found: {name} — try <code>help</code>
        </p>
      ),
    }
  }
  return { known: true, output: command.run(args, ctx) }
}
