import React, { useState } from 'react'
import { skillCategories, type SkillCategory, type SkillItem } from '../data/skills'
import { SkillConstellation } from '../components/skills/SkillConstellation'
import { Network, LayoutGrid } from 'lucide-react'

export const SkillsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'constellation' | 'table'>('constellation')
  const [activeTab, setActiveTab] = useState<string>('all')

  const displayedCategories: SkillCategory[] =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c: SkillCategory) => c.id === activeTab)

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#E5E3DE]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#171717]" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
                Capabilities / 03
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Technology & Systems.
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-[#26282C] max-w-xl font-normal">
              Languages, frameworks, and low-level tools applied across actual projects. Honest proficiencies, no arbitrary percentages.
            </p>
          </div>

          {/* View Mode Toggle (Constellation vs Blueprint Table) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F3F0E9] border border-[#E5E3DE] self-start md:self-end">
            <button
              onClick={() => setViewMode('constellation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.14em] transition-all min-h-[36px] ${
                viewMode === 'constellation'
                  ? 'bg-[#171717] text-[#FAFAF8]'
                  : 'text-[#777773] hover:text-[#171717] hover:bg-[#FAFAF8]/50'
              }`}
              data-cursor="orbit"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Constellation</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.14em] transition-all min-h-[36px] ${
                viewMode === 'table'
                  ? 'bg-[#171717] text-[#FAFAF8]'
                  : 'text-[#777773] hover:text-[#171717] hover:bg-[#FAFAF8]/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Structured Grid</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Rendering */}
        {viewMode === 'constellation' ? (
          <SkillConstellation />
        ) : (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8 pb-4 border-b border-[#E5E3DE]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all min-h-[36px] ${
                  activeTab === 'all'
                    ? 'bg-[#171717] text-[#FAFAF8]'
                    : 'text-[#777773] hover:text-[#171717] hover:bg-[#FAFAF8]/50'
                }`}
              >
                All Domains
              </button>
              {skillCategories.map((cat: SkillCategory) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all min-h-[36px] ${
                    activeTab === cat.id
                      ? 'bg-[#171717] text-[#FAFAF8]'
                      : 'text-[#777773] hover:text-[#171717] hover:bg-[#FAFAF8]/50'
                  }`}
                >
                  {cat.title.split(',')[0]}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#E5E3DE]/70 text-[11px] sm:text-xs font-mono text-[#777773]">
              <span className="uppercase tracking-widest font-semibold text-[#171717]">Proficiency Legend:</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#171717]" />
                <span>Proficient (Shipped production code or heavy systems)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#A8ADB2]" />
                <span>Familiar (Active practical usage & integration)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 border border-[#171717] bg-transparent" />
                <span>Exploring (Targeted self-study & benchmarks)</span>
              </div>
            </div>

            {/* Skill Category Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {displayedCategories.map((category: SkillCategory) => (
                <div
                  key={category.id}
                  className="editorial-card bg-[#FFFFFF] border border-[#E5E3DE] p-6 sm:p-8 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E3DE]">
                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#171717]">
                          {category.title}
                        </h3>
                        <p className="font-mono text-[11px] sm:text-xs text-[#777773] mt-1">
                          {category.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#777773]">
                        {category.skills.length} tools
                      </span>
                    </div>

                    <p className="font-body text-xs text-[#777773] mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Skills Table / List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {category.skills.map((skill: SkillItem) => {
                        const statusBadge =
                          skill.status === 'proficient' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#171717]">
                              <span className="w-2 h-2 bg-[#171717]" />
                              Proficient
                            </span>
                          ) : skill.status === 'familiar' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#777773]">
                              <span className="w-2 h-2 bg-[#A8ADB2]" />
                              Familiar
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#777773]">
                              <span className="w-2 h-2 border border-[#171717]" />
                              Exploring
                            </span>
                          )

                        return (
                          <div
                            key={skill.name}
                            className={`p-3 border transition-colors ${
                              skill.highlight
                                ? 'bg-[#FAFAF8] border-[#E5E3DE] hover:border-[#171717]'
                                : 'bg-transparent border-[#E5E3DE]/60 hover:border-[#E5E3DE]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-display font-semibold text-xs sm:text-sm text-[#171717]">
                                {skill.name}
                              </span>
                              {statusBadge}
                            </div>
                            {skill.note && (
                              <p className="font-mono text-[11px] text-[#777773] truncate">
                                {skill.note}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
