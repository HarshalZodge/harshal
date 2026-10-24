import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { LiquidChromeVertexShader, LiquidChromeFragmentShader } from './LiquidChromeShader'

export type ChromePreset = 'mercury' | 'obsidian' | 'iridescent' | 'gold'

interface LiquidChromeCanvasProps {
  className?: string
  preset?: ChromePreset
  interactive?: boolean
  strength?: number
  deformation?: number
  fadeEdges?: boolean
  onLoaded?: () => void
  showControls?: boolean
  active?: boolean
  dprScale?: number
}

interface MaterialPresetParams {
  baseColor: [number, number, number]
  midColor: [number, number, number]
  specColor: [number, number, number]
  fresnelColor: [number, number, number]
  contrast: number
  iridescence: number
}

const PRESET_DEFINITIONS: Record<ChromePreset, MaterialPresetParams> = {
  mercury: {
    baseColor: [0.035, 0.040, 0.050],
    midColor: [0.72, 0.77, 0.83],
    specColor: [1.0, 1.0, 1.0],
    fresnelColor: [0.92, 0.95, 0.98],
    contrast: 1.0,
    iridescence: 0.0,
  },
  obsidian: {
    baseColor: [0.020, 0.024, 0.032],
    midColor: [0.18, 0.20, 0.24],
    specColor: [1.0, 1.0, 1.0],
    fresnelColor: [0.85, 0.90, 0.95],
    contrast: 1.55,
    iridescence: 0.0,
  },
  iridescent: {
    baseColor: [0.035, 0.040, 0.050],
    midColor: [0.70, 0.75, 0.80],
    specColor: [1.0, 1.0, 1.0],
    fresnelColor: [0.95, 0.96, 0.98],
    contrast: 1.05,
    iridescence: 1.0,
  },
  gold: {
    baseColor: [0.08, 0.05, 0.02],
    midColor: [0.90, 0.74, 0.44],
    specColor: [1.15, 1.05, 0.85],
    fresnelColor: [1.10, 0.96, 0.72],
    contrast: 1.15,
    iridescence: 0.0,
  },
}

