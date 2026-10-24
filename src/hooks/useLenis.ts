import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useStudio } from './useStudio'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const { resumeOpen, commandPaletteOpen } = useStudio()

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    // Initialize Lenis with tuned momentum physics
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      infinite: false,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Track scroll velocity for WebGL fluid stretch & curtain flexion with zero React re-renders
    lenis.on('scroll', (e: { velocity: number }) => {
      const clampedVel = Math.max(Math.min(e.velocity * 0.12, 6.0), -6.0)
      window.dispatchEvent(new CustomEvent('studio:scroll-velocity', { detail: clampedVel }))
    })

    // Expose lenis instance globally for programmatic scrolling
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    // Intercept in-page anchor links for buttery-smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement as HTMLElement, { offset: -70, duration: 1.2 })
          history.pushState(null, '', href)
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Continuous RAF loop
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      delete (window as unknown as { __lenis?: Lenis }).__lenis
      lenis.destroy()
      window.dispatchEvent(new CustomEvent('studio:scroll-velocity', { detail: 0 }))
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  // Freeze/Resume smooth scroll when full-screen dialogs open
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (resumeOpen || commandPaletteOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [resumeOpen, commandPaletteOpen])

  return lenisRef
}
