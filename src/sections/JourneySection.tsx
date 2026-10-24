import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { journeyMilestones, type JourneyMilestone } from '../data/journey'
import { GraduationCap, Trophy, Milestone, Users } from 'lucide-react'

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress across the journey section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#171717]" />
      case 'hackathon':
        return <Trophy className="w-4 h-4 text-[#171717]" />
      case 'leadership':
        return <Users className="w-4 h-4 text-[#171717]" />
      default:
        return <Milestone className="w-4 h-4 text-[#171717]" />
    }
  }

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 pb-8 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#171717]" />
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
              Chronology // 06
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
            Academic & Technical Milestones.
          </h2>
          <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-[#26282C] max-w-xl font-normal">
            A chronological timeline of university education, hackathons, and self-directed engineering breakthroughs.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Static Vertical Hairline Axis (768px+) */}
          <div className="hidden md:block absolute left-[180px] top-6 bottom-6 w-[1.5px] bg-[#E5E3DE]" />

          {/* Dynamic Scroll-Drawn Axis Line */}
          <motion.div
            style={{ scaleY }}
            className="hidden md:block absolute left-[180px] top-6 bottom-6 w-[2px] bg-[#171717] origin-top z-10"
          />

          <div className="space-y-8 sm:space-y-12">
            {journeyMilestones.map((milestone: JourneyMilestone, index: number) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start group"
              >
                {/* Left Date / Period Column */}
                <div className="md:col-span-2 md:text-right pt-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold block">
                    {milestone.period}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#777773] mt-1 block">
                    {milestone.category}
                  </span>
                </div>

                {/* Center Node Marker (Desktop) with Pulse */}
                <div className="hidden md:flex absolute left-[174px] top-1.5 w-3.5 h-3.5 bg-[#FAFAF8] border-2 border-[#171717] items-center justify-center group-hover:bg-[#171717] transition-all z-20 group-hover:scale-125">
                  <span className="w-1 h-1 bg-[#171717] group-hover:bg-[#FAFAF8]" />
                </div>

                {/* Right Card / Content Block */}
                <div className="md:col-span-9 editorial-card bg-[#FAFAF8] border border-[#E5E3DE] p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E5E3DE]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-[#FFFFFF] border border-[#E5E3DE]">
                        {getCategoryIcon(milestone.category)}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#171717]">
                        {milestone.title}
                      </h3>
                    </div>

                    {milestone.organization && (
                      <span className="font-mono text-[11px] sm:text-xs text-[#777773]">
                        {milestone.organization}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#26282C] leading-relaxed mb-4">
                    {milestone.summary}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {milestone.bullets.map((bullet: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 font-body text-xs text-[#383A3E]">
                        <span className="w-1.5 h-1.5 bg-[#171717] shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {milestone.technologies && milestone.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E5E3DE]">
                      {milestone.technologies.map((t: string) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E3DE] text-[10px] font-mono text-[#111111] font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
