import { useState } from 'react'
import { projects, type Project } from '../data/profile'
import { chipClass } from '../lib/tech'
import { isReal, realOnly } from '../lib/placeholder'
import { Section } from './Section'

/** Every screenshot a project has, poster first, deduped. */
function shotsOf(p: Project) {
  const list = p.shots?.length
    ? p.shots
    : p.image
      ? [{ src: p.image, alt: p.imageAlt ?? `A screenshot of ${p.name}.` }]
      : []
  const gallery = p.gallery ?? []
  const all = [...list, ...gallery]
  const seen = new Set<string>()
  return all.filter((s) => (seen.has(s.src) ? false : (seen.add(s.src), true)))
}

/**
 * The screenshot plate. Real screens are the only evidence on a portfolio
 * that the thing was actually built, so they are shown at size rather than
 * as thumbnails, and the reader can page through the app's real states.
 */
function Plate({ project, lead }: { project: Project; lead: boolean }) {
  const shots = shotsOf(project)
  const [i, setI] = useState(0)
  if (!shots.length) return null
  const shot = shots[Math.min(i, shots.length - 1)]

  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-lg border border-rule bg-sunken"
        style={{ boxShadow: 'var(--shadow-plate)' }}
      >
        {project.domain && (
          /* A browser chrome hint, so a screenshot reads as a running site
             rather than a picture. Decorative — the address is repeated as a
             real link below. */
          <div
            aria-hidden="true"
            className="flex items-center gap-2 border-b border-rule px-3 py-2"
          >
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rule" />
              <span className="h-2 w-2 rounded-full bg-rule" />
              <span className="h-2 w-2 rounded-full bg-rule" />
            </span>
            <span className="truncate font-mono text-[0.65rem] text-faint">
              {project.domain}
            </span>
          </div>
        )}
        <img
          src={shot.src}
          alt={shot.alt}
          loading={lead ? 'eager' : 'lazy'}
          decoding="async"
          className="block w-full object-cover object-top transition-opacity duration-300"
          style={{ aspectRatio: lead ? '16 / 10' : '16 / 10' }}
        />
      </div>

      {shots.length > 1 && (
        <figcaption className="mt-3 flex flex-wrap items-center gap-2">
          <span className="sr-only">Screens of {project.name}</span>
          {shots.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setI(n)}
              aria-pressed={n === i}
              aria-label={s.alt}
              className="h-1 w-8 rounded-full transition-colors"
              style={{
                background: n === i ? 'var(--c-ink)' : 'var(--c-rule)',
              }}
            />
          ))}
          <span className="num ml-1 text-[0.65rem] text-faint">
            {Math.min(i, shots.length - 1) + 1}/{shots.length}
          </span>
        </figcaption>
      )}
    </figure>
  )
}

function Meta({ project }: { project: Project }) {
  const stack = realOnly(project.stack)
  const features = realOnly(project.features)

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4">
        <h3 className="text-2xl sm:text-3xl">{project.name}</h3>
        <span className="num text-sm text-faint">{project.year}</span>
      </div>

      <p className="mt-4 max-w-xl text-muted">{project.blurb}</p>

      {features.length > 0 && (
        <ul className="mt-5 flex flex-col gap-1.5 pl-0">
          {features.map((f) => (
            <li key={f} className="flex gap-3 text-sm text-muted">
              <span aria-hidden="true" className="text-faint">
                —
              </span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {stack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5 pl-0">
          {stack.map((t) => (
            <li key={t} className={chipClass(t)}>
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        {isReal(project.live) && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer noopener"
            className="lnk font-mono text-sm"
          >
            Visit site
          </a>
        )}
        {isReal(project.repo) && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="lnk font-mono text-sm"
          >
            Source
          </a>
        )}
        {/* The honest caveat, said plainly rather than hidden. A private repo
            is a fact about the work, not something to apologise for. */}
        {project.note && (
          <span className="font-mono text-sm text-faint">{project.note}</span>
        )}
      </div>
    </div>
  )
}

export function Work() {
  const lead = projects.find((p) => p.lead)
  const rest = projects.filter((p) => p !== lead)

  return (
    <Section id="work" label="Selected work" title="Things I have built">
      {lead && (
        <article className="rise mb-24 sm:mb-32">
          <Plate project={lead} lead />
          <div className="mt-8">
            <Meta project={lead} />
          </div>
        </article>
      )}

      <div className="flex flex-col gap-24 sm:gap-28">
        {rest.map((p, n) => {
          const hasShot = shotsOf(p).length > 0
          return (
            <article
              key={p.name}
              className="rise grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
              style={{ ['--rise-delay' as string]: `${n * 60}ms` }}
            >
              {/* Alternating sides give the column a rhythm without the
                  reader having to hunt for where the next one starts. */}
              {hasShot && (
                <div className={n % 2 === 1 ? 'lg:order-2' : undefined}>
                  <Plate project={p} lead={false} />
                </div>
              )}
              <div className={!hasShot ? 'lg:col-span-2' : undefined}>
                <Meta project={p} />
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
