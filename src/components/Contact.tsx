import { profile, socials } from '../data/profile'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id="contact" label="Contact" title="Get in touch">
      <div className="max-w-2xl">
        <p className="rise text-xl leading-relaxed text-muted sm:text-2xl">
          I am open to work on full-stack teams where the code gets reviewed
          and the details matter. The quickest way to reach me is email.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="rise mt-10 inline-block font-mono text-lg break-all lnk sm:text-2xl"
          style={{ ['--rise-delay' as string]: '80ms' }}
        >
          {profile.email}
        </a>

        <ul
          className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-8 pl-0"
          style={{ ['--rise-delay' as string]: '140ms' }}
        >
          {socials
            .filter((s) => s.label !== 'Email')
            .map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-col gap-1"
                >
                  <span className="rec">{s.label}</span>
                  <span className="lnk font-mono text-sm">{s.handle}</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-rule py-10">
      <p className="rec">
        {profile.name} — {profile.location}
      </p>
      <p className="rec">Built with React, Tailwind and Vite</p>
    </footer>
  )
}
