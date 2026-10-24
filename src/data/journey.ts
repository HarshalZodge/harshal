export interface JourneyMilestone {
  id: string
  period: string
  year: string
  title: string
  organization?: string
  category: 'education' | 'milestone' | 'hackathon' | 'leadership'
  summary: string
  bullets: string[]
  technologies?: string[]
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'btech-eng',
    period: '2023 — 2027 (Third Year Undergrad)',
    year: '2026',
    title: 'Bachelor of Engineering in Computer Engineering',
    organization: 'Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar (SPPU)',
    category: 'education',
    summary:
      'Pursuing third-year B.E. in Computer Engineering under Savitribai Phule Pune University (SPPU), mastering Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Artificial Intelligence.',
    bullets: [
      'Maintaining strong academic standing across systems engineering, object-oriented design, and algorithmic problem solving',
      'Specializing in Applied Machine Learning, Multi-Agent AI Architectures, and Full-Stack Web Development',
      'Actively developing production-grade projects including CurrencyVision AI, CareerPilot AI, and persistent cloud architectures',
    ],
    technologies: ['Python', 'TypeScript', 'C++', 'SQL', 'MongoDB', 'TensorFlow', 'Computer Networks'],
  },
  {
    id: 'hackathon-national',
    period: '2024 — 2025',
    year: '2024',
    title: 'Finalist / Top Team — National Collegiate Hackathon',
    organization: 'Collegiate Tech Innovation Summit',
    category: 'hackathon',
    summary:
      'Spearheaded the technical architecture of an AI-driven civic triage prototype (CivicPulse) during a 36-hour continuous build sprint.',
    bullets: [
      'Engineered an asynchronous inference microservice converting voice and text reports into categorized municipal tickets',
      'Designed a real-time web portal for disaster response monitoring under high network congestion',
      'Presented technical demonstration to a panel of engineering leaders and industry evaluators',
    ],
    technologies: ['FastAPI', 'React', 'pgvector', 'Docker'],
  },
  {
    id: 'creative-web-milestone',
    period: '2024',
    year: '2024',
    title: 'Deep Exploration into WebGL & Shader Engineering',
    organization: 'Self-Directed Engineering',
    category: 'milestone',
    summary:
      'Transitioned from traditional DOM layouts into low-level graphics programming, mastering GLSL fragment shaders, raymarching, and custom Three.js pipelines.',
    bullets: [
      'Built interactive mathematical visualizations including Signed Distance Fields (SDFs) and liquid metallic surface simulations',
      'Benchmarked rendering performance across mobile GPUs, optimizing draw calls, uniforms, and geometry buffers',
    ],
    technologies: ['Three.js', 'GLSL', 'WebGL2', 'Linear Algebra'],
  },
  {
    id: 'peer-lead',
    period: '2023 — 2024',
    year: '2023',
    title: 'Technical Core Member — College Coding Community',
    organization: 'Department Student Association',
    category: 'leadership',
    summary:
      'Organized technical workshops on Git/GitHub fundamentals, modern full-stack web development, and competitive programming practices.',
    bullets: [
      'Mentored 60+ junior peers on version control workflows and modern JavaScript/TypeScript patterns',
      'Co-organized the annual collegiate coding competition and designed algorithmic problem sets',
    ],
    technologies: ['Git', 'TypeScript', 'Web Fundamentals'],
  },
]
