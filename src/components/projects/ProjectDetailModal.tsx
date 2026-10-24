import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../data/projects'
import { ProjectVisual } from './ProjectVisual'
import { GithubIcon } from '../ui/Icons'
import { X, ExternalLink, Layers, Cpu, Calendar, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent background scrolling
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  if (!project) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#171717]/65 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAFAF8] dark:bg-[#0E0F12] border border-[#E5E3DE] dark:border-[#22252C] shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 bg-[#FAFAF8]/95 dark:bg-[#0E0F12]/95 backdrop-blur-md border-b border-[#E5E3DE] dark:border-[#22252C]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#171717] dark:bg-[#FAFAF8]" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#777773]">
              Project Specification // {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#777773] hover:text-[#171717] dark:hover:text-[#FAFAF8] hover:bg-[#E5E3DE]/50 dark:hover:bg-[#1E2129] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Banner */}
        <div className="w-full h-56 sm:h-72 md:h-80 border-b border-[#E5E3DE] dark:border-[#22252C]">
          <ProjectVisual project={project} className="w-full h-full" />
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 md:p-10">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#777773] mb-4 pb-4 border-b border-[#E5E3DE] dark:border-[#22252C]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.year}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Role: {project.role}</span>
            </span>
          </div>

          {/* Title and Subtitle */}
          <h2
            id="modal-title"
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111111] dark:text-[#FAFAF8] tracking-tight mb-2"
          >
            {project.title}
          </h2>
          <p className="font-body text-xs sm:text-sm md:text-base text-[#41464B] dark:text-[#A8ADB2] font-medium mb-6">
            {project.subtitle}
          </p>

          {/* Core Description Overview */}
          <div className="font-body text-xs sm:text-sm md:text-base text-[#55565B] dark:text-[#A8ADB2] leading-relaxed mb-8">
            <p>{project.description}</p>
          </div>

          {/* Metrics Grid (if present) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3.5 bg-[#FFFFFF] dark:bg-[#15171C] border border-[#E5E3DE] dark:border-[#242730]">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777773] mb-1">
                    {m.label}
                  </span>
                  <span className="block font-mono font-bold text-sm sm:text-base text-[#111111] dark:text-[#FAFAF8]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Problem Statement & Objective */}
          {project.problemStatement && (
            <div className="mb-8 p-5 sm:p-6 bg-[#F3F0E9]/60 dark:bg-[#16181F]/70 border border-[#E5E3DE] dark:border-[#242730]">
              <h3 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#171717] dark:text-[#FAFAF8] mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Problem Statement & Technical Objective</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#41464B] dark:text-[#A8ADB2] font-body leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          )}

          {/* Features Actually Implemented */}
          {project.features && project.features.length > 0 && (
            <div className="mb-8 p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#13151A] border border-[#E5E3DE] dark:border-[#242730]">
              <h3 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#171717] dark:text-[#FAFAF8] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Capabilities & Implemented Features</span>
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#41464B] dark:text-[#D1D5DB] font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architectural Specifications */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="mb-8 p-5 sm:p-6 bg-[#F3F0E9]/40 dark:bg-[#16181F]/40 border border-[#E5E3DE] dark:border-[#242730]">
              <h3 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#171717] dark:text-[#FAFAF8] mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#171717] dark:text-[#FAFAF8]" />
                <span>System Architecture & Engineering Decisions</span>
              </h3>
              <ul className="space-y-2.5">
                {project.architectureHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#41464B] dark:text-[#A8ADB2] font-body">
                    <span className="w-1.5 h-1.5 bg-[#171717] dark:bg-[#FAFAF8] shrink-0 mt-2" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Improvements & Limitations */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <div className="mb-8 p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#13151A] border border-[#E5E3DE] dark:border-[#242730]">
              <h3 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#777773] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Planned Future Improvements & Scope Expansion</span>
              </h3>
              <ul className="space-y-2">
                {project.futureImprovements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#777773] dark:text-[#9CA3AF] font-body">
                    <span className="text-[10px] font-mono text-indigo-500 mt-0.5">↳</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack Tags */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#777773] mb-3">
              Verified Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#16181F] border border-[#E5E3DE] dark:border-[#242730] text-[11px] sm:text-xs font-mono text-[#171717] dark:text-[#FAFAF8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E3DE] dark:border-[#22252C]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 bg-[#FFFFFF] dark:bg-[#16181F] border border-[#E5E3DE] dark:border-[#242730] text-[#171717] dark:text-[#FAFAF8] hover:border-[#171717] dark:hover:border-[#FAFAF8] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch System</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
