import React from 'react'
import type { Project } from '../../data/projects'

interface ProjectVisualProps {
  project: Project
  className?: string
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ project, className = '' }) => {
  // Render distinct technical architectural graphics based on project ID
  switch (project.id) {
    case 'currencyvision-ai':
      return (
        <div className={`relative w-full h-full bg-[#121316] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #A8ADB2 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* CNN Banknote Classification & Grad-CAM Heatmap Visualization */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* Banknote Target Wireframe */}
            <rect x="25" y="30" width="150" height="90" rx="4" fill="#17181C" stroke="#A8ADB2" strokeWidth="1.5" />
            <rect x="35" y="40" width="130" height="70" rx="2" fill="#1C1E24" stroke="#41464B" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Banknote Internal Features */}
            <circle cx="65" cy="75" r="18" fill="#242730" stroke="#777773" strokeWidth="1" />
            <rect x="100" y="55" width="50" height="6" rx="1" fill="#777773" opacity="0.6" />
            <rect x="100" y="68" width="40" height="5" rx="1" fill="#41464B" />
            <rect x="100" y="80" width="45" height="5" rx="1" fill="#41464B" />
            <text x="65" y="80" fill="#FFFFFF" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">₹500</text>
            <line x1="120" y1="30" x2="120" y2="120" stroke="#A8ADB2" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Grad-CAM Heatmap Overlay Highlights */}
            <circle cx="65" cy="75" r="22" fill="#8B5CF6" opacity="0.25" filter="blur(6px)" />
            <circle cx="120" cy="75" r="16" fill="#00F5A0" opacity="0.3" filter="blur(4px)" />

            {/* Scanner Reticle Corners */}
            <path d="M 20 40 L 20 25 L 35 25" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M 180 25 L 195 25 L 195 40" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M 20 110 L 20 125 L 35 125" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M 180 125 L 195 125 L 195 110" stroke="#FFFFFF" strokeWidth="2" />

            {/* CNN Conv2D Feature Extraction Tensors */}
            <path d="M 195 75 L 225 50" stroke="#777773" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 195 75 L 225 100" stroke="#777773" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Layer 1 (Conv2D 32) */}
            <rect x="225" y="40" width="14" height="40" rx="2" fill="#242730" stroke="#A8ADB2" strokeWidth="1" />
            {/* Layer 2 (Conv2D 64) */}
            <rect x="245" y="48" width="14" height="32" rx="2" fill="#2E3340" stroke="#A8ADB2" strokeWidth="1" />
            {/* Layer 3 (Conv2D 128) */}
            <rect x="265" y="54" width="14" height="24" rx="2" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Dense Output Nodes */}
            <circle cx="300" cy="52" r="5" fill="#171717" stroke="#00F5A0" strokeWidth="1.5" />
            <circle cx="300" cy="66" r="6" fill="#00F5A0" />
            <circle cx="300" cy="80" r="5" fill="#171717" stroke="#777773" strokeWidth="1" />

            {/* Connection Rays to Dense */}
            <line x1="279" y1="66" x2="295" y2="66" stroke="#00F5A0" strokeWidth="1.5" />

            {/* Bottom Telemetry Bar */}
            <rect x="25" y="145" width="290" height="36" rx="3" fill="#17181D" stroke="#31353F" strokeWidth="1" />
            <text x="38" y="167" fill="#00F5A0" fontSize="9" fontFamily="monospace" fontWeight="bold">PREDICTION: ₹500 NOTE</text>
            <text x="210" y="167" fill="#A8ADB2" fontSize="9" fontFamily="monospace">CONFIDENCE: 99.2%</text>
            <text x="38" y="198" fill="#777773" fontSize="8" fontFamily="monospace">GRAD-CAM ACTIVATION: NUMERAL + SECURITY THREAD</text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-neutral-400">
            CNN / EXPLAINABLE AI (GRAD-CAM)
          </div>
        </div>
      )

    case 'careerpilot-ai':
      return (
        <div className={`relative w-full h-full bg-[#111317] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Neural grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* LangGraph Multi-Agent Workflow Diagram */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* Central Supervisor Agent Node */}
            <circle cx="170" cy="95" r="28" fill="#171822" stroke="#3B82F6" strokeWidth="2" />
            <circle cx="170" cy="95" r="20" fill="#1E2333" />
            <text x="170" y="93" fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SUPERVISOR</text>
            <text x="170" y="103" fill="#38BDF8" fontSize="7" fontFamily="monospace" textAnchor="middle">ROUTER</text>

            {/* Connecting Directed Graph Edges */}
            <path d="M 142 95 L 75 55" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 170 67 L 170 30" stroke="#60A5FA" strokeWidth="1.5" />
            <path d="M 198 95 L 265 55" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 148 115 L 85 155" stroke="#777773" strokeWidth="1.2" />
            <path d="M 192 115 L 255 155" stroke="#777773" strokeWidth="1.2" />

            {/* Downstream Specialized Agent Nodes */}
            {/* Agent 1: Resume & ATS */}
            <rect x="30" y="38" width="70" height="32" rx="3" fill="#161922" stroke="#60A5FA" strokeWidth="1.5" />
            <text x="65" y="54" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATS AGENT</text>
            <text x="65" y="64" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle">SCORE: 92/100</text>

            {/* Agent 2: Skill Gap Evaluator */}
            <rect x="135" y="14" width="70" height="28" rx="3" fill="#161922" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="170" y="31" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SKILL GAP</text>

            {/* Agent 3: Interview Coach */}
            <rect x="240" y="38" width="75" height="32" rx="3" fill="#161922" stroke="#60A5FA" strokeWidth="1.5" />
            <text x="277" y="54" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">INTERVIEW COACH</text>
            <text x="277" y="64" fill="#38BDF8" fontSize="7" fontFamily="monospace" textAnchor="middle">DYNAMIC MOCK</text>

            {/* Agent 4: Job Matcher */}
            <rect x="40" y="142" width="75" height="28" rx="3" fill="#161922" stroke="#475569" strokeWidth="1" />
            <text x="77" y="159" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">JOB MATCH</text>

            {/* Agent 5: Roadmap Builder */}
            <rect x="225" y="142" width="75" height="28" rx="3" fill="#161922" stroke="#475569" strokeWidth="1" />
            <text x="262" y="159" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">ROADMAP</text>

            {/* State Graph Execution Badge */}
            <rect x="50" y="185" width="240" height="20" rx="3" fill="#161A26" stroke="#2563EB" strokeWidth="1" />
            <text x="170" y="198" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
              LANGGRAPH WORKFLOW // GEMINI 1.5 PRO
            </text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-blue-400">
            LANGGRAPH / MULTI-AGENT ORCHESTRATION
          </div>
        </div>
      )

    case 'crime-record-management':
      return (
        <div className={`relative w-full h-full bg-[#141312] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Security grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #F59E0B 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Database Dossier & MongoDB Atlas Security Graphic */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* MongoDB Document Node */}
            <rect x="30" y="35" width="130" height="120" rx="4" fill="#1A1816" stroke="#D97706" strokeWidth="1.5" />
            <rect x="30" y="35" width="130" height="24" rx="4" fill="#2E2416" />
            <text x="42" y="51" fill="#FBBF24" fontSize="8" fontFamily="monospace" fontWeight="bold">CASE_DOSSIER: FIR-8402</text>

            <text x="42" y="75" fill="#A8ADB2" fontSize="8" fontFamily="monospace">STATUS: <tspan fill="#10B981">UNDER_INVESTIGATION</tspan></text>
            <text x="42" y="92" fill="#A8ADB2" fontSize="8" fontFamily="monospace">PRECINCT: 04_METRO</text>
            <text x="42" y="109" fill="#A8ADB2" fontSize="8" fontFamily="monospace">OFFICER: BADGE_9120</text>
            <text x="42" y="126" fill="#A8ADB2" fontSize="8" fontFamily="monospace">RECORD: <tspan fill="#F59E0B">ENCRYPTED_SHA256</tspan></text>
            <text x="42" y="143" fill="#777773" fontSize="7" fontFamily="monospace">HASH: a8f9...31c2</text>

            {/* MongoDB Atlas Replica Set Topology */}
            <path d="M 160 95 L 210 60" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 160 95 L 210 130" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Primary DB Cluster Node */}
            <circle cx="230" cy="60" r="18" fill="#1C1814" stroke="#F59E0B" strokeWidth="2" />
            <text x="230" y="58" fill="#FBBF24" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATLAS</text>
            <text x="230" y="67" fill="#FFFFFF" fontSize="7" fontFamily="monospace" textAnchor="middle">PRIMARY</text>

            {/* Secondary Replica Node */}
            <circle cx="230" cy="130" r="16" fill="#1C1814" stroke="#777773" strokeWidth="1.5" />
            <text x="230" y="132" fill="#A8ADB2" fontSize="7" fontFamily="monospace" textAnchor="middle">REPLICA</text>

            {/* Security Shield & RBAC Token */}
            <rect x="265" y="80" width="55" height="30" rx="3" fill="#241B12" stroke="#F59E0B" strokeWidth="1" />
            <text x="292" y="94" fill="#FBBF24" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RBAC AUTH</text>
            <text x="292" y="103" fill="#34D399" fontSize="6" fontFamily="monospace" textAnchor="middle">TOKEN VALID</text>

            {/* Bottom Audit Status Banner */}
            <rect x="30" y="168" width="280" height="24" rx="3" fill="#1C1814" stroke="#3D2F1D" strokeWidth="1" />
            <text x="42" y="183" fill="#D97706" fontSize="8" fontFamily="monospace">
              MONGODB ATLAS CLOUD // CRUD REST API // JWT AUTH
            </text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-amber-500">
            MONGODB ATLAS / NODE.JS REST API
          </div>
        </div>
      )

    case 'blinkit-clone':
      return (
        <div className={`relative w-full h-full bg-[#121614] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Quick-commerce shelf background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #10B981 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Quick-Commerce Storefront & Real-Time Cart Architecture */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* Delivery Estimation Pill */}
            <rect x="30" y="24" width="130" height="24" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="1.2" />
            <circle cx="44" cy="36" r="4" fill="#34D399" />
            <text x="54" y="39" fill="#ECFDF5" fontSize="8" fontFamily="monospace" fontWeight="bold">DELIVERY IN 10 MINS</text>

            {/* Product Card 1 */}
            <rect x="30" y="60" width="85" height="100" rx="4" fill="#17221C" stroke="#10B981" strokeWidth="1" />
            <rect x="38" y="68" width="69" height="42" rx="3" fill="#203328" />
            <text x="72" y="93" fill="#34D399" fontSize="9" fontFamily="monospace" textAnchor="middle">FRESH MILK</text>
            <text x="38" y="125" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">₹32</text>
            <rect x="75" y="116" width="32" height="18" rx="3" fill="#059669" />
            <text x="91" y="128" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ADD</text>

            {/* Product Card 2 */}
            <rect x="125" y="60" width="85" height="100" rx="4" fill="#17221C" stroke="#2D4638" strokeWidth="1" />
            <rect x="133" y="68" width="69" height="42" rx="3" fill="#203328" />
            <text x="167" y="93" fill="#6EE7B7" fontSize="9" fontFamily="monospace" textAnchor="middle">BREAD 400G</text>
            <text x="133" y="125" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">₹45</text>
            <rect x="170" y="116" width="32" height="18" rx="3" fill="#059669" />
            <text x="186" y="128" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ADD</text>

            {/* Real-time Cart Bar */}
            <rect x="220" y="45" width="95" height="115" rx="4" fill="#1A2820" stroke="#10B981" strokeWidth="1.5" />
            <text x="230" y="65" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="bold">SHOPPING CART</text>
            <text x="230" y="85" fill="#D1FAE5" fontSize="7" fontFamily="monospace">2 Items • ₹77</text>
            <text x="230" y="100" fill="#9CA3AF" fontSize="7" fontFamily="monospace">Delivery: FREE</text>
            <line x1="230" y1="110" x2="305" y2="110" stroke="#374151" strokeWidth="1" />
            <text x="230" y="125" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">TOTAL: ₹77</text>
            <rect x="228" y="133" width="79" height="20" rx="3" fill="#10B981" />
            <text x="267" y="146" fill="#064E3B" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CHECKOUT →</text>

            {/* Bottom Certification Badge */}
            <rect x="30" y="172" width="285" height="22" rx="3" fill="#131F18" stroke="#047857" strokeWidth="1" />
            <text x="172" y="186" fill="#A7F3D0" fontSize="8" fontFamily="monospace" textAnchor="middle">
              PREGRAD INDUSTRIAL PROJECT // CERTIFICATE ID: PCC2528
            </text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-emerald-400">
            REACT / QUICK-COMMERCE STOREFRONT
          </div>
        </div>
      )

    case 'netflix-clone':
      return (
        <div className={`relative w-full h-full bg-[#151111] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Cinematic grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #E50914 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Netflix Streaming Platform UI Graphic */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* Cinematic Billboard Banner */}
            <rect x="25" y="24" width="290" height="75" rx="4" fill="#201515" stroke="#E50914" strokeWidth="1.2" />
            <rect x="25" y="24" width="140" height="75" rx="4" fill="#2A1717" />
            <text x="38" y="48" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">FEATURED TITLE</text>
            <text x="38" y="62" fill="#E50914" fontSize="8" fontFamily="monospace" fontWeight="bold">98% MATCH • 4K HDR</text>
            <rect x="38" y="72" width="45" height="18" rx="2" fill="#FFFFFF" />
            <text x="60" y="84" fill="#111111" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">▶ PLAY</text>
            <rect x="90" y="72" width="55" height="18" rx="2" fill="#4B3232" />
            <text x="117" y="84" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" textAnchor="middle">ℹ MORE</text>

            {/* Horizontal Rail Category Heading */}
            <text x="25" y="118" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">TRENDING NOW ON NETFLIX</text>

            {/* Carousel Film Cards */}
            <rect x="25" y="125" width="52" height="42" rx="2" fill="#2E1B1B" stroke="#482424" strokeWidth="1" />
            <rect x="83" y="125" width="52" height="42" rx="2" fill="#2E1B1B" stroke="#482424" strokeWidth="1" />
            <rect x="141" y="125" width="58" height="46" rx="3" fill="#3D1D1D" stroke="#E50914" strokeWidth="1.5" />
            <text x="170" y="152" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">POPULAR</text>
            <rect x="205" y="125" width="52" height="42" rx="2" fill="#2E1B1B" stroke="#482424" strokeWidth="1" />
            <rect x="263" y="125" width="52" height="42" rx="2" fill="#2E1B1B" stroke="#482424" strokeWidth="1" />

            {/* Bottom Certification Badge */}
            <rect x="25" y="180" width="290" height="20" rx="3" fill="#1C1414" stroke="#7F1D1D" strokeWidth="1" />
            <text x="170" y="193" fill="#FCA5A5" fontSize="8" fontFamily="monospace" textAnchor="middle">
              PREGRAD INDUSTRIAL PROJECT // CERTIFICATE ID: PCC2552
            </text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-red-500">
            REACT / TMDB MEDIA STREAMING UI
          </div>
        </div>
      )

    case 'minicloud-hdfs':
      return (
        <div className={`relative w-full h-full bg-[#111516] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Cloud Storage grid background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #06B6D4 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* HDFS Cloud Controller Architecture */}
          <svg className="w-full h-full max-w-sm max-h-60 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 340 210" fill="none">
            {/* Client Browser / SaaS Portal */}
            <rect x="25" y="40" width="80" height="60" rx="3" fill="#162226" stroke="#06B6D4" strokeWidth="1.5" />
            <text x="65" y="62" fill="#67E8F9" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">REACT SPA</text>
            <text x="65" y="74" fill="#A8ADB2" fontSize="7" fontFamily="monospace" textAnchor="middle">LAN CLIENT</text>
            <text x="65" y="86" fill="#38BDF8" fontSize="7" fontFamily="monospace" textAnchor="middle">:5000 PORT</text>

            {/* Flow to Cloud Controller */}
            <path d="M 105 70 L 140 70" stroke="#06B6D4" strokeWidth="1.5" />

            {/* Custom Cloud Controller Node */}
            <rect x="140" y="30" width="90" height="80" rx="4" fill="#16252A" stroke="#0891B2" strokeWidth="2" />
            <text x="185" y="52" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CLOUD</text>
            <text x="185" y="62" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CONTROLLER</text>
            <text x="185" y="76" fill="#67E8F9" fontSize="7" fontFamily="monospace" textAnchor="middle">PYTHON / FLASK</text>
            <text x="185" y="88" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle">ATOMIC 6-STEP</text>
            <text x="185" y="98" fill="#FBBF24" fontSize="6" fontFamily="monospace" textAnchor="middle">SQLITE METADATA</text>

            {/* Flow to HDFS */}
            <path d="M 230 70 L 265 70" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Apache Hadoop HDFS Cluster */}
            <rect x="265" y="35" width="55" height="32" rx="3" fill="#132B32" stroke="#22D3EE" strokeWidth="1.5" />
            <text x="292" y="50" fill="#A5F3FC" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NAMENODE</text>
            <text x="292" y="60" fill="#67E8F9" fontSize="6" fontFamily="monospace" textAnchor="middle">METADATA</text>

            <rect x="265" y="75" width="55" height="32" rx="3" fill="#132B32" stroke="#22D3EE" strokeWidth="1.5" />
            <text x="292" y="90" fill="#A5F3FC" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DATANODE</text>
            <text x="292" y="100" fill="#67E8F9" fontSize="6" fontFamily="monospace" textAnchor="middle">RAW BLOCKS</text>

            {/* Telemetry Bar */}
            <rect x="25" y="135" width="295" height="50" rx="3" fill="#142125" stroke="#155E75" strokeWidth="1" />
            <text x="38" y="153" fill="#22D3EE" fontSize="8" fontFamily="monospace" fontWeight="bold">
              WEBHDFS PROTOCOL // UUID FLAT STORAGE ABSTRACTION
            </text>
            <text x="38" y="168" fill="#94A3B8" fontSize="7" fontFamily="monospace">
              Storage Pool: 100% On-Premise LAN • Zero Cloud API Costs • Zero External Internet
            </text>
          </svg>

          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-cyan-400">
            HADOOP HDFS / WEBHDFS REST
          </div>
        </div>
      )

    case 'civic-resolve':
    default:
      return (
        <div className={`relative w-full h-full bg-[#121314] flex items-center justify-center overflow-hidden p-6 select-none ${className}`}>
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Geospatial civic routing visualization */}
          <svg className="w-full h-full max-w-sm max-h-56 transition-transform duration-500 ease-out group-hover:scale-105" viewBox="0 0 320 200" fill="none">
            <path d="M 60 140 L 160 80 L 260 120" stroke="#777773" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 160 80 L 160 170" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 60 140 L 260 120" stroke="#41464B" strokeWidth="1" />
            
            <circle cx="160" cy="80" r="28" fill="#171717" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="160" cy="80" r="16" fill="#A8ADB2" />
            
            <circle cx="60" cy="140" r="18" fill="#171717" stroke="#A8ADB2" strokeWidth="1.5" />
            <circle cx="260" cy="120" r="22" fill="#171717" stroke="#A8ADB2" strokeWidth="1.5" />
            <circle cx="160" cy="170" r="14" fill="#171717" stroke="#777773" strokeWidth="1.5" />

            <text x="160" y="84" fill="#171717" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI</text>
            <text x="60" y="143" fill="#FFF" fontSize="8" fontFamily="monospace" textAnchor="middle">IN</text>
            <text x="260" y="123" fill="#FFF" fontSize="8" fontFamily="monospace" textAnchor="middle">SLA</text>
            <text x="160" y="173" fill="#FFF" fontSize="8" fontFamily="monospace" textAnchor="middle">DISP</text>
            <text x="160" y="32" fill="#A8ADB2" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">VECTORIZED TRIAGE PIPELINE</text>
          </svg>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase tracking-widest text-neutral-400">
            FASTAPI / PGVECTOR / LANGCHAIN
          </div>
        </div>
      )
  }
}
