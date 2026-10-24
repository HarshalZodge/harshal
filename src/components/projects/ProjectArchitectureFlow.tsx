import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  type ProjectArchitecture,
  type ArchitectureStage,
} from '../../data/projectArchitectures'
import { soundFx } from '../../lib/soundFx'
import {
  Layers,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Eye,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react'

interface ProjectArchitectureFlowProps {
  architecture: ProjectArchitecture
}

export const ProjectArchitectureFlow: React.FC<ProjectArchitectureFlowProps> = ({ architecture }) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(architecture.stages[0]?.id || '')
  const [isSimulating, setIsSimulating] = useState<boolean>(false)

  const selectedStage =
    architecture.stages.find((s) => s.id === selectedStageId) || architecture.stages[0]

  const handleSelectStage = (stage: ArchitectureStage) => {
    soundFx.playClick()
    setSelectedStageId(stage.id)
  }

  const handleSimulateFlow = () => {
    if (isSimulating) return
    setIsSimulating(true)
    soundFx.playSuccess()

    let index = 0
    setSelectedStageId(architecture.stages[0].id)

    const interval = setInterval(() => {
      index++
      if (index < architecture.stages.length) {
        setSelectedStageId(architecture.stages[index].id)
        soundFx.playClick()
      } else {
        clearInterval(interval)
        setIsSimulating(false)
        soundFx.playSuccess()
      }
    }, 1100)
  }

  const getCategoryIcon = (category: ArchitectureStage['category']) => {
    switch (category) {
      case 'ingestion':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />
      case 'processing':
        return <Cpu className="w-3.5 h-3.5 text-sky-500" />
      case 'model':
        return <Layers className="w-3.5 h-3.5 text-purple-500" />
      case 'explainability':
        return <Eye className="w-3.5 h-3.5 text-emerald-500" />
      case 'storage':
        return <Database className="w-3.5 h-3.5 text-indigo-500" />
      case 'output':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
      default:
        return <Layers className="w-3.5 h-3.5 text-[#777773]" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#13151A] border border-[#E5E3DE] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FAFAF8]">
              {architecture.pipelineTitle}
            </h3>
          </div>
          <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#777773] dark:text-[#A8ADB2]">
            {architecture.paradigm}
          </p>
        </div>

        {/* Live Simulation Trigger Button */}
        <button
          onClick={handleSimulateFlow}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] hover:bg-[#333] dark:hover:bg-white text-xs font-mono font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm shrink-0 disabled:opacity-50"
          title="Simulate data flow traveling through each pipeline stage"
        >
          {isSimulating ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Flow</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Note */}
      <p className="font-body text-xs sm:text-sm text-[#55565B] dark:text-[#A8ADB2] leading-relaxed">
        {architecture.summary}
      </p>

      {/* Interactive Flow Diagram (Horizontal on desktop / vertical on mobile) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#777773]">
            Pipeline Architecture Flow // Click Any Stage to Inspect
          </span>
          <span className="font-mono text-[10px] text-[#777773]">
            {architecture.stages.length} Connected Stages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {architecture.stages.map((stage) => {
            const isSelected = selectedStageId === stage.id

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(stage)}
                className={`relative text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 min-h-[120px] ${
                  isSelected
                    ? 'bg-[#FFFFFF] dark:bg-[#181A22] border-[#171717] dark:border-[#FAFAF8] shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-[#171717] dark:ring-[#FAFAF8]'
                    : 'bg-[#FFFFFF] dark:bg-[#13151A] border-[#E5E3DE] dark:border-white/10 hover:border-[#171717]/40 dark:hover:border-white/30'
                }`}
                aria-pressed={isSelected}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute top-0 left-4 right-4 h-0.5 bg-[#171717] dark:bg-[#FAFAF8] rounded-full"
                  />
                )}

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717]'
                          : 'bg-[#FAFAF8] dark:bg-[#1C1F26] text-[#777773] border border-[#E5E3DE] dark:border-white/10'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#41464B] dark:text-[#A8ADB2]">
                      {stage.techBadge}
                    </span>
                  </div>

                  {getCategoryIcon(stage.category)}
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs sm:text-[13px] text-[#111111] dark:text-[#FAFAF8] leading-snug mb-1">
                    {stage.title}
                  </h4>
                  <p className="font-body text-[11px] text-[#777773] dark:text-[#9CA3AF] line-clamp-2">
                    {stage.shortDesc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Deep-Dive Inspection Panel for Selected Stage */}
      {selectedStage && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#15171C] border border-[#E5E3DE] dark:border-white/10 rounded-xl space-y-5 shadow-sm"
          >
            {/* Stage Title & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E3DE] dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] font-mono font-bold text-xs">
                  STAGE 0{selectedStage.step}
                </span>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FAFAF8]">
                  {selectedStage.title}
                </h4>
              </div>

              <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#171717] dark:text-[#FAFAF8] font-semibold border border-black/5 dark:border-white/10">
                {selectedStage.techBadge}
              </span>
            </div>

            {/* In-Depth Engineering Narrative */}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#777773] mb-1.5">
                Technical Execution
              </span>
              <p className="font-body text-xs sm:text-sm text-[#41464B] dark:text-[#D1D5DB] leading-relaxed">
                {selectedStage.detailedExplanation}
              </p>
            </div>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#FAFAF8] dark:bg-[#0E0F12] border border-[#E5E3DE] dark:border-white/10 rounded-lg">
                <span className="block font-mono text-[9.5px] uppercase tracking-wider text-[#777773] mb-1">
                  Stage Input Tensor / Data
                </span>
                <span className="font-mono text-xs font-semibold text-[#171717] dark:text-[#FAFAF8] break-words">
                  {selectedStage.inputs}
                </span>
              </div>

              <div className="p-3.5 bg-[#FAFAF8] dark:bg-[#0E0F12] border border-[#E5E3DE] dark:border-white/10 rounded-lg">
                <span className="block font-mono text-[9.5px] uppercase tracking-wider text-[#777773] mb-1">
                  Stage Output Format
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 break-words flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedStage.outputs}</span>
                </span>
              </div>
            </div>

            {/* Architectural Rationale & Key Decisions */}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#777773] mb-2">
                Architectural Rationale & Trade-Offs
              </span>
              <ul className="space-y-2">
                {selectedStage.keyDecisions.map((dec, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-[#555] dark:text-[#A8ADB2] font-body"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#171717] dark:text-[#FAFAF8] shrink-0 mt-0.5" />
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
