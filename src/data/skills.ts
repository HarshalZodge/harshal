export type SkillStatus = 'proficient' | 'familiar' | 'exploring'

export interface SkillItem {
  name: string
  status: SkillStatus
  note?: string
  highlight?: boolean
}

export interface SkillCategory {
  id: string
  title: string
  subtitle: string
  description: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-data',
    title: 'AI, Machine Learning & Vision',
    subtitle: 'Models, Computer Vision & Data Pipelines',
    description:
      'Designing intelligent inference pipelines, localized transformer models, and real-time computer vision processing.',
    skills: [
      { name: 'Python', status: 'proficient', highlight: true, note: 'Core language for ML & data' },
      { name: 'PyTorch', status: 'familiar', note: 'Tensor ops & model architectures' },
      { name: 'Computer Vision / OpenCV', status: 'proficient', highlight: true, note: 'Feature extraction & spatial tracking' },
      { name: 'LLM & RAG Architectures', status: 'proficient', highlight: true, note: 'Vector indexing, LangChain, prompts' },
      { name: 'HuggingFace Transformers', status: 'familiar', note: 'Model fine-tuning & embeddings' },
      { name: 'MediaPipe', status: 'proficient', note: 'Edge vision landmark detection' },
      { name: 'Scikit-Learn', status: 'familiar', note: 'Classical ML regression & clustering' },
      { name: 'Vector Databases (pgvector/Chroma)', status: 'proficient', note: 'Semantic vector similarity search' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering & WebGL',
    subtitle: 'Interactive Systems, Shaders & User Interfaces',
    description:
      'Building performant, accessible web applications with strict TypeScript contracts, fluid motion, and hardware-accelerated shaders.',
    skills: [
      { name: 'TypeScript', status: 'proficient', highlight: true, note: 'Strict typing & domain modeling' },
      { name: 'React', status: 'proficient', highlight: true, note: 'Component composition & hooks' },
      { name: 'Three.js / WebGL', status: 'proficient', highlight: true, note: '3D geometry & scene graphs' },
      { name: 'GLSL Shaders', status: 'familiar', highlight: true, note: 'Fragment shaders & raymarching math' },
      { name: 'Tailwind CSS', status: 'proficient', note: 'Design systems & responsive layouts' },
      { name: 'HTML5 & Modern CSS', status: 'proficient', note: 'Semantic semantics & CSS clamp / grid' },
      { name: 'Framer Motion', status: 'proficient', note: 'Physics springs & layout animations' },
      { name: 'Web Audio API', status: 'familiar', note: 'Dynamic DSP synthesis nodes' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Systems Development',
    subtitle: 'Server Architectures, Microservices & APIs',
    description:
      'Developing reliable asynchronous backends, robust database models, and low-latency client-server communication channels.',
    skills: [
      { name: 'Node.js', status: 'proficient', highlight: true, note: 'Event-driven server runtime' },
      { name: 'FastAPI / Python', status: 'proficient', highlight: true, note: 'High-throughput async REST endpoints' },
      { name: 'Express', status: 'proficient', note: 'Middleware routing & controllers' },
      { name: 'RESTful API Design', status: 'proficient', note: 'Clean contracts & semantic error handling' },
      { name: 'WebSockets', status: 'familiar', note: 'Bi-directional real-time telemetry streaming' },
      { name: 'PostgreSQL', status: 'proficient', highlight: true, note: 'Relational data modeling & indexing' },
      { name: 'MongoDB', status: 'familiar', note: 'Document schemas & aggregations' },
      { name: 'Redis', status: 'familiar', note: 'Caching & rate limiting' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure, DevOps & Tools',
    subtitle: 'Environments, Version Control & Tooling',
    description:
      'Orchestrating reproducible build pipelines, containerized environments, and disciplined software development practices.',
    skills: [
      { name: 'Git & GitHub', status: 'proficient', highlight: true, note: 'Branching, PRs & version management' },
      { name: 'Docker', status: 'familiar', note: 'Multi-stage container builds' },
      { name: 'Linux / Bash', status: 'proficient', note: 'Shell scripting & process monitoring' },
      { name: 'Vite / Tooling', status: 'proficient', note: 'Fast HMR & production bundle optimization' },
      { name: 'CI/CD (GitHub Actions)', status: 'familiar', note: 'Automated test & linting workflows' },
      { name: 'Vercel / Cloudflare', status: 'proficient', note: 'Edge deployments & static hosting' },
    ],
  },
]
