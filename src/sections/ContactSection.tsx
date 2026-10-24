import React, { useState } from 'react'
import { siteConfig } from '../data/siteConfig'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import { MagneticButton } from '../components/ui/MagneticButton'
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  ArrowUp,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com).'
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject line.'
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.'
    }
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')

    try {
      if (siteConfig.contact.endpoint) {
        // Send to configured endpoint
        const res = await fetch(siteConfig.contact.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!res.ok) throw new Error('Submission failed')

        setStatus('success')
        setFeedbackMessage('Message dispatched successfully. Thank you for reaching out!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        // Honest mailto fallback with simulated confirmation
        setTimeout(() => {
          setStatus('success')
          setFeedbackMessage(
            `Thank you, ${formData.name}. Your inquiry has been prepared! You can also reach me directly at ${siteConfig.contact.email}.`
          )
          // Open mailto link
          const mailtoUri = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
            formData.subject
          )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
          )}`
          window.location.href = mailtoUri
        }, 600)
      }
    } catch {
      setStatus('error')
      setFeedbackMessage(
        'An error occurred while transmitting your message. Please reach out directly via email.'
      )
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-[#171717]" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
            Communication // 08
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[1.03] mb-4 sm:mb-6">
            Have something
            <span className="block italic font-medium text-[#26282C]">
              interesting in mind?
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base lg:text-xl text-[#26282C] leading-relaxed font-normal">
            Let's turn a good idea into something real. Open for software engineering internships, collaborative research, and technically ambitious web systems.
          </p>
        </div>

        {/* Split Contact System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Direct Coordinates & Channels (Left) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="editorial-card bg-[#FFFFFF] border border-[#E5E3DE] p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-widest text-[#777773] block mb-4">
                Direct Electronic Mail
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#FAFAF8] border border-[#E5E3DE] mb-6">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#171717] shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-[#171717] font-medium truncate">
                    {siteConfig.contact.email}
                  </span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-mono uppercase bg-[#FFFFFF] border border-[#E5E3DE] hover:border-[#171717] text-[#171717] transition-all focus-visible:ring-2 focus-visible:ring-[#171717]"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#777773]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Profiles */}
              <span className="font-mono text-xs uppercase tracking-widest text-[#777773] block mb-4">
                Professional Repositories & Profiles
              </span>

              <div className="space-y-2.5">
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-3.5 min-h-[44px] bg-[#FAFAF8] border border-[#E5E3DE] hover:border-[#171717] transition-colors group focus-visible:ring-2 focus-visible:ring-[#171717]"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-[#171717]" />
                    <span className="font-mono text-xs text-[#171717] uppercase tracking-wider">
                      GitHub Repositories
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#777773] group-hover:text-[#171717] transition-colors" />
                </a>

                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-3.5 min-h-[44px] bg-[#FAFAF8] border border-[#E5E3DE] hover:border-[#171717] transition-colors group focus-visible:ring-2 focus-visible:ring-[#171717]"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-[#171717]" />
                    <span className="font-mono text-xs text-[#171717] uppercase tracking-wider">
                      LinkedIn Network
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#777773] group-hover:text-[#171717] transition-colors" />
                </a>

                <a
                  href={siteConfig.contact.resumeUrl}
                  className="flex items-center justify-between p-3.5 min-h-[44px] bg-[#FAFAF8] border border-[#E5E3DE] hover:border-[#171717] transition-colors group focus-visible:ring-2 focus-visible:ring-[#171717]"
                  onClick={(e) => {
                    if (siteConfig.contact.resumeUrl === '#contact') {
                      e.preventDefault()
                      alert('Resume is available upon request. Please email directly or use the contact form.')
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#171717]" />
                    <span className="font-mono text-xs text-[#171717] uppercase tracking-wider">
                      Curriculum Vitae / Resume
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777773]">Available on Request</span>
                </a>
              </div>
            </div>

            {/* Timezone & Availability notice */}
            <div className="editorial-card p-5 sm:p-6 bg-[#F3F0E9] border border-[#E5E3DE] flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold block mb-1">
                  Availability & Typical Response Time
                </span>
                <p className="font-body text-xs text-[#777773] leading-relaxed">
                  Located in Mumbai, India (IST / UTC+5:30). Typically responding to project and recruitment inquiries within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Structured Form (Right) */}
          <div className="lg:col-span-7 editorial-card bg-[#FFFFFF] border border-[#E5E3DE] p-6 sm:p-8 lg:p-12 shadow-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#171717] tracking-tight mb-2">
              Send a Transmission
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#777773] mb-6 sm:mb-8">
              Fill in the specification below. If direct backend sync is unconfigured, this securely prepares a formatted draft in your preferred mail client.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono">
                <p className="font-semibold mb-1">Message Prepared</p>
                <p>{feedbackMessage}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-900 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{feedbackMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs uppercase tracking-wider text-[#171717] mb-2"
                  >
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    disabled={status === 'submitting'}
                    className={`w-full px-4 py-3 min-h-[44px] bg-[#FAFAF8] border text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus-visible:ring-2 focus-visible:ring-[#171717] transition-colors ${
                      errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-[#E5E3DE]'
                    }`}
                  />
                  {errors.name && (
                    <span className="block font-mono text-[11px] text-rose-600 mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs uppercase tracking-wider text-[#171717] mb-2"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@studio.com"
                    disabled={status === 'submitting'}
                    className={`w-full px-4 py-3 min-h-[44px] bg-[#FAFAF8] border text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus-visible:ring-2 focus-visible:ring-[#171717] transition-colors ${
                      errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-[#E5E3DE]'
                    }`}
                  />
                  {errors.email && (
                    <span className="block font-mono text-[11px] text-rose-600 mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs uppercase tracking-wider text-[#171717] mb-2"
                >
                  Subject / Inquiry Type <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Summer 2025 Internship / Technical Collaboration"
                  disabled={status === 'submitting'}
                  className={`w-full px-4 py-3 min-h-[44px] bg-[#FAFAF8] border text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus-visible:ring-2 focus-visible:ring-[#171717] transition-colors ${
                    errors.subject ? 'border-rose-500 bg-rose-50/20' : 'border-[#E5E3DE]'
                  }`}
                />
                {errors.subject && (
                  <span className="block font-mono text-[11px] text-rose-600 mt-1">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-[#171717] mb-2"
                >
                  Project Scope / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your team, technology stack, problem domain, or timeline..."
                  disabled={status === 'submitting'}
                  className={`w-full px-4 py-3 bg-[#FAFAF8] border text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus-visible:ring-2 focus-visible:ring-[#171717] transition-colors resize-y ${
                    errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-[#E5E3DE]'
                  }`}
                />
                {errors.message && (
                  <span className="block font-mono text-[11px] text-rose-600 mt-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <MagneticButton>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-widest hover:bg-[#333] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus-visible:ring-2 focus-visible:ring-[#171717]"
                >
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Dispatch Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>
            </form>
          </div>
        </div>

        {/* Back to top & section conclusion prompt */}
        <div className="mt-16 pt-8 border-t border-[#E5E3DE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#777773]">
            <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
            <span>Digital transmission channels open for 2025/2026.</span>
          </div>

          <MagneticButton>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E3DE] bg-[#FFFFFF] hover:border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider transition-colors"
              data-cursor="top"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
