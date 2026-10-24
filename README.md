# Liquid Chrome Developer Portfolio — Harshal Zodge

A high-performance personal developer portfolio and interactive digital identity engineered with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Three.js / WebGL GLSL Shaders**.

Designed as a restrained, bright editorial interface inspired by the *Uilora Liquid Chrome* visual aesthetic, combining liquid-metal physics, reflective lighting, and tactile micro-interactions with an honest student engineer positioning.

---

## ✦ Key Highlights

- **Signature Liquid Chrome WebGL Engine**: Custom GLSL fragment shader utilizing Fractional Brownian Motion (fBm), domain-warped turbulence, finite-difference surface normals, and multi-point specular environment reflection.
- **Physics-Interpolated Mouse Reactivity**: Direct uniform mutation inside a decoupled `requestAnimationFrame` loop with smooth spring/lerp easing—zero React re-renders per frame.
- **Automatic GPU Power Saving**: `IntersectionObserver` and document `visibilitychange` listeners automatically pause the WebGL render loop when off-screen or in a hidden tab.
- **Graceful WebGL Fallback**: When WebGL is unavailable, blocked, or disabled, the portfolio renders a designed procedural metallic fallback.
- **Reduced Motion Support**: Automatically honors `prefers-reduced-motion: reduce` by dialing down shader speed and mouse reactivity.
- **Centralized Data Architecture**: All biography, social coordinates, projects, skills, and configuration live in `src/data/siteConfig.ts`, `src/data/projects.ts`, `src/data/skills.ts`, and `src/data/journey.ts`.
- **Editorial Typography & Layout**: Space Grotesk (Display), Inter (Body), and JetBrains Mono (Technical telemetry), laid out on a 1440px max-width grid with hairline borders.
- **Interactive Digital Lab**: Dedicated playground enabling real-time shader material switching (`Liquid Mercury`, `Obsidian Mirror`, `Glancing Iridescence`, `Molten Gold`) and parametric turbulence sliders.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven modal for instant section navigation, shader switching, and email copying.
- **Accessibility & SEO**: WCAG 2.2 AA contrast standards, keyboard traps eliminated, skip-to-content anchor, Open Graph tags, Schema.org Person JSON-LD, `sitemap.xml`, and `robots.txt`.

---

## ✦ Project Structure

```
├── public/
│   ├── favicon.svg             # Custom metallic monogram SVG favicon
│   ├── robots.txt              # Search engine crawler directives
│   ├── sitemap.xml             # Search engine XML sitemap
│   └── images/
│       └── og-preview.svg      # Social graph preview card
├── src/
│   ├── components/
│   │   ├── chrome/
│   │   │   ├── LiquidChromeCanvas.tsx    # Three.js WebGL canvas driver & fallback
│   │   │   └── LiquidChromeShader.ts    # Custom GLSL vertex & fragment shaders
│   │   ├── navigation/
│   │   │   └── Navbar.tsx               # Sticky blurred nav, mobile drawer, active spy
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx          # Project card container
│   │   │   ├── ProjectDetailModal.tsx   # Architectural specifications modal
│   │   │   └── ProjectVisual.tsx        # Custom architectural SVG diagrams
│   │   └── ui/
│   │       ├── CommandPalette.tsx       # ⌘K / Ctrl+K navigation & preset switcher
│   │       ├── Footer.tsx               # Colophon, IST clock, back to apex
│   │       └── Icons.tsx                # Strict SVG brand and technical icons
│   ├── data/
│   │   ├── siteConfig.ts       # Central identity, biography, links & flags
│   │   ├── projects.ts         # Portfolio projects with deep technical specs
│   │   ├── skills.ts           # Categorized technology stack with honest statuses
│   │   └── journey.ts          # Academic and hackathon timeline milestones
│   ├── sections/
│   │   ├── HeroSection.tsx          # Liquid Chrome Hero + typography + CTAs
│   │   ├── SelectedWorkSection.tsx  # Asymmetric editorial project showcase
│   │   ├── AboutSection.tsx         # Philosophy, approach & abstract identity card
│   │   ├── SkillsSection.tsx        # Interactive capabilities matrix
│   │   ├── JourneySection.tsx       # Chronological academic milestones
│   │   ├── LabSection.tsx           # Real-time shader laboratory
│   │   └── ContactSection.tsx       # Validated form + mailto fallback + direct copy
│   ├── styles/
│   │   └── globals.css         # CSS tokens, color palette, custom scrollbar
│   ├── lib/
│   │   └── utils.ts            # Class merging utility
│   ├── App.tsx                 # Root application composition & landmarks
│   └── main.tsx                # React 19 entry point
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts              # Code splitting (three.js / vendor / app)
```

---

## ✦ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v22.x recommended)
- **NPM**: v9.0.0 or higher

### Installation

```bash
# Clone the repository (or navigate to project folder)
cd Personal_port

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. Fast Refresh (HMR) is active.

### Production Build & Verification

```bash
# Compile TypeScript and generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The production output is placed into `dist/` with chunk splitting for Three.js and vendor libraries.

---

## ✦ Content Customization

All personal information and content can be updated from a single directory (`src/data/`):

1. **Identity & Hero**: Edit [src/data/siteConfig.ts](file:///e:/New%20folder/Personal_port/src/data/siteConfig.ts) to update name, role, tagline, biography paragraphs, and focus areas.
2. **Projects**: Edit [src/data/projects.ts](file:///e:/New%20folder/Personal_port/src/data/projects.ts) to add or modify projects, live URLs, GitHub repositories, and architectural highlights.
3. **Skills**: Edit [src/data/skills.ts](file:///e:/New%20folder/Personal_port/src/data/skills.ts) to adjust proficiencies (`proficient` | `familiar` | `exploring`).
4. **Milestones**: Edit [src/data/journey.ts](file:///e:/New%20folder/Personal_port/src/data/journey.ts) to update academic degrees, hackathons, or leadership roles.

---

## ✦ Contact Form Configuration

By default, the contact form provides an honest **mailto fallback**:
- When the user submits the form, it validates fields and opens their native email client with pre-filled subject and body.
- A one-click **Copy Email** button with clipboard feedback is also provided.

To connect a custom backend endpoint (e.g. Formspree, Resend API, AWS Lambda, or a custom serverless route):
1. Open [src/data/siteConfig.ts](file:///e:/New%20folder/Personal_port/src/data/siteConfig.ts).
2. Set `contact.endpoint` to your API URL:
   ```ts
   contact: {
     email: 'harshalzodge.dev@gmail.com',
     endpoint: 'https://api.yourdomain.com/contact', // or Formspree endpoint
     ...
   }
   ```
3. Never commit secret API keys to the frontend repository. If using an external mailer service, proxy requests through a serverless function.

---

## ✦ Deployment

### Vercel (Recommended)

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

### Static Hosting (Netlify, Cloudflare Pages, GitHub Pages)

Run `npm run build` and upload the generated `dist/` directory directly to any static web host.

---

## ✦ Performance & Accessibility

- **Device Pixel Ratio**: Capped at `Math.min(window.devicePixelRatio, 1.75)` to prevent GPU throttling on Retina/4K screens while maintaining crisp vector fidelity.
- **Battery & CPU Conservation**: Shader animation pauses automatically when scrolled out of view or when switching tabs.
- **Reduced Motion**: Respects `(prefers-reduced-motion: reduce)` system settings.
- **Zero-Lint Quality**: 0 errors and 0 warnings verified via `oxlint` and TypeScript strict mode.
