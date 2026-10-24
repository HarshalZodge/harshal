import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Send, Sparkles, Bot, Trash2, ArrowUpRight, ExternalLink } from 'lucide-react'
import { queryHarshalAi, type HarshalAiMessage } from '../../lib/harshalAiEngine'
import { soundFx } from '../../lib/soundFx'

const INITIAL_MESSAGE: HarshalAiMessage = {
  id: 'init-1',
  sender: 'assistant',
  text: `Hello! I'm **Harshal AI**, the interactive digital twin and conversational copilot for **Harshal Deepak Zodge**.

I can answer any questions about Harshal's:
• **Autonomous AI Agent & LangGraph systems**
• **Computer Vision & CNN implementations (CurrencyVision AI)**
• **Full-stack web & backend architectures (Node.js, Express, MongoDB Atlas, React)**
• **10 Verified industry certifications** (including Oracle Agentic AI)
• **Availability for 2025/2026 internships & engineering roles**

Feel free to ask me anything in your own words!`,
  timestamp: 'Just now',
  suggestions: [
    'Tell me about your AI Agent projects',
    'What is CurrencyVision AI?',
    'What certifications do you hold?',
    'Are you available for hiring?',
  ],
}

export const HarshalAiModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<HarshalAiMessage[]>([INITIAL_MESSAGE])
  const [inputQuery, setInputQuery] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Listen for open events from navbar, command palette, or buttons
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      soundFx.playClick()
    }
    window.addEventListener('studio:open-harshal-ai', handleOpen)
    return () => window.removeEventListener('studio:open-harshal-ai', handleOpen)
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSend = useCallback((queryToSend?: string) => {
    const q = (queryToSend ?? inputQuery).trim()
    if (!q) return

    soundFx.playClick()
    const now = new Date()
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const userMsg: HarshalAiMessage = {
      id: `user-${now.getTime()}`,
      sender: 'user',
      text: q,
      timestamp: timeFormatted,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsTyping(true)

    // Simulate conversational typing delay (350ms - 600ms)
    setTimeout(() => {
      const response = queryHarshalAi(q)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
      soundFx.playHover()
    }, 450)
  }, [inputQuery])

  const handleClearChat = () => {
    soundFx.playClick()
    setMessages([INITIAL_MESSAGE])
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-[#171717]/60 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="harshal-ai-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl h-[90vh] sm:h-[680px] max-h-[92vh] flex flex-col bg-[#FAFAF8] dark:bg-[#0E0F12] border border-[#E5E3DE] dark:border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.3)] rounded-t-2xl sm:rounded-2xl overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FFFFFF]/90 dark:bg-[#14161C]/90 backdrop-blur-xl border-b border-[#E5E3DE] dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-400 p-[1.5px] shadow-sm">
              <div className="w-full h-full rounded-full bg-[#171717] flex items-center justify-center text-white">
                <Bot className="w-4 h-4 text-purple-300 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="harshal-ai-title" className="font-display font-bold text-sm text-[#171717] dark:text-[#FAFAF8]">
                  Harshal AI Copilot
                </h2>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold border border-emerald-500/20">
                  Online
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#777773] dark:text-[#A8ADB2]">
                Interactive Digital Twin • Oracle Certified Agentic AI Knowledge Base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-2 text-[#777773] hover:text-[#171717] dark:hover:text-[#FAFAF8] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#777773] hover:text-[#171717] dark:hover:text-[#FAFAF8] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              title="Close Harshal AI (Esc)"
              aria-label="Close Harshal AI modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread Scroll Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user'

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[82%]">
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] flex items-center justify-center text-[9px] font-bold shrink-0 mb-1">
                      HZ
                    </div>
                  )}

                  <div
                    className={`px-4 py-3 text-xs sm:text-[13px] leading-relaxed ${
                      isUser
                        ? 'bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] rounded-2xl rounded-br-sm font-body shadow-sm'
                        : 'bg-[#FFFFFF] dark:bg-[#16181F] text-[#24262A] dark:text-[#E2E4E8] border border-[#E5E3DE] dark:border-white/10 rounded-2xl rounded-bl-sm font-body shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line space-y-1">
                      {msg.text.split('\n').map((line, idx) => {
                        // Basic bold parsing for markdown
                        const parts = line.split(/(\*\*.*?\*\*)/g)
                        return (
                          <p key={idx}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-semibold text-[#111] dark:text-white">
                                    {part.slice(2, -2)}
                                  </strong>
                                )
                              }
                              return part
                            })}
                          </p>
                        )
                      })}
                    </div>

                    {/* Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-black/5 dark:border-white/10">
                        {msg.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            onClick={() => {
                              if (!link.external) setIsOpen(false)
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#171717] dark:text-[#FAFAF8] rounded-full text-[10px] font-mono font-medium transition-colors"
                          >
                            <span>{link.label}</span>
                            {link.external ? (
                              <ExternalLink className="w-2.5 h-2.5" />
                            ) : (
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2.5 pl-8 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#16181F] border border-[#E5E3DE] dark:border-white/10 hover:border-[#171717] dark:hover:border-white/30 text-[10.5px] font-mono text-[#555] dark:text-[#AAA] hover:text-[#171717] dark:hover:text-[#FAFAF8] rounded-full transition-all"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 pl-8">
              <div className="flex items-center gap-1 px-3 py-2 bg-[#FFFFFF] dark:bg-[#16181F] border border-[#E5E3DE] dark:border-white/10 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] font-mono text-[#777773]">Harshal AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Dock */}
        <div className="p-3 sm:p-4 bg-[#FFFFFF]/90 dark:bg-[#14161C]/90 backdrop-blur-xl border-t border-[#E5E3DE] dark:border-white/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about Harshal's AI projects, stack, or hiring..."
              className="flex-1 px-4 py-2.5 bg-[#FAFAF8] dark:bg-[#0D0E11] border border-[#E5E3DE] dark:border-white/10 focus:border-[#171717] dark:focus:border-white/30 rounded-full text-xs font-mono text-[#171717] dark:text-[#FAFAF8] placeholder-[#777773] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-4 py-2.5 bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] disabled:opacity-40 rounded-full font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#333] dark:hover:bg-white transition-colors shrink-0 shadow-sm"
              aria-label="Send question to Harshal AI"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[9.5px] font-mono text-[#999] dark:text-[#666]">
              Trained on verified source code, architecture records & verified credentials.
            </span>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
