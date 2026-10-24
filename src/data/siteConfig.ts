export interface SocialLink {
  label: string
  url: string
  icon: string
  username?: string
}

export interface SiteConfig {
  identity: {
    name: string
    shortName: string
    monogram: string
    role: string
    academicStatus: string
    primaryTagline: string
    supportingStatement: string
    location: string
    availability: {
      status: 'available' | 'busy' | 'selective'
      label: string
      subtext: string
    }
  }
  contact: {
    email: string
    endpoint?: string // optional custom backend endpoint; mailto fallback is provided
    github: string
    linkedin: string
    x?: string
    resumeUrl: string
  }
  navigation: Array<{
    label: string
    href: string
    badge?: string
  }>
  hero: {
    eyebrow: string
    headline: {
      line1: string
      line2: string
    }
    description: string
    primaryCta: {
      label: string
      href: string
    }
    secondaryCta: {
      label: string
      href: string
    }
  }
  about: {
    headline: string
    paragraphs: string[]
    focusAreas: Array<{
      title: string
      description: string
      tag: string
    }>
    approach: Array<{
      step: string
      title: string
      description: string
    }>
  }
  features: {
    enableCommandPalette: boolean
    enableShaderControls: boolean
    enableReducedMotionOverride: boolean
  }
}

export const siteConfig: SiteConfig = {
  identity: {
    name: 'Harshal Deepak Zodge',
    shortName: 'Harshal',
    monogram: 'HZ',
    role: 'Software Developer & AI Engineer',
    academicStatus: 'Third-Year B.E. Computer Engineering • Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar (SPPU)',
    primaryTagline: 'Engineering robust full-stack software, autonomous AI agent workflows, and intelligent vision systems.',
    supportingStatement: 'Third-year Computer Engineering undergraduate at Savitribai Phule Pune University (SPPU), passionate about backend engineering, machine learning pipelines, and fluid digital experiences.',
    location: 'Ahilyanagar / Pune, India',
    availability: {
      status: 'available',
      label: 'Open for Software & AI Engineering Roles',
      subtext: 'Available for full-stack, backend, and AI/ML internship opportunities',
    },
  },
  contact: {
    email: 'harshalzodge.dev@gmail.com',
    github: 'https://github.com/harshalzodge',
    linkedin: 'https://linkedin.com/in/harshalzodge',
    resumeUrl: '#contact', // Configurable resume link
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#work' },
    { label: 'Certifications', href: '#certifications', badge: '10' },
    { label: 'Milestones', href: '#journey' },
    { label: 'The Lab', href: '#lab' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'COMPUTER ENGINEERING UNDERGRADUATE // SPPU',
    headline: {
      line1: 'Building the',
      line2: 'next layer of digital.',
    },
    description:
      'Third-year Computer Engineering student at Dr. Vithalrao Vikhe Patil College of Engineering (SPPU). Crafting agentic AI pipelines, deep convolutional vision architectures, persistent cloud backends, and 60 FPS real-time WebGL interfaces.',
    primaryCta: {
      label: 'Explore selected work',
      href: '#work',
    },
    secondaryCta: {
      label: 'Get in touch',
      href: '#contact',
    },
  },
  about: {
    headline: 'Curious by default. Engineer by practice.',
    paragraphs: [
      'I am Harshal Deepak Zodge, a third-year Computer Engineering undergraduate at Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar (affiliated with Savitribai Phule Pune University - SPPU). My passion lies where computational logic, machine intelligence, and high-performance system design converge.',
      'From implementing custom 4-block CNN architectures with Grad-CAM visual heatmaps in CurrencyVision AI, to orchestrating multi-agent state machines with LangGraph in CareerPilot AI, and architecting persistent database solutions with MongoDB Atlas, I treat software engineering as a disciplined first-principles craft.',
      'My core interests span Software Development, Full-Stack Development, AI/ML, Autonomous AI Agents, and Backend Systems Engineering. I am dedicated to building resilient, production-ready code with clean architecture, strict type safety, and responsive user experiences.',
    ],
    focusAreas: [
      {
        title: 'AI Agents & Machine Learning',
        description: 'Developing multi-agent orchestration graphs (LangGraph), computer vision classifiers (CNN / TensorFlow), and agentic workflows with LLMs.',
        tag: 'Intelligence',
      },
      {
        title: 'Backend & Cloud Systems',
        description: 'Designing persistent document schemas on MongoDB Atlas, RESTful microservices, and distributed cloud file systems using Apache Hadoop HDFS.',
        tag: 'Backend',
      },
      {
        title: 'Full-Stack Web Development',
        description: 'Building responsive quick-commerce storefronts, streaming media interfaces, and type-safe web applications with React, TypeScript, and modern styling.',
        tag: 'Full-Stack',
      },
    ],
    approach: [
      {
        step: '01',
        title: 'First-Principles Deconstruction',
        description: 'Breaking ambiguous problems down into core operational constraints, latency limits, and user intents before touching code.',
      },
      {
        step: '02',
        title: 'Type-Safe Modular Architecture',
        description: 'Designing clean contracts, declarative APIs, and robust data models to make iteration fearless and maintenance predictable.',
      },
      {
        step: '03',
        title: 'Visual & Sensory Polish',
        description: 'Refining typography, tactile transitions, and responsive boundaries until the interface feels effortless to explore.',
      },
    ],
  },
  features: {
    enableCommandPalette: true,
    enableShaderControls: true,
    enableReducedMotionOverride: true,
  },
}
