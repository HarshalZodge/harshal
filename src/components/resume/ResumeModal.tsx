import React, { useEffect, useState } from 'react'
import { useStudio } from '../../hooks/useStudio'
import { soundFx } from '../../lib/soundFx'
import { siteConfig } from '../../data/siteConfig'
import { Printer, Copy, X, Check, ExternalLink } from 'lucide-react'

export const ResumeModal: React.FC = () => {
  const { resumeOpen: isOpen, closeResume: onClose } = useStudio()
  const [copied, setCopied] = useState(false)

  // Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePrint = () => {
    soundFx.playClick()
    window.print()
  }

  const handleCopyText = () => {
    const textResume = `
HARSHAL DEEPAK ZODGE
Software Developer & AI Engineer | Computer Engineering Undergrad
Location: Ahilyanagar / Pune, Maharashtra, India
Email: ${siteConfig.contact.email}
GitHub: ${siteConfig.contact.github}
LinkedIn: ${siteConfig.contact.linkedin}

PROFILE:
${siteConfig.identity.primaryTagline}
${siteConfig.identity.supportingStatement}

TECHNICAL EXPERTISE:
- AI & Machine Learning: Python, TensorFlow / Keras, CNN Image Classification, Grad-CAM Heatmaps, LangGraph Multi-Agent Workflows, Gemini 1.5 Pro, FAISS Vector Search, n8n Automation
- Backend & Cloud: Node.js, Express.js, MongoDB Atlas, RESTful APIs, Flask, Apache Hadoop HDFS Distributed Storage
- Full-Stack Web Development: React 19, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS v4, Responsive Component Architecture
- Graphics & Interactive: WebGL2, Three.js, Custom GLSL Shaders, Procedural Web Audio, 60 FPS GPU-Accelerated Layouts
- Tooling & Platforms: Git, GitHub, Docker, Postman, Linux, Vite 8, Streamlit

FEATURED SYSTEMS:
1. CurrencyVision AI — CNN Indian Currency Recognition with Grad-CAM Visual Heatmaps & Streamlit
2. CareerPilot AI — Autonomous Multi-Agent Career Advisory Platform Orchestrated with LangGraph
3. Crime Record Management System — Secure Backend Infrastructure with MongoDB Atlas Persistence
4. MiniCloud HDFS SaaS — Private Cloud Distributed Storage Solution over Apache Hadoop & Python/Flask
5. Full-Stack Applications — Blinkit-Inspired Quick Commerce Storefront & Netflix UI Streaming Clone

VERIFIED CREDENTIALS:
1. Oracle Certified Foundations Associate — Agentic AI (Oracle University, 2026–2028, ID: 330673475AAI26OFA)
2. Full Stack Development Mentorship (Pregrad, Aug–Nov 2025, ID: AF225AB0B8A5)
3. Artificial Intelligence with ML Mentorship (Pregrad, Completed Aug 2026, ID: PREG-37C1B69290D3)
4. n8n: No-Code AI Agent Builder (Simplilearn SkillUp, Dec 2025, ID: 9636571)
5. Web Development Basics (IBM SkillsBuild, ALM-COURSE_4058937)

EDUCATION:
Bachelor of Engineering in Computer Engineering (2023 — 2027)
Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar
Savitribai Phule Pune University (SPPU)
`.trim()

    navigator.clipboard.writeText(textResume)
    setCopied(true)
    soundFx.playSuccess()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#171717]/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Swiss Modernist Curriculum Vitae"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#FFFFFF] border border-[#E5E3DE] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-[#FAFAF8] border-b border-[#E5E3DE] print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-[#777773]">
            <span className="w-2 h-2 bg-[#171717]" />
            <span className="uppercase tracking-widest font-semibold text-[#171717]">
              Swiss Modernist CV // Edition 2025-2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E3DE] hover:border-[#171717] text-xs font-mono text-[#171717] transition-colors"
              title="Copy plain text CV to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#777773]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#777773] hover:text-[#171717] transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-resume"
          className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 font-body text-[#171717] bg-[#FFFFFF] selection:bg-[#171717] selection:text-[#FFFFFF]"
        >
          {/* Header Block: Swiss Typographic Grid */}
          <div className="pb-8 border-b-2 border-[#171717]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#171717]">
                  {siteConfig.identity.name}
                </h1>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#777773] mt-1.5">
                  {siteConfig.identity.role} • {siteConfig.identity.location}
                </p>
              </div>

              {/* Direct Coordinate Links */}
              <div className="flex flex-col sm:items-end font-mono text-xs text-[#777773] space-y-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#171717] transition-colors underline"
                >
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-center gap-3 pt-0.5">
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>/</span>
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Core Mission Editorial Statement */}
            <p className="mt-4 text-xs sm:text-sm text-[#41464B] max-w-2xl font-body leading-relaxed">
              {siteConfig.identity.primaryTagline} {siteConfig.identity.supportingStatement}
            </p>
          </div>

          {/* Section 1: Technical Mastery Matrix */}
          <div className="py-6 sm:py-8 border-b border-[#E5E3DE]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#777773] mb-4">
              01 // Technical Domains & Stacks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs">
              <div>
                <div className="font-display font-semibold text-[#171717] pb-1 border-b border-[#E5E3DE]">
                  AI & Intelligent Systems
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] text-[#777773]">
                  <li>Python (TensorFlow / Keras)</li>
                  <li>CNN Image Classification</li>
                  <li>Grad-CAM Visual Heatmaps</li>
                  <li>LangGraph Multi-Agent Workflows</li>
                  <li>Gemini 1.5 Pro & FAISS</li>
                </ul>
              </div>

              <div>
                <div className="font-display font-semibold text-[#171717] pb-1 border-b border-[#E5E3DE]">
                  Backend & Distributed Data
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] text-[#777773]">
                  <li>Node.js & Express.js</li>
                  <li>MongoDB & MongoDB Atlas</li>
                  <li>RESTful Microservices</li>
                  <li>Apache Hadoop HDFS</li>
                  <li>Python / Flask WebHDFS</li>
                </ul>
              </div>

              <div>
                <div className="font-display font-semibold text-[#171717] pb-1 border-b border-[#E5E3DE]">
                  Full-Stack Architecture
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] text-[#777773]">
                  <li>TypeScript (Strict)</li>
                  <li>React 19 & JavaScript ES6+</li>
                  <li>Tailwind CSS v4</li>
                  <li>Responsive Storefront Design</li>
                  <li>State & Context Architecture</li>
                </ul>
              </div>

              <div>
                <div className="font-display font-semibold text-[#171717] pb-1 border-b border-[#E5E3DE]">
                  Graphics, Tooling & Workflow
                </div>
                <ul className="mt-2 space-y-1 font-mono text-[11px] text-[#777773]">
                  <li>WebGL2 / Three.js / GLSL</li>
                  <li>n8n No-Code Workflow Builder</li>
                  <li>Docker & Linux Fundamentals</li>
                  <li>Git / GitHub Collaboration</li>
                  <li>Vite 8 & 60 FPS Profiling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Selected Production Systems */}
          <div className="py-6 sm:py-8 border-b border-[#E5E3DE]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#777773] mb-4">
              02 // Featured Production Systems & Case Studies
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#171717]">
                    CurrencyVision AI — CNN Currency Classifier with Grad-CAM
                  </h3>
                  <span className="font-mono text-[10px] text-[#777773]">Python • CNN • Grad-CAM • Streamlit</span>
                </div>
                <p className="mt-1.5 text-xs text-[#41464B] leading-relaxed">
                  Engineered an end-to-end computer vision pipeline classifying Indian bank notes using a custom 4-block Convolutional Neural Network with Batch Normalization and Dropout. Integrated Grad-CAM explainability heatmaps and real-time webcam scanning.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#171717]">
                    CareerPilot AI — Multi-Agent Career Advisory StateGraph
                  </h3>
                  <span className="font-mono text-[10px] text-[#777773]">LangGraph • Python • Gemini 1.5 • FAISS</span>
                </div>
                <p className="mt-1.5 text-xs text-[#41464B] leading-relaxed">
                  Architected a cyclical multi-agent graph with Supervisor orchestration, ATS resume diagnostic, job vector matching via FAISS embeddings, and interactive mock interview coaching using Google Gemini 1.5 Pro.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#171717]">
                    Crime Record Management System — Secure Backend Infrastructure
                  </h3>
                  <span className="font-mono text-[10px] text-[#777773]">Node.js • Express • MongoDB Atlas • REST API</span>
                </div>
                <p className="mt-1.5 text-xs text-[#41464B] leading-relaxed">
                  Implemented a structured backend service for law enforcement records with persistent cloud database storage on MongoDB Atlas, schema validation, multi-parameter query filtering, and secure CRUD operations.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#171717]">
                    MiniCloud Private Cloud HDFS — Distributed Storage Solution
                  </h3>
                  <span className="font-mono text-[10px] text-[#777773]">Apache Hadoop HDFS • Flask • WebHDFS • Python</span>
                </div>
                <p className="mt-1.5 text-xs text-[#41464B] leading-relaxed">
                  Constructed a self-hosted cloud storage SaaS with real-time replication and fault tolerance across nodes using Apache Hadoop HDFS and custom Python Flask WebHDFS controllers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Verified Industry Credentials & Mentorships */}
          <div className="py-6 sm:py-8 border-b border-[#E5E3DE]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#777773] mb-4">
              03 // Verified Industry Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE]">
                <div className="font-display font-bold text-[#171717]">
                  Oracle Certified Foundations Associate — Agentic AI
                </div>
                <div className="font-mono text-[10px] text-[#777773] mt-0.5">
                  Oracle University • Aug 2026 – Aug 2028 • ID: 330673475AAI26OFA
                </div>
                <p className="font-body text-[11px] text-[#41464B] mt-1">
                  Validated expertise in autonomous agents, LLM architectures, tool-calling loops, and enterprise AI agent orchestration.
                </p>
              </div>

              <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE]">
                <div className="font-display font-bold text-[#171717]">
                  Full Stack Development Mentorship (3 Months)
                </div>
                <div className="font-mono text-[10px] text-[#777773] mt-0.5">
                  Pregrad • Aug–Nov 2025 • ID: AF225AB0B8A5
                </div>
                <p className="font-body text-[11px] text-[#41464B] mt-1">
                  Comprehensive engineering mentorship covering modern React, JavaScript/TypeScript, backend services, and production web deployment.
                </p>
              </div>

              <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE]">
                <div className="font-display font-bold text-[#171717]">
                  Artificial Intelligence with ML Mentorship (3 Months)
                </div>
                <div className="font-mono text-[10px] text-[#777773] mt-0.5">
                  Pregrad • Completed Aug 2026 • ID: PREG-37C1B69290D3
                </div>
                <p className="font-body text-[11px] text-[#41464B] mt-1">
                  Applied machine learning algorithms, deep neural network architectures, model evaluation, and computer vision pipelines.
                </p>
              </div>

              <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE]">
                <div className="font-display font-bold text-[#171717]">
                  n8n: No-Code AI Agent Builder & Web Development
                </div>
                <div className="font-mono text-[10px] text-[#777773] mt-0.5">
                  Simplilearn SkillUp (Dec 2025) & IBM SkillsBuild (Mar 2026)
                </div>
                <p className="font-body text-[11px] text-[#41464B] mt-1">
                  Automated agentic workflow integrations with n8n and foundational web architectures from IBM SkillsBuild.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Academic Background & Principles */}
          <div className="py-6 sm:py-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#777773] mb-4">
              04 // Academic Trajectory & Engineering Tenets
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 text-xs">
              <div>
                <h3 className="font-display font-bold text-sm text-[#171717]">
                  Bachelor of Engineering in Computer Engineering
                </h3>
                <p className="font-mono text-[11px] text-[#777773] mt-0.5">
                  Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar (SPPU) • 2023 — 2027
                </p>
                <p className="mt-1.5 text-xs text-[#41464B] leading-relaxed max-w-lg">
                  Third-year undergraduate affiliated with Savitribai Phule Pune University (SPPU). Focus on software systems architecture, applied machine learning, computer vision, and backend database design.
                </p>
              </div>

              <div className="p-3 bg-[#FAFAF8] border border-[#E5E3DE] sm:max-w-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777773] block mb-1">
                  Core Engineering Principles
                </span>
                <p className="font-mono text-[11px] text-[#171717] leading-relaxed">
                  • Verified functionality over exaggerated claims.<br />
                  • 60 FPS baseline for fluid digital experiences.<br />
                  • Clean modular architecture & strict type safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
