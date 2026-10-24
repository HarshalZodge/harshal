import React, { useState, useMemo } from 'react'
import { certificates, type Certificate } from '../data/certificates'
import { CertificateCard } from '../components/certificates/CertificateCard'
import { CertificateModal } from '../components/certificates/CertificateModal'
import { Award, ShieldCheck, ExternalLink, Filter, CheckCircle2 } from 'lucide-react'

export const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null)

  const categories = useMemo(() => {
    const list = [
      { id: 'all', label: 'All Credentials', count: certificates.length },
      { id: 'AI & Autonomous Agents', label: 'AI & Autonomous Agents', count: certificates.filter(c => c.category === 'AI & Autonomous Agents').length },
      { id: 'Full-Stack & Web', label: 'Full-Stack & Web', count: certificates.filter(c => c.category === 'Full-Stack & Web').length },
      { id: 'Cloud & Distributed Systems', label: 'Cloud & Distributed Systems', count: certificates.filter(c => c.category === 'Cloud & Distributed Systems').length },
      { id: 'Data & Analytics', label: 'Data & Analytics', count: certificates.filter(c => c.category === 'Data & Analytics').length },
    ]
    return list.filter(item => item.id === 'all' || item.count > 0)
  }, [])

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'all') return certificates
    return certificates.filter((c) => c.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-28 lg:py-32 studio-section-surface border-b border-[#E5E3DE]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16 pb-8 border-b border-[#E5E3DE]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#171717]" />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#333438]">
                Credentials & Professional Learning // 05
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
              Certifications & learning.
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-[#26282C] max-w-2xl font-normal">
              Official industry credentials and intensive industrial mentorships spanning Agentic AI, full-stack systems engineering, no-code automation, and data analytics.
            </p>
          </div>

          {/* Verification Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 lg:self-end">
            <div className="flex items-center gap-3 p-3 bg-[#FFFFFF] dark:bg-[#15171C] border border-[#E5E3DE] dark:border-[#22252C] shadow-sm">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-mono font-bold text-base text-[#111111] dark:text-[#FAFAF8]">
                  {certificates.length} Verified Credentials
                </span>
                <span className="block text-[10px] font-mono text-[#777773] uppercase tracking-wider">
                  Oracle • Pregrad • IBM • Microsoft • Simplilearn • IEEE
                </span>
              </div>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1Ebd8D5HbSHZ2Lkt5kmtMcY8IMGmHYI3f?usp=sharing"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#F3F0E9] hover:bg-[#EAE6DE] dark:bg-[#1E2129] dark:hover:bg-[#282C37] border border-[#E5E3DE] dark:border-[#262A34] text-xs font-mono uppercase tracking-wider text-[#171717] dark:text-[#FAFAF8] transition-colors"
              title="Inspect Original Document Vault on Google Drive"
            >
              <Award className="w-4 h-4 text-[#777773]" />
              <span>Drive Vault</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#777773]" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-all min-h-[36px] ${
                  isActive
                    ? 'bg-[#171717] text-[#FAFAF8] shadow-sm'
                    : 'bg-[#FFFFFF] dark:bg-[#16181F] text-[#41464B] dark:text-[#A8ADB2] border border-[#E5E3DE] dark:border-[#22252C] hover:border-[#171717] dark:hover:border-[#FAFAF8]'
                }`}
                aria-pressed={isActive}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#333333] text-[#FAFAF8]' : 'bg-[#E5E3DE] dark:bg-[#22252C] text-[#555] dark:text-[#AAA]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onView={(c) => setActiveCertificate(c)}
            />
          ))}
        </div>

        {/* Footer Trust Callout */}
        <div className="mt-14 p-6 bg-[#FFFFFF] dark:bg-[#121418] border border-[#E5E3DE] dark:border-[#22252C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="font-display font-semibold text-xs sm:text-sm text-[#111111] dark:text-[#FAFAF8]">
                Authenticity & Integrity Commitment
              </p>
              <p className="font-body text-xs text-[#777773] mt-0.5">
                All certificates, issuance dates, programs, and credential IDs correspond directly to verified institutional documentation.
              </p>
            </div>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1Ebd8D5HbSHZ2Lkt5kmtMcY8IMGmHYI3f?usp=sharing"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors shrink-0"
          >
            <span>Verify Document Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox / Viewer Modal */}
      <CertificateModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </section>
  )
}
