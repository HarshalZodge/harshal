import React, { useState } from 'react'
import { LiquidChromeCanvas, type ChromePreset } from '../components/chrome/LiquidChromeCanvas'
import { useStudio } from '../hooks/useStudio'
import { Beaker, Sliders, Cpu, Activity } from 'lucide-react'

export const LabSection: React.FC = () => {
  const { activePreset: selectedPreset, setPreset: setSelectedPreset } = useStudio()
  const [mouseStrength, setMouseStrength] = useState<number>(1.2)

  const experiments = [
    {
      id: 'shader-physics',
      title: 'Procedural Liquid Mercury',
      tag: 'WebGL / GLSL',
      description: 'Continuous analytical normal computation and domain-warping fluid distortion rendered on an orthographic quad.',
      status: 'Active Live Canvas',
    },
    {
      id: 'fresnel-dispersion',
      title: 'Glancing Iridescence Dispersion',
      tag: 'Optics / Math',
      description: 'High-order Fresnel cosine phase approximation simulating thin-film interference at acute grazing angles.',
      status: 'Selectable Preset',
    },
    {
      id: 'obsidian-titanium',
      title: 'PVD Obsidian Mirror Coating',
      tag: 'Material Study',
      description: 'Deep light absorption curve with sharp specular reflection, modeling black vapor deposition titanium.',
      status: 'Selectable Preset',
    },
  ]

  return (
    <section
      id="lab"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#FAFAF8] border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#E5E3DE]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#171717]" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
                Experiments // 07
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              The Digital Lab.
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-[#26282C] max-w-xl font-normal">
              An interactive sandbox for procedural shaders, physics simulation, and real-time graphics engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E3DE] text-[11px] font-body font-medium text-[#171717] self-start md:self-end">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Interactive GPU Shader Engine Active</span>
          </div>
        </div>

        {/* The Interactive Lab Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Viewport */}
          <div className="lg:col-span-8 editorial-card bg-[#FFFFFF] border border-[#E5E3DE] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 border-b border-[#E5E3DE]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#777773]">
                <Beaker className="w-4 h-4 text-[#171717]" />
                <span className="uppercase tracking-wider font-semibold text-[#171717]">
                  Viewport: {selectedPreset.toUpperCase()}_SURFACE.glsl
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#777773]">
                Touch / Hover to Displace
              </span>
            </div>

            {/* Canvas Container with deliberate framing */}
            <div className="relative w-full h-72 sm:h-80 md:h-[400px] bg-[#171717] border border-[#E5E3DE] overflow-hidden">
              <LiquidChromeCanvas
                preset={selectedPreset}
                interactive={true}
                strength={mouseStrength}
                deformation={mouseStrength}
                fadeEdges={false}
                className="w-full h-full"
              />

              {/* Viewport Overlay Telemetry */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono text-white/80 bg-black/40 backdrop-blur-sm p-2 border border-white/10">
                <span>PRESET: {selectedPreset.toUpperCase()}</span>
                <span>DEFORMATION: {(mouseStrength * 100).toFixed(0)}%</span>
                <span>TARGET: 60 FPS</span>
              </div>
            </div>

            {/* Controls Toolbar */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#E5E3DE] flex flex-wrap items-center justify-between gap-4">
              {/* Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#777773] uppercase tracking-wider mr-1">
                  Preset:
                </span>
                {(['mercury', 'obsidian', 'iridescent', 'gold'] as ChromePreset[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPreset(p)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all min-h-[36px] border ${
                      selectedPreset === p
                        ? 'bg-[#171717] text-[#FAFAF8] border-[#171717]'
                        : 'bg-[#FAFAF8] text-[#777773] hover:text-[#171717] border-[#E5E3DE]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Strength slider */}
              <div className="flex items-center gap-3 text-xs font-mono text-[#777773]">
                <span>Distortion:</span>
                <input
                  type="range"
                  min="0.3"
                  max="2.2"
                  step="0.1"
                  value={mouseStrength}
                  onChange={(e) => setMouseStrength(parseFloat(e.target.value))}
                  className="w-24 accent-[#171717] cursor-pointer"
                  aria-label="Distortion strength"
                />
                <span className="w-8 text-[#171717] font-semibold">
                  {mouseStrength.toFixed(1)}x
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Code & Experiment Notes */}
          <div className="lg:col-span-4 space-y-4">
            <div className="editorial-card p-5 sm:p-6 bg-[#FFFFFF] border border-[#E5E3DE]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#171717] mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#171717]" />
                <span>Active Shader Studies</span>
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {experiments.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3 bg-[#FAFAF8] border border-[#E5E3DE] hover:border-[#171717] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-semibold text-xs text-[#171717]">
                        {exp.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#777773]">
                        {exp.tag}
                      </span>
                    </div>
                    <p className="font-body text-[11px] text-[#777773] leading-relaxed mb-2">
                      {exp.description}
                    </p>
                    <span className="inline-block text-[9px] font-mono uppercase tracking-widest text-emerald-600 font-medium">
                      • {exp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WebGL Architecture Highlights */}
            <div className="editorial-card p-5 sm:p-6 bg-[#F3F0E9] border border-[#E5E3DE] text-xs font-mono text-[#41464B] space-y-2">
              <div className="font-semibold text-[#171717] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#171717]" />
                <span>Graphics Pipeline Details</span>
              </div>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                • Zero overhead uniform mutation via decoupled requestAnimationFrame loop.
              </p>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                • Automatic IntersectionObserver throttling stops GPU cycles when scrolled past.
              </p>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                • Responsive viewport aspect matrix prevents stretching across mobile & ultra-wide displays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
