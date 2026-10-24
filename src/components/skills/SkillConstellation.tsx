import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { projects } from '../../data/projects'
import { Network, Terminal, ArrowUpRight, Cpu } from 'lucide-react'

interface ConstellationNode {
  id: string
  name: string
  category: string
  status: 'proficient' | 'familiar' | 'exploring'
  note?: string
  highlight?: boolean
  cluster: number // 0: AI, 1: Frontend, 2: Backend, 3: Infrastructure
  relX: number // [0, 1] relative cluster positioning
  relY: number
  connections: string[] // IDs of connected skills
  linkedProjects: string[] // project titles
}

// Map skills with relational connections and linked projects
const SKILL_NODES: ConstellationNode[] = [
  // Cluster 0: AI & Vision
  { id: 'python', name: 'Python', category: 'AI & Data', status: 'proficient', highlight: true, note: 'Core language for ML & data architectures', cluster: 0, relX: 0.22, relY: 0.28, connections: ['pytorch', 'opencv', 'fastapi'], linkedProjects: ['Aura Vision', 'PathFinder AI'] },
  { id: 'pytorch', name: 'PyTorch', category: 'AI & Data', status: 'familiar', note: 'Tensor ops & deep neural nets', cluster: 0, relX: 0.14, relY: 0.18, connections: ['python', 'opencv', 'huggingface'], linkedProjects: ['PathFinder AI'] },
  { id: 'opencv', name: 'OpenCV', category: 'AI & Data', status: 'proficient', highlight: true, note: 'Real-time spatial tracking & feature extraction', cluster: 0, relX: 0.32, relY: 0.18, connections: ['python', 'pytorch', 'mediapipe'], linkedProjects: ['Aura Vision'] },
  { id: 'rag', name: 'LLM & RAG', category: 'AI & Data', status: 'proficient', highlight: true, note: 'Vector indexing, LangChain, semantic retrieval', cluster: 0, relX: 0.12, relY: 0.38, connections: ['python', 'vectordb', 'fastapi'], linkedProjects: ['CivicPulse'] },
  { id: 'huggingface', name: 'Transformers', category: 'AI & Data', status: 'familiar', note: 'Model fine-tuning & embeddings', cluster: 0, relX: 0.26, relY: 0.40, connections: ['pytorch', 'rag'], linkedProjects: ['CivicPulse'] },
  { id: 'mediapipe', name: 'MediaPipe', category: 'AI & Data', status: 'proficient', note: 'Edge vision landmark detection', cluster: 0, relX: 0.38, relY: 0.28, connections: ['opencv', 'threejs'], linkedProjects: ['Aura Vision'] },
  { id: 'vectordb', name: 'Vector DBs', category: 'AI & Data', status: 'proficient', note: 'pgvector & Chroma similarity search', cluster: 0, relX: 0.18, relY: 0.50, connections: ['rag', 'postgres'], linkedProjects: ['CivicPulse'] },

  // Cluster 1: Frontend & Shaders
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', status: 'proficient', highlight: true, note: 'Strict typing & domain contracts', cluster: 1, relX: 0.52, relY: 0.22, connections: ['react', 'threejs', 'nodejs'], linkedProjects: ['HyperChrome GL', 'Kintsugi Telemetry'] },
  { id: 'react', name: 'React 19', category: 'Frontend', status: 'proficient', highlight: true, note: 'Modern hooks, server components & composition', cluster: 1, relX: 0.62, relY: 0.18, connections: ['typescript', 'tailwind', 'framer'], linkedProjects: ['HyperChrome GL', 'CivicPulse'] },
  { id: 'threejs', name: 'Three.js / WebGL', category: 'Frontend', status: 'proficient', highlight: true, note: '3D scene graph & orthographic quad pipeline', cluster: 1, relX: 0.50, relY: 0.36, connections: ['glsl', 'typescript', 'mediapipe'], linkedProjects: ['HyperChrome GL', 'Aura Vision'] },
  { id: 'glsl', name: 'GLSL Shaders', category: 'Frontend', status: 'familiar', highlight: true, note: 'Domain warping & procedural normal math', cluster: 1, relX: 0.40, relY: 0.44, connections: ['threejs', 'typescript'], linkedProjects: ['HyperChrome GL'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', status: 'proficient', note: 'Modern responsive systems & CSS clamp', cluster: 1, relX: 0.72, relY: 0.24, connections: ['react', 'typescript'], linkedProjects: ['CivicPulse'] },
  { id: 'framer', name: 'Framer Motion', category: 'Frontend', status: 'proficient', note: 'Physics springs & layout transitions', cluster: 1, relX: 0.64, relY: 0.34, connections: ['react', 'typescript'], linkedProjects: ['HyperChrome GL'] },
  { id: 'webaudio', name: 'Web Audio API', category: 'Frontend', status: 'familiar', note: 'Real-time dynamic DSP synthesis', cluster: 1, relX: 0.56, relY: 0.46, connections: ['threejs', 'typescript'], linkedProjects: ['HyperChrome GL'] },

  // Cluster 2: Backend & Systems
  { id: 'nodejs', name: 'Node.js', category: 'Backend', status: 'proficient', highlight: true, note: 'Event-driven server runtime & asynchronous I/O', cluster: 2, relX: 0.78, relY: 0.52, connections: ['typescript', 'postgres', 'redis', 'websocket'], linkedProjects: ['CivicPulse', 'Kintsugi Telemetry'] },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', status: 'proficient', highlight: true, note: 'High-throughput async Python REST endpoints', cluster: 2, relX: 0.32, relY: 0.58, connections: ['python', 'rag', 'postgres'], linkedProjects: ['PathFinder AI'] },
  { id: 'postgres', name: 'PostgreSQL', category: 'Backend', status: 'proficient', highlight: true, note: 'Relational data modeling & pgvector indexing', cluster: 2, relX: 0.65, relY: 0.62, connections: ['nodejs', 'fastapi', 'vectordb'], linkedProjects: ['CivicPulse'] },
  { id: 'redis', name: 'Redis', category: 'Backend', status: 'familiar', note: 'In-memory caching & rate-limiting pub/sub', cluster: 2, relX: 0.85, relY: 0.64, connections: ['nodejs', 'websocket'], linkedProjects: ['Kintsugi Telemetry'] },
  { id: 'websocket', name: 'WebSockets', category: 'Backend', status: 'familiar', note: 'Bi-directional telemetry streaming', cluster: 2, relX: 0.74, relY: 0.72, connections: ['nodejs', 'redis', 'typescript'], linkedProjects: ['Kintsugi Telemetry'] },

  // Cluster 3: Infrastructure & DevOps
  { id: 'git', name: 'Git & GitHub', category: 'DevOps', status: 'proficient', highlight: true, note: 'Disciplined branching & version management', cluster: 3, relX: 0.48, relY: 0.68, connections: ['docker', 'linux', 'typescript'], linkedProjects: ['All Repositories'] },
  { id: 'docker', name: 'Docker', category: 'DevOps', status: 'familiar', note: 'Multi-stage containerization & reproducible builds', cluster: 3, relX: 0.38, relY: 0.78, connections: ['git', 'linux', 'nodejs'], linkedProjects: ['CivicPulse'] },
  { id: 'linux', name: 'Linux / Bash', category: 'DevOps', status: 'proficient', note: 'Shell scripting & system administration', cluster: 3, relX: 0.28, relY: 0.72, connections: ['git', 'docker', 'python'], linkedProjects: ['PathFinder AI'] },
  { id: 'vite', name: 'Vite & Tooling', category: 'DevOps', status: 'proficient', note: 'Production bundling, Rolldown & instant HMR', cluster: 3, relX: 0.58, relY: 0.80, connections: ['git', 'typescript', 'react'], linkedProjects: ['HyperChrome GL'] },
]

export const SkillConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('typescript')
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  const activeNodeId = hoveredNodeId || selectedNodeId
  const activeNode = useMemo(() => {
    return SKILL_NODES.find((n) => n.id === activeNodeId) || SKILL_NODES[0]
  }, [activeNodeId])

  // Get active connected node IDs
  const connectedIds = useMemo(() => {
    const set = new Set<string>()
    set.add(activeNode.id)
    activeNode.connections.forEach((c) => set.add(c))
    // Also include nodes that connect back to this node
    SKILL_NODES.forEach((n) => {
      if (n.connections.includes(activeNode.id)) {
        set.add(n.id)
      }
    })
    return set
  }, [activeNode])

  // Canvas drawing & animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = Math.max(container.clientHeight, 440)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    updateSize()
    const resizeObserver = new ResizeObserver(() => updateSize())
    resizeObserver.observe(container)

    let isVisible = false
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') {
        isVisible = false
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && document.visibilityState === 'visible'
    }, { threshold: 0.05 })
    intersectionObserver.observe(container)

    let t = 0
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render)
        return
      }

      t += 0.015
      ctx.clearRect(0, 0, width, height)

      // Compute live positions with subtle organic drift
      const positions: Record<string, { x: number; y: number }> = {}
      SKILL_NODES.forEach((node, idx) => {
        const driftX = Math.sin(t + idx * 0.8) * 3.5
        const driftY = Math.cos(t * 0.9 + idx * 0.7) * 3.5
        positions[node.id] = {
          x: node.relX * width + driftX,
          y: node.relY * height + driftY,
        }
      })

      // 1. Draw connection threads
      SKILL_NODES.forEach((node) => {
        const p1 = positions[node.id]
        if (!p1) return

        node.connections.forEach((targetId) => {
          const p2 = positions[targetId]
          if (!p2) return

          const isConnectedToActive =
            connectedIds.has(node.id) && connectedIds.has(targetId)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          if (isConnectedToActive) {
            ctx.strokeStyle = '#171717'
            ctx.lineWidth = 1.4
            ctx.globalAlpha = 0.75
          } else {
            ctx.strokeStyle = '#C8C6C1'
            ctx.lineWidth = 0.8
            ctx.globalAlpha = 0.25
          }
          ctx.stroke()

          // Draw floating pulse along active threads
          if (isConnectedToActive) {
            const pulseT = (t * 0.8 + node.cluster) % 1
            const pulseX = p1.x + (p2.x - p1.x) * pulseT
            const pulseY = p1.y + (p2.y - p1.y) * pulseT
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
            ctx.fillStyle = '#171717'
            ctx.globalAlpha = 0.9
            ctx.fill()
          }
        })
      })

      // 2. Draw nodes
      SKILL_NODES.forEach((node) => {
        const pos = positions[node.id]
        if (!pos) return

        const isCurrent = node.id === activeNodeId
        const isConnected = connectedIds.has(node.id)

        // Outer glow on active / hovered
        if (isCurrent) {
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2)
          ctx.fillStyle = '#171717'
          ctx.globalAlpha = 0.08
          ctx.fill()
        }

        // Main node circle
        ctx.beginPath()
        const radius = isCurrent ? 6 : node.highlight ? 4.5 : 3.5
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)

        if (isCurrent) {
          ctx.fillStyle = '#171717'
          ctx.globalAlpha = 1.0
          ctx.fill()
          ctx.lineWidth = 2
          ctx.strokeStyle = '#FFFFFF'
          ctx.stroke()
        } else if (isConnected) {
          ctx.fillStyle = '#171717'
          ctx.globalAlpha = 0.85
          ctx.fill()
        } else {
          ctx.fillStyle = node.status === 'proficient' ? '#777773' : '#A8ADB2'
          ctx.globalAlpha = 0.4
          ctx.fill()
        }

        // Node labels
        ctx.font = isCurrent
          ? '600 11px "Space Grotesk", sans-serif'
          : isConnected
          ? '500 10px "Inter", sans-serif'
          : '500 9px "Inter", sans-serif'
        ctx.fillStyle = isCurrent ? '#111111' : isConnected ? '#1A1D20' : '#45484F'
        ctx.globalAlpha = isCurrent ? 1.0 : isConnected ? 0.95 : 0.82
        ctx.fillText(node.name, pos.x + 8, pos.y + 3)
      })

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [activeNodeId, connectedIds])

  // Handle pointer interactions on the canvas
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find nearest node within hit radius
    let foundId: string | null = null
    const hitRadius = 22

    SKILL_NODES.forEach((node) => {
      const nodeX = node.relX * rect.width
      const nodeY = node.relY * rect.height
      const dist = Math.hypot(x - nodeX, y - nodeY)
      if (dist < hitRadius) {
        foundId = node.id
      }
    })

    setHoveredNodeId(foundId)
  }, [])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    SKILL_NODES.forEach((node) => {
      const nodeX = node.relX * rect.width
      const nodeY = node.relY * rect.height
      const dist = Math.hypot(x - nodeX, y - nodeY)
      if (dist < 26) {
        setSelectedNodeId(node.id)
      }
    })
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
      {/* Interactive Constellation Viewport (Canvas) */}
      <div
        ref={containerRef}
        className="lg:col-span-8 relative bg-[#FFFFFF] border border-[#E5E3DE] p-2 sm:p-4 shadow-sm min-h-[460px] sm:min-h-[520px] overflow-hidden"
      >
        {/* Canvas HUD Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#E5E3DE] text-xs font-mono text-[#777773]">
          <div className="flex items-center gap-2">
            <Network className="w-3.5 h-3.5 text-[#171717]" />
            <span className="uppercase tracking-wider font-semibold text-[#171717]">
              Relational Topology Network
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest hidden sm:inline">
            Interactive: Click / Hover Nodes
          </span>
        </div>

        {/* 2D Constellation Canvas */}
        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredNodeId(null)}
          onClick={handleCanvasClick}
          data-cursor="inspect"
          className="w-full h-[400px] sm:h-[460px] block cursor-crosshair"
          aria-label="Interactive skill constellation network"
        />

        {/* Legend Overlay at bottom */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3 border-t border-[#E5E3DE] text-[10px] sm:text-[11px] font-mono text-[#777773]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#171717]" />
              <span>Proficient</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#777773]" />
              <span>Familiar</span>
            </span>
          </div>
          <span className="text-[#171717] font-semibold">
            {connectedIds.size} Connected Skills Active
          </span>
        </div>
      </div>

      {/* Node Telemetry & Project Inspector Card (Right Column) */}
      <div className="lg:col-span-4 editorial-card bg-[#FFFFFF] border border-[#E5E3DE] p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#777773]">
            <Terminal className="w-3.5 h-3.5 text-[#171717]" />
            <span className="uppercase tracking-wider">Node Telemetry</span>
          </div>
          <span className="px-2 py-0.5 bg-[#FAFAF8] border border-[#E5E3DE] text-[9px] font-mono uppercase tracking-widest text-[#171717]">
            {activeNode.category}
          </span>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="font-display font-bold text-2xl text-[#171717]">
              {activeNode.name}
            </h3>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                activeNode.status === 'proficient'
                  ? 'text-emerald-700'
                  : 'text-[#777773]'
              }`}
            >
              • {activeNode.status}
            </span>
          </div>

          {activeNode.note && (
            <p className="font-body text-xs text-[#777773] leading-relaxed mb-4">
              {activeNode.note}
            </p>
          )}
        </div>

        {/* Synergistic Connected Skills */}
        <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#777773] block mb-2">
            Synergistic Stack Connections:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeNode.connections.map((connId) => {
              const node = SKILL_NODES.find((n) => n.id === connId)
              if (!node) return null
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E3DE] hover:border-[#171717] text-[10px] font-mono text-[#171717] transition-colors"
                >
                  {node.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Linked Portfolio Projects */}
        <div className="pt-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#777773] block mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#171717]" />
            <span>Applied In Portfolio Projects:</span>
          </span>
          <div className="space-y-1.5">
            {activeNode.linkedProjects.map((pTitle) => {
              const proj = projects.find((p) => p.title.toLowerCase().includes(pTitle.toLowerCase()))
              return (
                <div
                  key={pTitle}
                  className="p-2.5 bg-[#FFFFFF] border border-[#E5E3DE] hover:border-[#171717] flex items-center justify-between text-xs font-mono transition-colors"
                >
                  <span className="font-medium text-[#171717]">{pTitle}</span>
                  {proj ? (
                    <a
                      href="#work"
                      className="text-[10px] text-[#777773] hover:text-[#171717] flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-[#777773]">Core Practice</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
