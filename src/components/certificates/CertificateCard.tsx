import React, { useState } from 'react'
import type { Certificate } from '../../data/certificates'
import { TiltCard } from '../projects/TiltCard'
import { Award, Calendar, Copy, Check, FileText, ArrowUpRight, ShieldCheck } from 'lucide-react'

interface CertificateCardProps {
  certificate: Certificate
  onView: (cert: Certificate) => void
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onView }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!certificate.credentialId) return
    navigator.clipboard.writeText(certificate.credentialId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TiltCard
      data-cursor="inspect"
      className="editorial-card group bg-[#FFFFFF] dark:bg-[#121418] border border-[#E5E3DE] dark:border-[#22252C] flex flex-col justify-between p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-[#171717] dark:hover:border-[#FAFAF8]"
    >
      <div>
        {/* Top Header Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E3DE] dark:border-[#22252C]">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 border"
              style={{
                borderColor: certificate.badgeColor || '#171717',
                color: certificate.badgeColor || '#171717',
                backgroundColor: `${certificate.badgeColor || '#171717'}0D`,
              }}
            >
              {certificate.issuerBadge}
            </span>
            <span className="text-[10px] font-mono text-[#777773] uppercase tracking-wider">
              {certificate.category}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Certificate Title */}
        <h3 className="font-display font-bold text-lg sm:text-xl text-[#111111] dark:text-[#FAFAF8] tracking-tight mb-2 group-hover:text-black transition-colors">
          {certificate.title}
        </h3>

        {/* Issuing Body & Dates */}
        <div className="space-y-1 mb-4 text-xs font-mono text-[#55565B] dark:text-[#A8ADB2]">
          <div className="flex items-center gap-1.5 font-medium text-[#171717] dark:text-[#FAFAF8]">
            <Award className="w-3.5 h-3.5 text-[#777773] shrink-0" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#777773]">
            <Calendar className="w-3 h-3 shrink-0" />
            <span>Issued: {certificate.issueDate}</span>
            {certificate.validUntil && (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">• Valid thru {certificate.validUntil}</span>
            )}
          </div>
        </div>

        {/* Credential ID Badge (if available) */}
        {certificate.credentialId && (
          <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 bg-[#F3F0E9] dark:bg-[#1A1D24] border border-[#E5E3DE] dark:border-[#262A34] text-[10px] font-mono text-[#333438] dark:text-[#D1D5DB]">
            <span className="text-[#777773]">ID:</span>
            <span className="font-semibold">{certificate.credentialId}</span>
            <button
              onClick={handleCopyId}
              className="p-1 hover:text-[#171717] dark:hover:text-[#FFFFFF] transition-colors"
              title="Copy Credential ID"
              aria-label="Copy credential ID"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-[#777773]" />}
            </button>
          </div>
        )}

        {/* Description */}
        <p className="font-body text-xs text-[#55565B] dark:text-[#9CA3AF] leading-relaxed mb-5">
          {certificate.description}
        </p>

        {/* Key Competencies / Skills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {certificate.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-[#FAFAF8] dark:bg-[#16181F] border border-[#E5E3DE] dark:border-[#262A34] text-[10px] font-mono text-[#333438] dark:text-[#D1D5DB]"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-[#777773]">
              +{certificate.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#E5E3DE] dark:border-[#22252C] flex items-center justify-between gap-3">
        <button
          onClick={() => onView(certificate)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] text-[11px] font-mono uppercase tracking-wider hover:bg-[#333] dark:hover:bg-[#E5E3DE] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
          aria-label={`View certificate for ${certificate.title}`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Certificate</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>

        <a
          href={certificate.pdfUrl}
          download
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#777773] hover:text-[#171717] dark:hover:text-[#FAFAF8] transition-colors"
          title="Download original PDF"
          aria-label={`Download original PDF for ${certificate.title}`}
        >
          <span>PDF</span>
          <span className="text-[9px] text-[#A8ADB2]">↗</span>
        </a>
      </div>
    </TiltCard>
  )
}
