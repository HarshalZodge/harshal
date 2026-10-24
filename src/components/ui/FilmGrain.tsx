import React, { useState } from 'react'
import { useStudio } from '../../hooks/useStudio'

function generateGrainTile(): string {
  if (typeof window === 'undefined') return ''
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const imgData = ctx.createImageData(128, 128)
    const buffer = new Uint32Array(imgData.data.buffer)

    for (let i = 0; i < buffer.length; i++) {
      const val = Math.floor(Math.random() * 255)
      const alpha = Math.floor(Math.random() * 40) + 12
      buffer[i] = (alpha << 24) | (val << 16) | (val << 8) | val
    }

    ctx.putImageData(imgData, 0, 0)
    return canvas.toDataURL('image/png')
  } catch {
    return ''
  }
}

export const FilmGrain: React.FC = () => {
  const { filmGrain, theme } = useStudio()
  // Generate high-performance hardware-accelerated 128x128 film grain tile once
  const [grainPatternUrl] = useState<string>(generateGrainTile)

  if (!filmGrain || !grainPatternUrl) return null

  const opacity = theme === 'obsidian' ? 0.055 : 0.038

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden transition-opacity duration-700"
      style={{
        opacity,
        backgroundImage: `url(${grainPatternUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}
