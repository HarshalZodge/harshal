import React, { useState, useMemo } from 'react'
import { projects, type Project } from '../data/projects'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal'
import { TiltCard } from '../components/projects/TiltCard'
import { MagneticButton } from '../components/ui/MagneticButton'
import { GithubIcon } from '../components/ui/Icons'
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react'

export const SelectedWorkSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All Projects', count: projects.length },
      { id: 'ai-ml', label: 'AI / ML', count: projects.filter(p => p.filterCategory === 'ai-ml').length },
      { id: 'ai-agents', label: 'AI Agents', count: projects.filter(p => p.filterCategory === 'ai-agents').length },
      { id: 'fullstack', label: 'Full-Stack Development', count: projects.filter(p => p.filterCategory === 'fullstack').length },
      { id: 'backend-db', label: 'Backend & Databases', count: projects.filter(p => p.filterCategory === 'backend-db').length },
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects
    return projects.filter((p: Project) => p.filterCategory === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#E5E3DE]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#171717]" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
                Engineering Showcase // 04
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Featured projects.
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-[#26282C] max-w-2xl font-normal">
              Autonomous AI agents, deep convolutional vision architectures, persistent cloud backends, and responsive quick-commerce web systems.
            </p>
          </div>

          {/* Animated Category Filter Pills (Responsive scroll on small screens) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3F0E9] border border-[#E5E3DE] self-start md:self-end">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-all min-h-[36px] ${
                    isActive
                      ? 'bg-[#171717] text-[#FAFAF8] shadow-sm'
                      : 'text-[#41464B] hover:text-[#171717] hover:bg-[#FAFAF8]/60'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#333333] text-[#FAFAF8]' : 'bg-[#E5E3DE] text-[#555]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-[#E5E3DE] bg-[#FFFFFF] p-8">
            <Code2 className="w-8 h-8 mx-auto text-[#777773] mb-3" />
            <h3 className="font-display font-bold text-lg text-[#111111] mb-1">No projects in this category</h3>
            <p className="font-body text-xs text-[#777773] mb-4">Reset filter to inspect all engineered systems.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Editorial Layout: Asymmetric compositions */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project: Project, index: number) => {
            const isEven = index % 2 === 0
            const isFeaturedHero = index === 0 && selectedCategory === 'all'

            if (isFeaturedHero) {
              // Large Lead Feature Project
              return (
                <TiltCard
                  key={project.id}
                  data-cursor="view"
                  className="editorial-card group bg-[#FFFFFF] border border-[#E5E3DE] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm"
                >
                  {/* Visual Side */}
                  <div className="lg:col-span-7 h-64 sm:h-80 md:h-96 lg:h-[460px] border-b lg:border-b-0 lg:border-r border-[#E5E3DE] overflow-hidden">
                    <ProjectVisual project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  </div>

                  {/* Content Side */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#777773] mb-3 sm:mb-4">
                        <span className="uppercase tracking-widest font-semibold text-[#171717]">{project.category}</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#171717] tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#41464B] font-semibold mb-3 sm:mb-4">
                        {project.subtitle}
                      </p>

                      <p className="font-body text-xs sm:text-sm text-[#55565B] leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                        {project.technologies.slice(0, 5).map((t: string) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-[#FAFAF8] border border-[#E5E3DE] text-[10px] sm:text-[11px] font-mono text-[#171717] font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E3DE]">
                      <MagneticButton>
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[40px] bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                          aria-label={`View detailed specifications for ${project.title}`}
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </MagneticButton>

                      {project.githubUrl && (
                        <MagneticButton>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] bg-transparent border border-[#E5E3DE] hover:border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                            aria-label={`Inspect source repository for ${project.title}`}
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Source Code</span>
                          </a>
                        </MagneticButton>
                      )}

                      {project.liveUrl && (
                        <MagneticButton>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] bg-transparent border border-[#E5E3DE] hover:border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                            aria-label={`Launch live system for ${project.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </TiltCard>
              )
            }

            // Alternating editorial items
            return (
              <TiltCard
                key={project.id}
                data-cursor="view"
                className="editorial-card group bg-[#FFFFFF] border border-[#E5E3DE] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm"
              >
                {/* Responsive order: alternate visual left/right on desktop */}
                <div
                  className={`lg:col-span-6 h-60 sm:h-72 md:h-80 lg:h-[390px] overflow-hidden ${
                    isEven
                      ? 'order-1 lg:order-1 border-b lg:border-b-0 lg:border-r border-[#E5E3DE]'
                      : 'order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-[#E5E3DE]'
                  }`}
                >
                  <ProjectVisual project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>

                <div
                  className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                    isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#333438] mb-3 sm:mb-4">
                      <span className="uppercase tracking-widest font-semibold text-[#171717]">{project.category}</span>
                      <span className="font-semibold">{project.year}</span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#111111] font-semibold mb-3">
                      {project.subtitle}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-[#4A4B50] leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                      {project.technologies.slice(0, 5).map((t: string) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-[#FAFAF8] border border-[#E5E3DE] text-[10px] sm:text-[11px] font-mono text-[#111111] font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E3DE]">
                    <MagneticButton>
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[40px] bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                        aria-label={`View detailed specifications for ${project.title}`}
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </MagneticButton>

                    {project.githubUrl && (
                      <MagneticButton>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] bg-transparent border border-[#E5E3DE] hover:border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                          aria-label={`Inspect source repository for ${project.title}`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      </MagneticButton>
                    )}

                    {project.liveUrl && (
                      <MagneticButton>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] bg-transparent border border-[#E5E3DE] hover:border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
                          aria-label={`Launch live system for ${project.title}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  )
}
