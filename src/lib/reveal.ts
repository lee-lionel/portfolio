import { useEffect } from 'react'

/**
 * Reveals anything marked `.rise` as it enters the viewport.
 *
 * One observer for the whole document rather than one per component: the
 * page is a single scroll and the elements are known at mount. Each element
 * is unobserved once it has been shown, so scrolling back up does not replay
 * the animation — a résumé that re-animates every time you scroll past it is
 * a résumé nobody finishes reading.
 *
 * Reduced motion is handled in CSS rather than here, so the class still gets
 * added and nothing depends on JS to become visible.
 */
export function useReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.rise'))
    if (!targets.length) return

    // No IntersectionObserver means everything is simply shown, never hidden.
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      // A little past the bottom edge, so a section has started to rise
      // before the reader's eye actually reaches it.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/**
 * Tracks which section the reader is currently in, for the rail index.
 *
 * Deliberately not an IntersectionObserver: a tall section still intersects
 * an observer band long after the next heading has scrolled into reading
 * position, so the marker lags a whole section behind. Comparing scroll
 * position against section offsets gives the answer the reader would give —
 * the last heading they scrolled past.
 */
export function useActiveSection(ids: readonly string[], onChange: (id: string) => void) {
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      // A third down the viewport: roughly where the eye sits while reading.
      const line = window.scrollY + window.innerHeight / 3
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) current = id
      }
      // At the very bottom the last section may be too short to reach the
      // line, so nothing would ever mark it.
      const atEnd =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
      onChange(atEnd ? ids[ids.length - 1] : current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, onChange])
}
