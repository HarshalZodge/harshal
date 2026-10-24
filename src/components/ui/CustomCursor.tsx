import React, { useEffect, useRef, useState } from 'react'

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [enabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })

  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })
  const stateRef = useRef<{ label: string; mode: 'default' | 'hover' | 'pill' | 'hidden' }>({
    label: '',
    mode: 'default',
  })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY

      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('[data-cursor], a, button, [role="button"]') as HTMLElement | null
      if (interactive) {
        const cursorData = interactive.getAttribute('data-cursor')
        if (cursorData) {
          stateRef.current = { label: cursorData.toUpperCase(), mode: 'pill' }
        } else {
          stateRef.current = { label: '', mode: 'hover' }
        }
      } else {
        stateRef.current = { label: '', mode: 'default' }
      }
    }

    const handleMouseLeave = () => {
      stateRef.current.mode = 'hidden'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Decoupled RAF loop for zero-overhead cursor animation
    let animId: number
    let lastMode = ''
    let lastLabel = ''
    let lastRenderedX = -9999
    let lastRenderedY = -9999

    const animate = () => {
      const p = posRef.current
      const lerp = 0.22
      p.x += (p.targetX - p.x) * lerp
      p.y += (p.targetY - p.y) * lerp

      if (cursorRef.current) {
        const { mode, label } = stateRef.current
        const cursor = cursorRef.current

        // Only update position if moved by >0.15px
        if (Math.abs(p.x - lastRenderedX) > 0.15 || Math.abs(p.y - lastRenderedY) > 0.15) {
          cursor.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`
          lastRenderedX = p.x
          lastRenderedY = p.y
        }

        // Only update classes and DOM when mode or label actually changes
        if (mode !== lastMode || label !== lastLabel) {
          lastMode = mode
          lastLabel = label

          if (mode === 'hidden' || p.x < -10) {
            cursor.style.opacity = '0'
          } else {
            cursor.style.opacity = '1'
          }

          if (mode === 'pill' && label) {
            cursor.className =
              'fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-2.5 py-1 bg-[#171717] text-[#FAFAF8] rounded-full text-[9px] font-mono tracking-widest uppercase transition-[width,height,background-color] duration-200 shadow-md'
            if (labelRef.current) {
              labelRef.current.textContent = label
              labelRef.current.style.display = 'inline-block'
            }
          } else if (mode === 'hover') {
            cursor.className =
              'fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#171717]/80 bg-[#171717]/15 transition-[width,height,transform] duration-200 ease-out'
            if (labelRef.current) {
              labelRef.current.style.display = 'none'
            }
          } else {
            cursor.className =
              'fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#171717] transition-[width,height] duration-200'
            if (labelRef.current) {
              labelRef.current.style.display = 'none'
            }
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#171717] transition-opacity duration-300"
      aria-hidden="true"
    >
      <span ref={labelRef} className="hidden whitespace-nowrap" />
    </div>
  )
}
