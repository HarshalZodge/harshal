import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Certificate } from '../../data/certificates'
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Award,
  Calendar,
  FileCheck,
} from 'lucide-react'

interface CertificateModalProps {
  certificate: Certificate | null
  onClose: () => void
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [zoom, setZoom] = useState<number>(100)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setZoom(100)
    setIsFullScreen(false)
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false)
        } else {
          handleClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, isFullScreen])

  // Prevent background scrolling
  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [certificate])

  if (!certificate) return null

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 75))
  const toggleFullScreen = () => setIsFullScreen((prev) => !prev)

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-[#171717]/75 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className={`relative w-full flex flex-col bg-[#FAFAF8] dark:bg-[#0D0E11] border border-[#E5E3DE] dark:border-[#22252C] shadow-2xl animate-scale-up transition-all duration-300 ${
          isFullScreen ? 'max-w-[98vw] h-[96vh]' : 'max-w-5xl h-[88vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#FAFAF8] dark:bg-[#0D0E11] border-b border-[#E5E3DE] dark:border-[#22252C] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 border shrink-0"
              style={{
                borderColor: certificate.badgeColor || '#171717',
                color: certificate.badgeColor || '#171717',
                backgroundColor: `${certificate.badgeColor || '#171717'}0D`,
              }}
            >
              {certificate.issuerBadge}
            </span>
            <div className="min-w-0">
              <h2
                id="cert-modal-title"
                className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FAFAF8] truncate"
              >
                {certificate.title}
              </h2>
              <span className="text-[10px] font-mono text-[#777773] hidden sm:inline">
                {certificate.issuer} • Issued {certificate.issueDate}
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-[#F3F0E9] dark:bg-[#1A1D24] border border-[#E5E3DE] dark:border-[#242730] p-0.5 text-xs font-mono">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 75}
                className="p-1.5 hover:bg-[#FFFFFF] dark:hover:bg-[#252A34] disabled:opacity-30 transition-colors"
                title="Zoom Out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5 text-[#171717] dark:text-[#FAFAF8]" />
              </button>
              <span className="px-2 text-[11px] font-mono text-[#777773] select-none min-w-[44px] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="p-1.5 hover:bg-[#FFFFFF] dark:hover:bg-[#252A34] disabled:opacity-30 transition-colors"
                title="Zoom In"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#171717] dark:text-[#FAFAF8]" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullScreen}
              className="p-2 border border-[#E5E3DE] dark:border-[#242730] bg-[#FFFFFF] dark:bg-[#16181F] text-[#171717] dark:text-[#FAFAF8] hover:bg-[#F3F0E9] dark:hover:bg-[#22252C] transition-colors"
              title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
              aria-label={isFullScreen ? 'Exit full screen' : 'Full screen'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Download PDF Action */}
            <a
              href={certificate.pdfUrl}
              download
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors"
              title="Download Original PDF"
              aria-label="Download original PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center text-[#777773] hover:text-[#171717] dark:hover:text-[#FAFAF8] hover:bg-[#E5E3DE]/50 dark:hover:bg-[#1E2129] transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Split: PDF Previewer + Metadata sidebar on desktop) */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          {/* PDF Viewer Container */}
          <div className="flex-1 h-full bg-[#1A1D20] relative overflow-auto flex items-center justify-center p-2 sm:p-4">
            <div
              className="w-full h-full transition-transform duration-200 origin-center flex items-center justify-center shadow-2xl"
              style={{
                transform: zoom !== 100 ? `scale(${zoom / 100})` : 'none',
              }}
            >
              <iframe
                src={`${certificate.pdfUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-sm border-0 bg-white"
                title={`Original Certificate PDF: ${certificate.title}`}
              />
            </div>
          </div>

          {/* Details / Verification Sidebar */}
          <div className="w-full lg:w-80 p-5 sm:p-6 bg-[#FAFAF8] dark:bg-[#111317] border-t lg:border-t-0 lg:border-l border-[#E5E3DE] dark:border-[#22252C] overflow-y-auto space-y-5">
            {/* Verification Status Banner */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className="min-w-0">
                <span className="font-bold block">GENUINE CREDENTIAL VERIFIED</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block truncate">
                  Authenticated with original issuer file
                </span>
              </div>
            </div>

            {/* Issuing Metadata */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] block mb-1">
                Issuing Organization
              </span>
              <p className="font-display font-bold text-sm text-[#111111] dark:text-[#FAFAF8]">
                {certificate.issuer}
              </p>
              {certificate.program && (
                <p className="text-xs font-body text-[#777773] mt-0.5">{certificate.program}</p>
              )}
            </div>

            {/* Credential ID */}
            {certificate.credentialId && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] block mb-1">
                  Credential ID
                </span>
                <p className="font-mono font-semibold text-xs text-[#111111] dark:text-[#FAFAF8] bg-[#F3F0E9] dark:bg-[#181B22] p-2 border border-[#E5E3DE] dark:border-[#262A34] select-all">
                  {certificate.credentialId}
                </p>
              </div>
            )}

            {/* Validity Timeline */}
            <div className="space-y-1 text-xs font-mono text-[#55565B] dark:text-[#A8ADB2]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#777773]" />
                <span>Issue Date: <strong className="text-[#111111] dark:text-[#FAFAF8]">{certificate.issueDate}</strong></span>
              </div>
              {certificate.validUntil && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Valid Through: <strong>{certificate.validUntil}</strong></span>
                </div>
              )}
            </div>

            {/* Description Narrative */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] block mb-1">
                Curriculum & Scope
              </span>
              <p className="font-body text-xs text-[#55565B] dark:text-[#9CA3AF] leading-relaxed">
                {certificate.description}
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] block mb-2">
                Demonstrated Competencies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-[#FFFFFF] dark:bg-[#181B22] border border-[#E5E3DE] dark:border-[#262A34] text-[10px] font-mono text-[#333438] dark:text-[#D1D5DB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified External Link (if genuine URL exists) */}
            {certificate.verificationUrl && (
              <div className="pt-2">
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FFFFFF] dark:bg-[#181B22] border border-[#E5E3DE] dark:border-[#262A34] hover:border-[#171717] dark:hover:border-[#FAFAF8] text-[#171717] dark:text-[#FAFAF8] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Verify on Issuer Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#777773]" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
