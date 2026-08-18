import { useEffect } from 'react'

/**
 * Scroll-linked motion, without scroll-jacking.
 *
 * Nothing here takes the scroll over or changes how far a wheel turn moves
 * the page. Each element marked `data-fx` simply gets a `--p` custom
 * property from 0 to 1 describing how far it has travelled through the
 * viewport, and the stylesheet decides what to do with it. That keeps the
 * maths in one place and the design decisions in CSS.
 *
 * The whole thing is skipped under prefers-reduced-motion, so the elements
 * keep their neutral `--p` and simply sit still.
 */
export function useScrollFx() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const root = document.documentElement
    let frame = 0

    const measure = () => {
      frame = 0
      const vh = window.innerHeight

      /* How far the reader has scrolled, in viewports. The hero uses this to
         drift out of the way rather than just scrolling off unchanged. */
      root.style.setProperty('--scroll', (window.scrollY / vh).toFixed(4))

      for (const el of document.querySelectorAll<HTMLElement>('[data-fx]')) {
        const r = el.getBoundingClientRect()
        // Skip anything well outside the viewport — on a long page most
        // elements are, and reading their box every frame is the expensive
        // part.
        if (r.bottom < -240 || r.top > vh + 240) continue
        // 0 as the element's top reaches the bottom edge, 1 as its bottom
        // clears the top edge.
        const p = (vh - r.top) / (vh + r.height)
        el.style.setProperty('--p', (p < 0 ? 0 : p > 1 ? 1 : p).toFixed(4))
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
