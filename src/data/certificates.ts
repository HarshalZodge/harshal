export interface Certificate {
  id: string
  title: string
  issuer: string
  issuerBadge: string
  program?: string
  issueDate: string
  validUntil?: string
  credentialId?: string
  category: 'AI & Autonomous Agents' | 'Full-Stack & Web' | 'Cloud & Distributed Systems' | 'Data & Analytics'
  skills: string[]
  description: string
  highlights: string[]
  pdfUrl: string
  verificationUrl?: string
  status: 'Verified'
  badgeColor?: string
}

export const certificates: Certificate[] = [
  {
    id: 'oracle-agentic-ai',
    title: 'Oracle Certified Foundations Associate — Agentic AI',
    issuer: 'Oracle University / Oracle Corporation',
    issuerBadge: 'ORACLE',
    program: 'Oracle Certification Program (1Z0-1135-26-ENU)',
    issueDate: 'August 17, 2026',
    validUntil: 'August 17, 2028',
    credentialId: '330673475AAI26OFA',
    category: 'AI & Autonomous Agents',
    skills: [
      'Agentic AI Architectures',
      'Autonomous Multi-Agent Loops',
      'Model Context Protocol (MCP)',
      'Enterprise RAG & Embeddings',
      'LLM Tool Calling & Routing',
      'Vector Search on OCI',
    ],
    description:
      'Official Oracle Corporation certification validating foundational expertise in autonomous Agentic AI systems, dynamic tool-calling loops, retrieval-augmented generation (RAG), vector embeddings, and enterprise AI orchestration.',
    highlights: [
      'Validated understanding of autonomous agents, reflection patterns, and multi-agent coordination loops',
      'Architectural mastery of Model Context Protocol (MCP) and standardized LLM tool-calling interfaces',
      'Enterprise RAG pipelines with vector databases, cosine similarity, and low-latency retrieval',
      'Confirmed validity: August 17, 2026 through August 17, 2028',
    ],
    pdfUrl: '/certificates/oracle-agentic-ai.pdf',
    verificationUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=330673475AAI26OFA',
    status: 'Verified',
    badgeColor: '#C74634',
  },
  {
    id: 'pregrad-full-stack',
    title: 'Full Stack Development Mentorship',
    issuer: 'Pregrad',
    issuerBadge: 'PREGRAD',
    program: 'Three-Month Industrial Mentorship Track',
    issueDate: 'February 25, 2026',
    credentialId: 'AF225AB0B8A5',
    category: 'Full-Stack & Web',
    skills: [
      'Full-Stack Architecture',
      'React & TypeScript',
      'Node.js & Express',
      'REST API Design',
      'Database Modeling & PostgreSQL',
      'State Management & Deployment',
    ],
    description:
      'Completed an intensive three-month industrial mentorship program covering end-to-end full-stack web engineering, scalable client-server architectures, database normalization, and robust production deployment.',
    highlights: [
      'Engineered production-grade web applications with modern React, TypeScript, and Node.js backends',
      'Designed normalized relational database schemas with atomic transactional operations',
      'Implemented secure JWT-based authentication, role-based access control, and API error boundaries',
    ],
    pdfUrl: '/certificates/pregrad-full-stack.pdf',
    status: 'Verified',
    badgeColor: '#6366F1',
  },
  {
    id: 'pregrad-ai-ml',
    title: 'Artificial Intelligence with ML',
    issuer: 'Pregrad',
    issuerBadge: 'PREGRAD',
    program: 'Three-Month Industrial Mentorship Program',
    issueDate: 'August 16, 2026',
    credentialId: 'PREG-37C1B69290D3',
    category: 'AI & Autonomous Agents',
    skills: [
      'Machine Learning',
      'Deep Learning & CNNs',
      'Computer Vision (OpenCV)',
      'TensorFlow & Keras',
      'Feature Engineering',
      'Model Optimization & Deployment',
    ],
    description:
      'Completed a rigorous three-month hands-on industrial mentorship focused on applied machine learning pipelines, deep convolutional neural network architectures, edge computer vision, and real-time model deployment.',
    highlights: [
      'Built and trained custom CNN architectures from scratch with data augmentation and dropout regularization',
      'Implemented explainable AI activation visualizers (Grad-CAM) to inspect neural network decision boundaries',
      'Developed real-world computer vision pipelines for automated object and banknote recognition',
    ],
    pdfUrl: '/certificates/pregrad-ai-ml.pdf',
    status: 'Verified',
    badgeColor: '#8B5CF6',
  },
  {
    id: 'simplilearn-n8n',
    title: 'n8n: No-Code AI Agent Builder',
    issuer: 'Simplilearn SkillUp & AI-GPTWorkshop',
    issuerBadge: 'SIMPLILEARN',
    issueDate: 'December 25, 2025',
    credentialId: '9636571',
    category: 'AI & Autonomous Agents',
    skills: [
      'n8n Workflow Automation',
      'Autonomous AI Agent Nodes',
      'Webhook Event Triggers',
      'LLM Node Orchestration',
      'API Integration & Pipelines',
    ],
    description:
      'Certified in constructing autonomous AI agent workflows, multi-step LLM reasoning pipelines, automated webhook event triggers, and complex API connectors using the n8n automation engine.',
    highlights: [
      'Engineered automated agent workflows combining multi-modal inputs, memory buffers, and output dispatch',
      'Connected third-party SaaS endpoints, vector stores, and custom LLM reasoning nodes',
      'Built production-ready event triggers handling bi-directional webhook payloads',
    ],
    pdfUrl: '/certificates/simplilearn-n8n.pdf',
    status: 'Verified',
    badgeColor: '#EA580C',
  },
  {
    id: 'ibm-web-development',
    title: 'Web Development Basics',
    issuer: 'IBM (IBM SkillsBuild)',
    issuerBadge: 'IBM',
    program: 'Course Completion Certificate (ALM-COURSE_4058937)',
    issueDate: 'March 15, 2026',
    credentialId: 'ALM-COURSE_4058937',
    category: 'Full-Stack & Web',
    skills: [
      'Web Engineering Fundamentals',
      'Semantic HTML5 & CSS3',
      'DOM Manipulation',
      'Responsive Web Architecture',
      'Client-Side Scripting',
    ],
    description:
      'Certified by IBM SkillsBuild in modern web engineering foundations, semantic markup standards, DOM manipulation, responsive interface architecture, and accessible client-side programming.',
    highlights: [
      'Mastered modern standards-compliant web development practices and responsive viewport scaling',
      'Implemented accessible, accessible semantic structures with high-contrast color systems',
      'Built component-driven browser interfaces with clean separation of layout and logic',
    ],
    pdfUrl: '/certificates/ibm-web-development.pdf',
    status: 'Verified',
    badgeColor: '#0F62FE',
  },
  {
    id: 'pregrad-blinkit-clone',
    title: 'Blinkit Clone — Industrial Project Completion',
    issuer: 'Pregrad',
    issuerBadge: 'PREGRAD',
    program: 'Industrial Project Track',
    issueDate: '2025',
    credentialId: 'PCC2528',
    category: 'Full-Stack & Web',
    skills: [
      'Quick-Commerce Architecture',
      'Real-Time Cart & Inventory',
      'React State Management',
      'Storefront UI/UX Design',
      'Sub-10-Minute Dispatch Logic',
    ],
    description:
      'Official industrial project completion credential for engineering a high-speed quick-commerce Blinkit clone, implementing real-time cart state, dynamic catalog navigation, and responsive mobile-first checkout flows.',
    highlights: [
      'Architected responsive product catalog with rapid category switching and visual search filters',
      'Engineered global cart state synchronization with quantity incrementors and delivery fee math',
      'Designed sub-10-minute delivery estimation and ETA visualizer',
    ],
    pdfUrl: '/certificates/pregrad-blinkit-clone.pdf',
    status: 'Verified',
    badgeColor: '#10B981',
  },
  {
    id: 'pregrad-netflix-ui',
    title: 'Netflix UI Design & Architecture',
    issuer: 'Pregrad',
    issuerBadge: 'PREGRAD',
    program: 'Industrial Project Track',
    issueDate: '2025',
    credentialId: 'PCC2552',
    category: 'Full-Stack & Web',
    skills: [
      'Streaming Platform UI/UX',
      'Dynamic Carousel Rails',
      'Hero Video Billboard Layout',
      'Asset Optimization & Caching',
      'Responsive Media Layouts',
    ],
    description:
      'Certified industrial project demonstrating precision engineering of a Netflix-style video streaming interface, featuring fluid horizontal movie rails, animated modal overviews, and responsive video billboard headers.',
    highlights: [
      'Engineered touch-enabled horizontal scrolling carousels with smooth GPU-accelerated transforms',
      'Implemented dynamic video trailer preview overlays with metadata cards and genre tags',
      'Optimized media poster loading with layout-shift prevention and fallback skeletons',
    ],
    pdfUrl: '/certificates/pregrad-netflix-ui.pdf',
    status: 'Verified',
    badgeColor: '#E50914',
  },
  {
    id: 'microsoft-business-analytics',
    title: 'Business Analytics with Excel',
    issuer: 'Microsoft & Simplilearn SkillUp',
    issuerBadge: 'MICROSOFT',
    issueDate: 'January 29, 2026',
    credentialId: '9777624',
    category: 'Data & Analytics',
    skills: [
      'Business Data Analytics',
      'Statistical Modeling',
      'Exploratory Data Analysis (EDA)',
      'KPI Telemetry & Dashboards',
      'Financial Modeling & Forecasting',
    ],
    description:
      'Certified in end-to-end business data analytics, statistical hypothesis testing, exploratory data analysis (EDA), and executive KPI metrics synthesis powered by Microsoft and Simplilearn.',
    highlights: [
      'Formulated mathematical regression models and predictive scenario analysis',
      'Synthesized multi-dimensional business performance metrics into actionable executive summaries',
      'Built automated data validation pipelines and pivot modeling for real-world business cases',
    ],
    pdfUrl: '/certificates/microsoft-business-analytics.pdf',
    status: 'Verified',
    badgeColor: '#00A4EF',
  },
  {
    id: 'officemaster-powerbi',
    title: 'AI-Powered Interactive PowerBI Dashboards',
    issuer: 'OfficeMaster',
    issuerBadge: 'OFFICEMASTER',
    issueDate: 'February 1, 2026',
    category: 'Data & Analytics',
    skills: [
      'Power BI Data Modeling',
      'DAX Expressions & Measures',
      'Interactive Visual Dashboards',
      'AI Insights & Key Influencers',
      'Cross-Source ETL Integration',
    ],
    description:
      'Validated competency in architecting real-time AI-powered executive dashboards, DAX queries, predictive key influencer charts, and multi-source ETL data visualization.',
    highlights: [
      'Constructed dynamic DAX measures computing running totals, year-over-year growth, and rolling averages',
      'Integrated AI decomposition trees and sentiment indicators to highlight underlying data drivers',
      'Designed high-contrast, executive-ready dashboard themes with interactive cross-filtering',
    ],
    pdfUrl: '/certificates/officemaster-powerbi.pdf',
    status: 'Verified',
    badgeColor: '#F59E0B',
  },
  {
    id: 'ieee-ebsco-training',
    title: 'IEEE Training on "IEEE Xplore" Research Systems',
    issuer: 'EBSCO Information Services & IEEE Authorized Dealer',
    issuerBadge: 'IEEE',
    program: 'Official IEEE Academic Research Certification',
    issueDate: 'August 18, 2026',
    category: 'Data & Analytics',
    skills: [
      'IEEE Xplore Digital Library',
      'Academic Literature Mining',
      'Peer-Reviewed Research Taxonomy',
      'Technical Citation Analysis',
      'Research Query Synthesis',
    ],
    description:
      'Official IEEE training covering advanced research query syntax, literature taxonomy discovery, peer-reviewed citation mining, and state-of-the-art technical literature exploration across IEEE standards and conference proceedings.',
    highlights: [
      'Applied boolean and proximity search operators to extract targeted peer-reviewed computer science literature',
      'Analyzed citation metrics, author h-indices, and technological patent linkages',
      'Synthesized prior research methodologies to inform applied AI engineering projects',
    ],
    pdfUrl: '/certificates/ieee-ebsco-training.pdf',
    status: 'Verified',
    badgeColor: '#00629B',
  },
]
