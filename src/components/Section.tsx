import type { ReactNode } from 'react'

/**
 * A section head: the label in the record voice, the title in the narrative
 * one, and a rule that runs the full column.
 *
 * Deliberately unnumbered. Numbered markers (01 / 02 / 03) imply the reader
 * is walking a sequence, and these sections are not one — you can read
 * Experience without having read Work.
 */
export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: ReactNode
}) {
  return (
    /* Asymmetric on purpose: more room above a heading than below the
       content it follows, so the space reads as belonging to the section
       that is starting rather than as the previous one trailing off. The
       gap was a uniform 224px, which is fine after a full-width screenshot
       and far too much after a two-line bullet. */
    <section id={id} className="scroll-mt-24 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <header className="rise mb-10 sm:mb-14">
        <p className="rec mb-3">{label}</p>
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <span aria-hidden="true" className="hdr-rule mt-4" />
      </header>
      {children}
    </section>
  )
}
