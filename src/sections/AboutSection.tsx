import React from 'react'
import { siteConfig } from '../data/siteConfig'
import { Compass, Cpu, BookOpen, Terminal } from 'lucide-react'

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-[#171717]" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
            Biography / 02
          </span>
        </div>

        {/* Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Bold Typographic Statement & Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.06]">
              Curious by default.
              <span className="block italic font-medium text-[#222429] chrome-text-sheen">
                Engineer by practice.
              </span>
            </h2>

            <div className="space-y-4 sm:space-y-5 font-body text-sm sm:text-base lg:text-lg text-[#26282C] leading-relaxed font-normal">
              {siteConfig.about.paragraphs.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Approach to Problem Solving */}
            <div className="pt-6 sm:pt-8 border-t border-[#E5E3DE]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold mb-6 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#111111]" />
                <span>Engineering Philosophy & Approach</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {siteConfig.about.approach.map((step: { step: string; title: string; description: string }) => (
                  <div key={step.step} className="editorial-card p-4 sm:p-5 bg-[#FFFFFF] border border-[#E5E3DE]">
                    <span className="font-mono text-xs text-[#111111] font-bold block mb-2">
                      {step.step}
                    </span>
                    <h4 className="font-display font-semibold text-sm text-[#111111] mb-2">
                      {step.title}
                    </h4>
                    <p className="font-body text-xs text-[#383A3E] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Abstract Identity Card & Specializations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Abstract Visual Identity Card */}
            <div className="editorial-card dark-spec-card relative bg-[#111111] text-[#FAFAF8] p-6 sm:p-8 md:p-10 border border-[#26272C] shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-white/40 flex items-center justify-center font-display font-bold text-xs text-white">
                      {siteConfig.identity.monogram}
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400">
                      Digital Identity
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-4 mb-6 sm:mb-8">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Name & Role
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                      {siteConfig.identity.name}
                    </h3>
                    <p className="font-body text-xs text-neutral-300">
                      {siteConfig.identity.role}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Academic Trajectory
                    </span>
                    <p className="font-mono text-xs text-neutral-200">
                      {siteConfig.identity.academicStatus}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Base of Operations
                    </span>
                    <p className="font-mono text-xs text-neutral-200">
                      {siteConfig.identity.location} (UTC+5:30)
                    </p>
                  </div>
                </div>

                {/* Minimalist Status Graphic */}
                <div className="p-3.5 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <Terminal className="w-3.5 h-3.5 text-white" />
                    <span>status: actively_shipping</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">v2.5</span>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="editorial-card p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E3DE]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold mb-5 sm:mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#111111]" />
                <span>Primary Technical Focus Areas</span>
              </h3>

              <div className="space-y-4">
                {siteConfig.about.focusAreas.map((area: { title: string; description: string; tag: string }) => (
                  <div key={area.title} className="pb-4 border-b border-[#E5E3DE] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-semibold text-sm text-[#111111]">
                        {area.title}
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#F3F0E9] text-[#111111] font-semibold">
                        {area.tag}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#383A3E] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Learning Goals */}
            <div className="editorial-card p-4 sm:p-5 bg-[#FFFFFF] border border-[#E5E3DE] flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#333438] font-semibold block mb-1">
                  Current Research & Learning Vector
                </span>
                <p className="font-body text-xs text-[#26282C] leading-relaxed">
                  Investigating distributed consensus (Raft/Paxos), WebGPU compute pipeline dispatching, and localized quantization (GGUF/AWQ) for edge AI inference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
