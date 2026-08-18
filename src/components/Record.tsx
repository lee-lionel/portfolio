import { about, education, experience, skills } from '../data/profile'
import { chipClass } from '../lib/tech'
import { isReal, realOnly } from '../lib/placeholder'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" label="About" title="How I got here">
      <div className="flex max-w-2xl flex-col gap-6">
        {about.map((para, n) => (
          <p
            key={para.slice(0, 24)}
            className="rise text-lg leading-relaxed text-muted"
            style={{ ['--rise-delay' as string]: `${n * 80}ms` }}
          >
            {para}
          </p>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  /* A row whose company or points are still placeholders would render as an
     empty shell with a date on it, which reads worse than not being there. */
  const roles = experience
    .map((r) => ({ ...r, points: realOnly(r.points), stack: realOnly(r.stack) }))
    .filter((r) => isReal(r.company) && r.points.length > 0)

  return (
    <Section id="experience" label="Experience" title="Where I have worked">
      <ol className="flex flex-col gap-14 pl-0">
        {roles.map((role, n) => (
          <li
            key={`${role.company}-${role.start}`}
            className="rise grid gap-x-10 gap-y-3 sm:grid-cols-[9rem_1fr]"
            style={{ ['--rise-delay' as string]: `${n * 60}ms` }}
          >
            {/* Dates in tabular figures in their own column, so the whole
                history reads down the left edge like a ledger. */}
            <p className="num pt-1 text-xs text-faint">
              {role.start} — {role.end ?? 'Present'}
            </p>

            <div>
              <h3 className="text-xl">{role.title}</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                {role.company}
                {role.location && (
                  <span className="text-faint"> · {role.location}</span>
                )}
              </p>

              <ul className="mt-4 flex flex-col gap-2 pl-0">
                {role.points.map((p) => (
                  <li key={p} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="text-faint">
                      —
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              {role.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5 pl-0">
                  {role.stack.map((t) => (
                    <li key={t} className={chipClass(t)}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Skills() {
  return (
    <Section id="skills" label="Skills" title="What I work with">
      <div className="grid gap-10 sm:grid-cols-2">
        {skills.map((group, n) => (
          <div
            key={group.group}
            className="rise"
            style={{ ['--rise-delay' as string]: `${n * 60}ms` }}
          >
            <p className="rec mb-4">{group.group}</p>
            <ul className="flex flex-wrap gap-1.5 pl-0">
              {realOnly(group.items).map((item) => (
                <li key={item} className={chipClass(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The chips are coloured by category, which is only useful if the
          reader is told what the categories are. */}
      <p className="rise mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-6 text-xs">
        <span className="rec">Coloured by</span>
        <span className="chip chip-language">Language</span>
        <span className="chip chip-framework">Framework</span>
        <span className="chip chip-data">Data</span>
        <span className="chip chip-tooling">Tooling</span>
      </p>
    </Section>
  )
}

export function Education() {
  return (
    <Section id="education" label="Education" title="Where I trained">
      <ol className="flex flex-col gap-8 pl-0">
        {education.map((e, n) => (
          <li
            key={e.school}
            className="rise grid gap-x-10 gap-y-2 border-b border-rule pb-8 last:border-0 sm:grid-cols-[9rem_1fr]"
            style={{ ['--rise-delay' as string]: `${n * 60}ms` }}
          >
            <p className="num pt-1 text-xs text-faint">
              {e.start} — {e.end}
            </p>
            <div>
              <h3 className="text-lg">{e.credential}</h3>
              <p className="mt-1 font-mono text-sm text-muted">{e.school}</p>
              {e.note && <p className="mt-2 text-sm text-faint">{e.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
