import { StudioProvider } from './context/StudioContext'
import { Navbar } from './components/navigation/Navbar'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { SkillsSection } from './sections/SkillsSection'
import { SelectedWorkSection } from './sections/SelectedWorkSection'
import { CertificationsSection } from './sections/CertificationsSection'
import { JourneySection } from './sections/JourneySection'
import { LabSection } from './sections/LabSection'
import { ContactSection } from './sections/ContactSection'
import { Footer } from './components/ui/Footer'
import { CommandPalette } from './components/ui/CommandPalette'
import { StudioTelemetryHUD } from './components/ui/StudioTelemetryHUD'
import { CustomCursor } from './components/ui/CustomCursor'
import { FilmGrain } from './components/ui/FilmGrain'
import { ResumeModal } from './components/resume/ResumeModal'
import { GlobalChromeAtmosphere } from './components/chrome/GlobalChromeAtmosphere'
import { LiquidCurtainSeam } from './components/ui/LiquidCurtainSeam'
import { ToastNotification } from './components/ui/ToastNotification'
import { useLenis } from './hooks/useLenis'
import { useTabSwitchMessage } from './hooks/useTabSwitchMessage'

function StudioAppContent() {
  // Initialize Lenis luxury smooth scroll engine with momentum velocity dispatch
  useLenis()

  // Track browser tab switching with engaging dynamic title & welcome-back toast
  useTabSwitchMessage()

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#171717] selection:bg-[#171717] selection:text-[#FAFAF8] flex flex-col">
      {/* Ambient WebGL Liquid Chrome Background (breathes across entire scroll journey) */}
      <GlobalChromeAtmosphere />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#171717] text-white font-mono text-xs uppercase"
      >
        Skip directly to content
      </a>

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Primary Main Content Landmarks */}
      <main id="main-content" className="relative z-10 flex-1">
        {/* Signature Liquid Chrome Hero */}
        <HeroSection />

        <LiquidCurtainSeam label="PHILOSOPHY // BIOGRAPHY" />

        {/* Biography & Approach */}
        <AboutSection />

        <LiquidCurtainSeam label="CAPABILITIES // CONSTELLATION" />

        {/* Technology Capabilities */}
        <SkillsSection />

        <LiquidCurtainSeam label="SYSTEMS // SELECTED WORK" />

        {/* Selected Projects Showcase */}
        <SelectedWorkSection />

        <LiquidCurtainSeam label="CREDENTIALS // PROFESSIONAL LEARNING" />

        {/* Certifications & Professional Learning Gallery */}
        <CertificationsSection />

        <LiquidCurtainSeam label="CHRONOLOGY // ACADEMIC" />

        {/* Milestones & Chronology */}
        <JourneySection />

        <LiquidCurtainSeam label="GRAPHICS LAB // GLSL EXPERIMENTS" />

        {/* Interactive Shader Lab */}
        <LabSection />

        <LiquidCurtainSeam label="TRANSMISSION // INITIATE CONTACT" />

        {/* Transmission & Contact */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Studio Telemetry HUD & Audio Design System */}
      <StudioTelemetryHUD />

      {/* Accessible Split-Pane Studio Command Palette 2.0 */}
      <CommandPalette />

      {/* Contextual Desktop Custom Cursor */}
      <CustomCursor />

      {/* Analog 35mm Film Grain Atmosphere */}
      <FilmGrain />

      {/* Swiss Modernist Curriculum Vitae & Print Mode */}
      <ResumeModal />

      {/* Floating Dynamic Studio Toast Notifications */}
      <ToastNotification />
    </div>
  )
}

export function App() {
  return (
    <StudioProvider>
      <StudioAppContent />
    </StudioProvider>
  )
}

export default App
