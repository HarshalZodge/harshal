export interface Project {
  id: string
  title: string
  subtitle: string
  tagline: string
  category: string
  filterCategory: 'ai-ml' | 'ai-agents' | 'fullstack' | 'backend-db'
  year: string
  featured: boolean
  description: string
  problemStatement: string
  features: string[]
  architectureHighlights: string[]
  technologies: string[]
  role: string
  liveUrl?: string
  githubUrl?: string
  futureImprovements: string[]
  metrics?: Array<{ label: string; value: string }>
  visualAccent: {
    gradient: string
    chromeTone: 'mercury' | 'obsidian' | 'silver' | 'gold'
  }
}

export const projects: Project[] = [
  {
    id: 'currencyvision-ai',
    title: 'CurrencyVision AI',
    subtitle: 'Indian Banknote Recognition using Deep Learning & Explainable AI',
    tagline: 'Deep CNN classifier and Grad-CAM explainable AI heatmaps identifying Indian currency denominations.',
    category: 'AI / Computer Vision',
    filterCategory: 'ai-ml',
    year: '2025 — 2026',
    featured: true,
    description:
      'A computer vision system designed to automatically identify, classify, and verify Indian banknote denominations (₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2000) using a custom 4-block Convolutional Neural Network (CNN) paired with Grad-CAM visual heatmaps.',
    problemStatement:
      'Visually impaired individuals and automated self-checkout kiosks face significant hurdles when verifying crumpled, folded, or poorly lit banknotes on resource-constrained computing hardware.',
    features: [
      'Custom 4-block CNN architecture initialized with He Normal weights and multi-stage Dropout (0.3 - 0.5) to prevent overfitting',
      'Explainable AI (Grad-CAM) activation heatmaps highlighting the exact spatial banknote features (numerals, security threads, watermarks) driving classification',
      'Integrated real-time webcam scanning interface and drag-and-drop banknote image uploader',
      'Multi-format audit-ready prediction reports exported dynamically in PDF, CSV, and JSON formats',
      'Interactive educational breakdown of official Reserve Bank of India (RBI) security features per denomination',
    ],
    architectureHighlights: [
      'Custom 4-tier Conv2D pipeline (32 -> 64 -> 128 -> 128 filters) with BatchNormalization and ReLU activations',
      'Grad-CAM gradient extraction targeting final convolutional layer for class-discriminative localization',
      'Streamlit-based responsive dashboard with dynamic glassmorphic theme styling',
      'Automated dataset scanner and preprocessing pipeline with illumination normalization',
    ],
    technologies: ['Python', 'CNN', 'Computer Vision', 'Machine Learning', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit', 'Grad-CAM'],
    role: 'Deep Learning & Computer Vision Engineer',
    githubUrl: 'https://github.com/harshalzodge/CurrencyVisionAI',
    futureImprovements: [
      'Quantized TensorFlow Lite (TFLite) compilation for sub-20ms edge deployment on Android and iOS mobile devices',
      'Audio-haptic feedback synthesis delivering spoken denomination guidance for visually impaired accessibility',
      'Micro-print ultraviolet watermark texture analysis for enhanced counterfeit detection',
    ],
    metrics: [
      { label: 'Classes', value: '7 Denominations' },
      { label: 'Architecture', value: '4-Block Custom CNN' },
      { label: 'Explainability', value: 'Grad-CAM Heatmaps' },
      { label: 'Audit Exports', value: 'PDF / CSV / JSON' },
    ],
    visualAccent: {
      gradient: 'from-purple-950 via-zinc-900 to-neutral-950',
      chromeTone: 'mercury',
    },
  },
  {
    id: 'careerpilot-ai',
    title: 'CareerPilot AI',
    subtitle: 'Autonomous Multi-Agent Career Coaching & Workflow Orchestration',
    tagline: 'Orchestrating career guidance, ATS resume evaluation, and roadmap planning through structured AI-agent graphs.',
    category: 'AI / AI Agents',
    filterCategory: 'ai-agents',
    year: '2025 — 2026',
    featured: true,
    description:
      'An enterprise-grade AI career assistance platform designed to organize end-to-end career guidance through structured AI-agent workflows. Orchestrated with LangGraph, specialized agents collaborate to analyze resumes, score ATS compatibility, identify skill gaps, and generate step-by-step learning roadmaps.',
    problemStatement:
      'Traditional career platforms offer disjointed, one-size-fits-all advice and static forms, lacking intelligent multi-stage reasoning to connect resume gaps directly to targeted interview questions and personalized learning trajectories.',
    features: [
      'Modular LangGraph workflow architecture coordinating specialized agents via an intelligent Supervisor Agent router',
      'Dedicated Agent Suite: Resume Agent, ATS Agent, Job Match Agent, Skill Gap Agent, Interview Coach Agent, Answer Evaluation Agent, and Roadmap Agent',
      'Centralized GeminiService with exponential backoff retries, safety controls, and real-time streaming token generation',
      'Interactive Career Copilot chat with streaming responses and contextual candidate session memory',
      'Enterprise career dossier exports generated in PDF (via ReportLab), DOCX, and JSON',
    ],
    architectureHighlights: [
      'LangGraph state graph with dynamic supervisor routing ensuring only required downstream agents are invoked',
      'Dataclass-backed candidate session memory managing profile documents, analysis results, and chat history',
      'RAG integration with FAISS vector store for semantic role requirements and syllabus alignment',
      'Structured SQLite persistence with centralized file-based operational logging',
    ],
    technologies: ['Python', 'Streamlit', 'LangGraph', 'AI Agents', 'Google Gemini', 'LangChain', 'FAISS', 'ReportLab'],
    role: 'AI Agent Architect & Lead Developer',
    githubUrl: 'https://github.com/harshalzodge/Career-AI',
    futureImprovements: [
      'Headless browser scraping daemon for real-time automated job portal indexing (currently powered by semantic FAISS embeddings)',
      'Automated 1-click tailored application dispatch with personalized cover letter generation',
      'Voice-based dynamic mock interview simulator using WebRTC audio streaming',
    ],
    metrics: [
      { label: 'Orchestrator', value: 'LangGraph' },
      { label: 'Agent Suite', value: '8 Specialized Agents' },
      { label: 'LLM Engine', value: 'Gemini 1.5 Pro' },
      { label: 'Vector Index', value: 'FAISS Semantic Store' },
    ],
    visualAccent: {
      gradient: 'from-blue-950 via-zinc-900 to-neutral-950',
      chromeTone: 'obsidian',
    },
  },
  {
    id: 'crime-record-management',
    title: 'Crime Record Management System',
    subtitle: 'Persistent Law Enforcement Dossier & Case Management Backend',
    tagline: 'Structured backend and cloud database platform for managing crime-related records and investigative dossiers.',
    category: 'Backend & Databases',
    filterCategory: 'backend-db',
    year: '2024 — 2025',
    featured: true,
    description:
      'A backend engineering project focused on managing crime-related records, FIR filings, suspect profiles, and evidence tracking with persistent database storage in MongoDB Atlas and role-based access management.',
    problemStatement:
      'Traditional precinct logbooks and un-indexed legacy databases lead to fragmented criminal records, delayed case coordination across jurisdictions, and vulnerability to unauthorized data alterations.',
    features: [
      'Modular backend application structure with clean separation of models, controllers, middleware, and route handlers',
      'MongoDB Atlas cloud database integration with compound indexing for rapid suspect lookup and case filtering',
      'Full CRUD operations for criminal profiles, incident FIR records, officer badge assignments, and investigation statuses',
      'Secure token-based authentication and Role-Based Access Control (RBAC) separating field officers from supervisors',
      'Input validation pipelines and sanitized REST API endpoints with structured JSON error responses',
    ],
    architectureHighlights: [
      'RESTful API architecture built on Node.js and Express with modular middleware chaining',
      'MongoDB Atlas cloud cluster with replica sets and schema validation rules',
      'Full-text search indexing on aliases, incident types, crime locations, and case numbers',
      'Centralized audit logging recording timestamped state transitions for all case updates',
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'MongoDB Atlas', 'REST API', 'JWT', 'Mongoose'],
    role: 'Backend & Database Developer',
    githubUrl: 'https://github.com/harshalzodge/crime-record-management',
    futureImprovements: [
      'Cryptographic SHA-256 chained audit logs ensuring mathematical tamper-evidence for judicial court admissibility',
      'Automated facial recognition integration matching suspect photos against archived incident mugshots',
      'Geospatial incident clustering and crime density heatmaps using GeoJSON coordinates',
    ],
    metrics: [
      { label: 'Database', value: 'MongoDB Atlas' },
      { label: 'Architecture', value: 'RESTful MVC' },
      { label: 'Access Control', value: 'JWT / Multi-Tier RBAC' },
      { label: 'Query Response', value: '<35ms Index Lookup' },
    ],
    visualAccent: {
      gradient: 'from-amber-950 via-zinc-900 to-neutral-950',
      chromeTone: 'gold',
    },
  },
  {
    id: 'blinkit-clone',
    title: 'Blinkit Storefront & Quick-Commerce UI',
    subtitle: 'Sub-10-Minute Delivery Storefront & Real-Time Cart State Architecture',
    tagline: 'High-speed quick-commerce web application featuring responsive product rails and instant cart synchronization.',
    category: 'Full-Stack Development',
    filterCategory: 'fullstack',
    year: '2025',
    featured: false,
    description:
      'An industrial practice project completed under the Pregrad mentorship program (Credential ID PCC2528). Replicates the Blinkit quick-commerce storefront experience with sub-10-minute delivery estimation, dynamic category switching, instant cart addition, and responsive mobile-first checkout flows.',
    problemStatement:
      'Quick-commerce platforms demand zero-latency micro-interactions: adding items, updating quantities, and computing discounts must happen instantaneously without layout shifts or cart desynchronization.',
    features: [
      'Responsive, component-based frontend engineering using React and Tailwind CSS with high-density grocery grids',
      'Real-time global cart state synchronization with dynamic subtotal, delivery partner fee, and packing charges',
      'Instant category drawer navigation (Vegetables, Dairy, Snacks, Instant Foods) with client-side search filtering',
      'Delivery estimation indicator with animated ETA badges and address selector',
      'Certified industrial project completed under Pregrad mentorship curriculum',
    ],
    architectureHighlights: [
      'React Context API state management with LocalStorage persistence for seamless cart recovery across sessions',
      'Optimistic UI state updates for immediate click response on quantity incrementors',
      'Component-based modular architecture cleanly dividing navigation, item cards, and checkout drawers',
    ],
    technologies: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Context API', 'LocalStorage'],
    role: 'Frontend & Full-Stack Developer',
    githubUrl: 'https://github.com/harshalzodge/blinkit-clone',
    futureImprovements: [
      'Integration with Razorpay / Stripe payment gateway sandbox for end-to-end checkout processing',
      'Live WebSocket rider tracking simulation on an interactive Mapbox canvas',
    ],
    metrics: [
      { label: 'Certification', value: 'Pregrad PCC2528' },
      { label: 'Interaction Latency', value: '<16ms Instant' },
      { label: 'State Sync', value: 'Persistent Local-First' },
      { label: 'Design System', value: 'Mobile-First Tailwind' },
    ],
    visualAccent: {
      gradient: 'from-emerald-950 via-zinc-900 to-neutral-950',
      chromeTone: 'silver',
    },
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Streaming UI & Architecture',
    subtitle: 'Fluid Video Streaming Platform Interface & Dynamic Carousel Rails',
    tagline: 'Pixel-perfect streaming platform interface featuring horizontal carousel rails and responsive hero billboards.',
    category: 'Full-Stack Development',
    filterCategory: 'fullstack',
    year: '2025',
    featured: false,
    description:
      'A certified industrial project completed under the Pregrad mentorship program (Credential ID PCC2552). Re-engineers the Netflix web streaming client with fluid horizontal carousel rails, animated modal overviews, responsive video billboard headers, and TMDB REST API media integration.',
    problemStatement:
      'Video streaming interfaces require careful asset handling to render thousands of media posters smoothly across viewports without causing browser memory bloat or scroll stutter.',
    features: [
      'Responsive video billboard hero showcasing featured titles with dynamic play/info triggers and mute controls',
      'Touch-enabled horizontal carousel rails with smooth GPU-accelerated transforms and hover expand physics',
      'Interactive movie detail modal with synopsis, age certification ratings, runtime, and genre tags',
      'Integration with TMDB REST API endpoints populating trending, top-rated, and genre-specific films',
      'Certified industrial project completed under Pregrad mentorship curriculum',
    ],
    architectureHighlights: [
      'Custom React hooks handling media fetching, carousel sliding, and window resize debouncing',
      'Optimized image loading pipeline with fallback skeleton placeholders preventing layout shifts',
      'High-contrast Netflix dark theme with subtle vignette gradients and typography matching the original brand',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'TMDB REST API', 'Framer Motion'],
    role: 'Frontend & UI Engineer',
    githubUrl: 'https://github.com/harshalzodge/netflix-clone',
    futureImprovements: [
      'Adaptive bitrate video playback using HLS.js and custom HTML5 video controls',
      'Personalized collaborative filtering recommendation engine based on user watch history',
    ],
    metrics: [
      { label: 'Certification', value: 'Pregrad PCC2552' },
      { label: 'Media Source', value: 'TMDB REST API' },
      { label: 'Animation', value: '60 FPS GPU Rails' },
      { label: 'Responsiveness', value: 'Mobile / Tablet / 4K' },
    ],
    visualAccent: {
      gradient: 'from-red-950 via-zinc-900 to-neutral-950',
      chromeTone: 'obsidian',
    },
  },
  {
    id: 'minicloud-hdfs',
    title: 'MiniCloud: Private Cloud Storage SaaS',
    subtitle: 'On-Premise LAN Cloud Storage SaaS with Custom WebHDFS Orchestration',
    tagline: 'Private multi-tenant cloud storage platform orchestrated with a custom Python Cloud Controller and Apache Hadoop HDFS.',
    category: 'Cloud & Distributed Systems',
    filterCategory: 'backend-db',
    year: '2025 — 2026',
    featured: false,
    description:
      'An on-premise Software as a Service (SaaS) cloud storage platform engineered to deliver Google Drive-style file synchronization across institutional laboratory LANs. Features a custom Python/Flask Cloud Controller mediating storage quotas, virtual hierarchies, and Apache Hadoop HDFS block transfers via WebHDFS.',
    problemStatement:
      'Academic laboratories frequently lack high-capacity private storage for student datasets and project files, while public cloud storage incurs high recurring subscription fees and external bandwidth bottlenecks.',
    features: [
      'Custom Cloud Controller built in Python and Flask mediating storage operations, user quotas, and WebHDFS block transfers',
      'Virtual multi-tenant folder hierarchies in SQLite decoupled from physical block storage via flat UUID naming abstractions',
      'Atomic 6-step upload consistency protocol with automatic rollbacks ensuring zero orphaned blocks upon transmission failure',
      'Single-port LAN deployment on Windows via Waitress (`http://<HOST_IP>:5000`) enabling universal browser accessibility',
      'Administrative telemetry pulling live DataNode status, block counts, and storage pool metrics from NameNode JMX endpoints',
    ],
    architectureHighlights: [
      'Python Flask REST API with JWT authentication and database token blocklists',
      'WebHDFS RFC-compliant streaming upload and download protocol avoiding client-side Hadoop installations',
      'Abstract storage engine supporting production HDFS clusters and offline development mock filesystems',
    ],
    technologies: ['Python', 'Flask', 'Apache Hadoop HDFS', 'WebHDFS', 'React', 'SQLite', 'Waitress', 'Tailwind CSS'],
    role: 'Cloud Systems Architect & Backend Developer',
    githubUrl: 'https://github.com/harshalzodge/minicloud-hdfs',
    futureImprovements: [
      'End-to-end AES-256 client-side file encryption before HDFS block dispatch',
      'Multi-node automated HDFS block replication rebalancing daemon',
    ],
    metrics: [
      { label: 'Protocol', value: 'WebHDFS REST API' },
      { label: 'Storage Engine', value: 'Apache Hadoop 3.3.6' },
      { label: 'Upload Protocol', value: 'Atomic 6-Step Rollback' },
      { label: 'Deployment', value: 'Single-Port LAN SaaS' },
    ],
    visualAccent: {
      gradient: 'from-cyan-950 via-zinc-900 to-neutral-950',
      chromeTone: 'mercury',
    },
  },
  {
    id: 'civic-resolve',
    title: 'CivicResolve',
    subtitle: 'Autonomous AI Civic Grievance Triage & Redressal Pipeline',
    tagline: 'Automating municipal complaint classification and department dispatch with localized language models and pgvector.',
    category: 'AI Systems / Full-Stack',
    filterCategory: 'ai-agents',
    year: '2025',
    featured: false,
    description:
      'A full-stack intelligence platform that ingests unstructured municipal grievances across regional dialects, vectorizes citizen statements, automatically classifies urgency, and dispatches tickets to relevant municipal departments.',
    problemStatement:
      'Municipal grievance desks often struggle with massive backlogs of unstructured complaints, resulting in critical water, power, or road safety hazards sitting unassigned for days.',
    features: [
      'Multi-tier categorization pipeline utilizing fine-tuned transformer models to extract geolocation, urgency, and category tags',
      'HuggingFace Transformer embeddings stored in pgvector for semantic duplicate detection in sub-100ms',
      'FastAPI async backend paired with background task workers for concurrent document analysis',
      'Role-based access control with audit trails for municipal administrative oversight',
    ],
    architectureHighlights: [
      'FastAPI async ASGI backend paired with Celery task queues for concurrent report ingestion',
      'pgvector cosine similarity search deduplicating hyper-local incident reports in sub-100ms',
      'Leaflet geospatial density map visualizer rendering hot-spot cluster overlays',
    ],
    technologies: ['FastAPI', 'Python', 'pgvector', 'PostgreSQL', 'LangChain', 'React', 'TypeScript', 'Tailwind CSS'],
    role: 'AI Systems Architect & Full-Stack Developer',
    githubUrl: 'https://github.com/harshalzodge/civic-pulse',
    futureImprovements: [
      'Automated multi-lingual voice-to-text dispatch in regional Marathi and Hindi dialects',
      'Computer vision verification cross-checking citizen pothole and waterlogging photo severity',
    ],
    metrics: [
      { label: 'Triage Latency', value: '<350ms' },
      { label: 'Vector Store', value: 'PostgreSQL pgvector' },
      { label: 'Deduplication', value: 'Semantic Cosine' },
      { label: 'Backend', value: 'FastAPI Async ASGI' },
    ],
    visualAccent: {
      gradient: 'from-zinc-900 via-neutral-900 to-zinc-950',
      chromeTone: 'silver',
    },
  },
]
