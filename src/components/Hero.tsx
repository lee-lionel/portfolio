import { facts, profile, socials } from '../data/profile'
import { isReal } from '../lib/placeholder'

export function Hero() {
  const rows = facts.filter((f) => isReal(f.value))

  return (
    <header id="top" className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      {profile.availability && (
        <p className="rise rec mb-8 flex items-center gap-2.5">
          {/* A live dot, because "recently started" is a fact with a clock on
              it. It pulses only where motion is welcome. */}
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-tooling opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tooling" />
          </span>
          {profile.availability}
        </p>
      )}

      {/* Not a `.rise` — it is visually hidden by design, so animating its
          opacity only leaves it stuck at zero. */}
      <h1 className="sr-only">
        {profile.name} — {profile.role}, {profile.location}
      </h1>

      {/* The visible display of the same thing. Split across two lines so the
          name and the job it is applying for both land at full size. */}
      <p
        aria-hidden="true"
        className="rise text-5xl leading-[1.05] tracking-[-0.02em] sm:text-7xl"
        style={{ ['--rise-delay' as string]: '60ms' }}
      >
        {profile.name}
      </p>
      <p
        aria-hidden="true"
        className="rise mt-2 text-5xl leading-[1.05] tracking-[-0.02em] text-muted sm:text-7xl"
        style={{ ['--rise-delay' as string]: '120ms' }}
      >
        {profile.role}
      </p>

      {/* The thesis is the strongest sentence on the page, so it gets the
          largest body setting rather than being buried in About. */}
      <p
        className="rise mt-10 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl"
        style={{ ['--rise-delay' as string]: '180ms' }}
      >
        {profile.thesis}
      </p>

      <div
        className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        style={{ ['--rise-delay' as string]: '240ms' }}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="lnk font-mono text-sm"
            {...(s.href.startsWith('http')
              ? { target: '_blank', rel: 'noreferrer noopener' }
              : {})}
          >
            {s.handle}
          </a>
        ))}
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} className="lnk font-mono text-sm">
            Résumé (PDF)
          </a>
        )}
      </div>

      {rows.length > 0 && (
        <dl
          className="rise mt-16 grid gap-x-8 gap-y-4 border-t border-rule pt-8 sm:grid-cols-2"
          style={{ ['--rise-delay' as string]: '300ms' }}
        >
          {rows.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dt className="rec">{f.label}</dt>
              <dd className="m-0 font-mono text-sm text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  )
}
