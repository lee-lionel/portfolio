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
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <header className="rise mb-10 border-b border-rule pb-4 sm:mb-14">
        <p className="rec mb-3">{label}</p>
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
      </header>
      {children}
    </section>
  )
}