// Global detection helper
function detectWebGL(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

function detectReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const LiquidChromeCanvas: React.FC<LiquidChromeCanvasProps> = ({
  className = '',
  preset = 'mercury',
  interactive = true,
  strength = 1.0,
  deformation = 1.0,
  fadeEdges = false,
  onLoaded,
  showControls = false,
  active = true,
  dprScale = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglSupported, setWebglSupported] = useState<boolean>(detectWebGL)
  const [userPreset, setUserPreset] = useState<ChromePreset | null>(null)
  const activePreset = userPreset ?? preset

  // Synchronize dynamic scroll velocity via zero-render event pipeline
  const scrollVelRef = useRef(0)
  useEffect(() => {
    const handleScrollVel = (e: Event) => {
      scrollVelRef.current = (e as CustomEvent<number>).detail
    }
    window.addEventListener('studio:scroll-velocity', handleScrollVel)
    return () => window.removeEventListener('studio:scroll-velocity', handleScrollVel)
  }, [])

  // Active state synchronization for smart RAF suspension
  const activeRef = useRef<boolean>(active)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  // Device-tier awareness & Adaptive DRS (Dynamic Resolution Scaling) for 60 FPS
  const currentDprRef = useRef<number>(1.0)
  const perfFramesRef = useRef<number>(0)
  const perfLastTimeRef = useRef<number>(0)

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const animFrameIdRef = useRef<number | null>(null)
  const isVisibleRef = useRef<boolean>(true)

  // Mouse interpolation state
  const mouseTargetRef = useRef<{ x: number; y: number; active: number }>({ x: 0, y: 0, active: 0 })
  const mouseCurrentRef = useRef<{ x: number; y: number; active: number }>({ x: 0, y: 0, active: 0 })
  const mouseVelocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 })
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 })

  // Material parameter smooth transition state
  const currentParamsRef = useRef<MaterialPresetParams>({
    baseColor: [...PRESET_DEFINITIONS[activePreset].baseColor],
    midColor: [...PRESET_DEFINITIONS[activePreset].midColor],
    specColor: [...PRESET_DEFINITIONS[activePreset].specColor],
    fresnelColor: [...PRESET_DEFINITIONS[activePreset].fresnelColor],
    contrast: PRESET_DEFINITIONS[activePreset].contrast,
    iridescence: PRESET_DEFINITIONS[activePreset].iridescence,
  })

  // Synchronize active preset into target
  const activePresetRef = useRef<ChromePreset>(activePreset)
  useEffect(() => {
    activePresetRef.current = activePreset
  }, [activePreset])

  // Update strength ref so RAF uses latest value without re-init
  const strengthRef = useRef<number>(strength)
  useEffect(() => {
    strengthRef.current = strength
  }, [strength])

  // Update deformation uniform
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uDeformation.value = deformation
    }
  }, [deformation])

  // Update fadeEdges uniform
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uFadeEdges.value = fadeEdges ? 1.0 : 0.0
    }
  }, [fadeEdges])

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uReducedMotion.value = e.matches ? 1.0 : 0.0
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Initial props snapshot for WebGL initialization
  const initConfigRef = useRef({
    preset: activePreset,
    strength,
    deformation,
    fadeEdges,
    dprScale,
  })

  // Main Three.js Initialization (only on mount / webgl state)
  useEffect(() => {
    if (!webglSupported) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const isMobile = typeof window !== 'undefined' && (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    )
    const scale = initConfigRef.current.dprScale ?? 1.0
    const minDpr = 0.70 * scale
    const maxDpr = (isMobile ? 1.0 : 1.25) * scale
    currentDprRef.current = (isMobile ? 0.85 : 1.10) * scale
    perfLastTimeRef.current = performance.now()

    // Create scene and 2D fullscreen quad camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    cameraRef.current = camera

    const isReduced = detectReducedMotion()
    const initialPreset = PRESET_DEFINITIONS[initConfigRef.current.preset]

    // Create custom shader material
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: initConfigRef.current.strength },
      uScrollVelocity: { value: 0 },
      uDeformation: { value: initConfigRef.current.deformation },
      uReducedMotion: { value: isReduced ? 1.0 : 0.0 },
      uFadeEdges: { value: initConfigRef.current.fadeEdges ? 1.0 : 0.0 },

      // Smooth material parameters
      uBaseColor: { value: new THREE.Vector3(...initialPreset.baseColor) },
      uMidColor: { value: new THREE.Vector3(...initialPreset.midColor) },
      uSpecColor: { value: new THREE.Vector3(...initialPreset.specColor) },
      uFresnelColor: { value: new THREE.Vector3(...initialPreset.fresnelColor) },
      uContrast: { value: initialPreset.contrast },
      uIridescence: { value: initialPreset.iridescence },
    }

    let material: THREE.ShaderMaterial
    let renderer: THREE.WebGLRenderer

    try {
      // Use WebGLRenderer with fallback check
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(currentDprRef.current)
      renderer.setSize(width, height, false)
      rendererRef.current = renderer

      material = new THREE.ShaderMaterial({
        vertexShader: LiquidChromeVertexShader,
        fragmentShader: LiquidChromeFragmentShader,
        uniforms,
        depthTest: false,
        depthWrite: false,
      })
      materialRef.current = material

      // Plane geometry spanning full quad
      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      meshRef.current = mesh

      // Pre-warm WebGL shader pipeline immediately to eliminate runtime compilation hitch
      renderer.compile(scene, camera)

      onLoaded?.()
    } catch (err) {
      console.warn('LiquidChrome WebGL initialization encountered an error:', err)
      setTimeout(() => setWebglSupported(false), 0)
      return
    }

    // Animation Loop with decoupled RAF
    let startTime = performance.now()
    const render = () => {
      if (!isVisibleRef.current || activeRef.current === false) {
        animFrameIdRef.current = requestAnimationFrame(render)
        return
      }

      // Real-time GPU Performance Monitoring & Adaptive DRS (Dynamic Resolution Scaling)
      perfFramesRef.current++
      const nowPerf = performance.now()
      const deltaPerf = nowPerf - perfLastTimeRef.current

      if (deltaPerf >= 1200) {
        const measuredFps = (perfFramesRef.current * 1000) / deltaPerf
        perfFramesRef.current = 0
        perfLastTimeRef.current = nowPerf

        if (measuredFps < 48 && currentDprRef.current > minDpr) {
          // Gracefully scale down DPR to guarantee solid 60 FPS on low-end GPUs
          currentDprRef.current = Math.max(minDpr, Number((currentDprRef.current - 0.15).toFixed(2)))
          if (rendererRef.current && containerRef.current) {
            rendererRef.current.setPixelRatio(currentDprRef.current)
            const w = containerRef.current.clientWidth || window.innerWidth
            const h = containerRef.current.clientHeight || window.innerHeight
            rendererRef.current.setSize(w, h, false)
          }
        } else if (measuredFps >= 58 && currentDprRef.current < maxDpr) {
          // Scale resolution up when headroom permits
          currentDprRef.current = Math.min(maxDpr, Number((currentDprRef.current + 0.10).toFixed(2)))
          if (rendererRef.current && containerRef.current) {
            rendererRef.current.setPixelRatio(currentDprRef.current)
            const w = containerRef.current.clientWidth || window.innerWidth
            const h = containerRef.current.clientHeight || window.innerHeight
            rendererRef.current.setSize(w, h, false)
          }
        }
      }

      const elapsedTime = (performance.now() - startTime) * 0.001

      // Smooth mouse position interpolation (LERP) - High-responsiveness
      const lerpSpeed = 0.14
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpSpeed
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpSpeed
      mouseCurrentRef.current.active += (mouseTargetRef.current.active - mouseCurrentRef.current.active) * lerpSpeed

      // Mouse velocity damping
      mouseVelocityRef.current.vx *= 0.88
      mouseVelocityRef.current.vy *= 0.88

      // Smoothly transition material parameters towards active target preset
      const targetPreset = PRESET_DEFINITIONS[activePresetRef.current]
      const curr = currentParamsRef.current
      const tLerp = 0.075

      for (let i = 0; i < 3; i++) {
        curr.baseColor[i] += (targetPreset.baseColor[i] - curr.baseColor[i]) * tLerp
        curr.midColor[i] += (targetPreset.midColor[i] - curr.midColor[i]) * tLerp
        curr.specColor[i] += (targetPreset.specColor[i] - curr.specColor[i]) * tLerp
        curr.fresnelColor[i] += (targetPreset.fresnelColor[i] - curr.fresnelColor[i]) * tLerp
      }
      curr.contrast += (targetPreset.contrast - curr.contrast) * tLerp
      curr.iridescence += (targetPreset.iridescence - curr.iridescence) * tLerp

      if (materialRef.current) {
        const u = materialRef.current.uniforms
        u.uTime.value = elapsedTime
        u.uMouse.value.set(
          mouseCurrentRef.current.x,
          mouseCurrentRef.current.y
        )
        u.uMouseVelocity.value.set(
          mouseVelocityRef.current.vx,
          mouseVelocityRef.current.vy
        )
        u.uMouseStrength.value =
          strengthRef.current * (0.6 + mouseCurrentRef.current.active * 0.8)

        // Smooth real-time scroll velocity damping
        u.uScrollVelocity.value += (scrollVelRef.current - u.uScrollVelocity.value) * 0.12

        // Assign smoothly interpolated preset colors
        u.uBaseColor.value.set(curr.baseColor[0], curr.baseColor[1], curr.baseColor[2])
        u.uMidColor.value.set(curr.midColor[0], curr.midColor[1], curr.midColor[2])
        u.uSpecColor.value.set(curr.specColor[0], curr.specColor[1], curr.specColor[2])
        u.uFresnelColor.value.set(curr.fresnelColor[0], curr.fresnelColor[1], curr.fresnelColor[2])
        u.uContrast.value = curr.contrast
        u.uIridescence.value = curr.iridescence
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }

      animFrameIdRef.current = requestAnimationFrame(render)
    }

    animFrameIdRef.current = requestAnimationFrame(render)

    // Resize handling with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect
        if (newW > 0 && newH > 0 && rendererRef.current && materialRef.current) {
          rendererRef.current.setSize(newW, newH, false)
          materialRef.current.uniforms.uResolution.value.set(newW, newH)
        }
      }
    })
    resizeObserver.observe(container)

    // Visibility handling (pause when tab hidden or element out of view)
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting && document.visibilityState === 'visible'
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(container)

    // Proper Resource Cleanup on unmount (safe for React 19 Strict Mode)
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (meshRef.current) {
        scene.remove(meshRef.current)
        meshRef.current.geometry.dispose()
      }
      if (materialRef.current) {
        materialRef.current.dispose()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [webglSupported, onLoaded])

  // Window-level pointer tracking ensures mouse movement is NEVER blocked by overlay divs, text, or buttons
  useEffect(() => {
    if (!interactive) return

    const handleWindowPointerMove = (e: PointerEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()

      // Only track if the container is currently visible in or near the viewport
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return

      // Normalized coordinates [-1, 1] relative to container center
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      const aspect = rect.width / Math.max(rect.height, 1)
      const targetX = x * aspect * 1.1
      const targetY = y * 1.1

      const now = performance.now()
      const dt = Math.max((now - lastPointerRef.current.time) * 0.001, 0.008)
      const dx = targetX - lastPointerRef.current.x
      const dy = targetY - lastPointerRef.current.y

      mouseVelocityRef.current = {
        vx: Math.max(Math.min(dx / dt, 5.5), -5.5),
        vy: Math.max(Math.min(dy / dt, 5.5), -5.5),
      }
      lastPointerRef.current = { x: targetX, y: targetY, time: now }

      mouseTargetRef.current = {
        x: targetX,
        y: targetY,
        active: 1.0,
      }
    }

    const handleWindowPointerLeave = (e: PointerEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) {
        mouseTargetRef.current = { x: 0, y: 0, active: 0.0 }
        mouseVelocityRef.current = { vx: 0, vy: 0 }
      }
    }

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true })
    window.addEventListener('pointerleave', handleWindowPointerLeave, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove)
      window.removeEventListener('pointerleave', handleWindowPointerLeave)
    }
  }, [interactive])

  // Local Touch & pointer fallback
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      const aspect = rect.width / Math.max(rect.height, 1)
      const targetX = x * aspect * 1.1
      const targetY = y * 1.1

      const now = performance.now()
      const dt = Math.max((now - lastPointerRef.current.time) * 0.001, 0.01)
      const dx = targetX - lastPointerRef.current.x
      const dy = targetY - lastPointerRef.current.y

      mouseVelocityRef.current = {
        vx: Math.max(Math.min(dx / dt, 5.0), -5.0),
        vy: Math.max(Math.min(dy / dt, 5.0), -5.0),
      }
      lastPointerRef.current = { x: targetX, y: targetY, time: now }

      mouseTargetRef.current = {
        x: targetX,
        y: targetY,
        active: 1.0,
      }
    },
    [interactive]
  )

  const handlePointerLeave = useCallback(() => {
    // Smoothly return to center / natural rest state
    mouseTargetRef.current = {
      x: 0,
      y: 0,
      active: 0.0,
    }
    mouseVelocityRef.current = { vx: 0, vy: 0 }
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
      aria-label="Interactive liquid chrome artwork"
      role="img"
    >
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />
      ) : (
        /* Polished Non-WebGL Fallback: Elegant fluid metallic sheen */
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#171717] via-[#777773] to-[#FAFAF8] opacity-20" />
      )}

      {/* Preset switcher pills when showControls is enabled */}
      {showControls && webglSupported && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 bg-[#FAFAF8]/90 backdrop-blur-md border border-[#E5E3DE] rounded-none text-xs font-mono shadow-sm">
          <span className="px-2 text-[10px] uppercase text-[#777773] tracking-wider">
            Material:
          </span>
          {(['mercury', 'obsidian', 'iridescent', 'gold'] as ChromePreset[]).map((p) => (
            <button
              key={p}
              onClick={() => setUserPreset(p)}
              className={`px-2.5 py-1 text-[11px] capitalize transition-all border ${
                activePreset === p
                  ? 'bg-[#171717] text-[#FAFAF8] border-[#171717]'
                  : 'bg-transparent text-[#777773] hover:text-[#171717] border-transparent hover:border-[#E5E3DE]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
