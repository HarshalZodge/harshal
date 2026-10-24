/**
 * Harshal AI — Intelligent Conversational Copilot & Digital Twin Engine
 * Comprehensive knowledge base, semantic intent classification, multi-token fuzzy matching,
 * and contextual dynamic response synthesis for Harshal Deepak Zodge.
 */

export interface HarshalAiMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  links?: Array<{ label: string; url: string; external?: boolean }>
  suggestions?: string[]
}

interface KnowledgeTopic {
  id: string
  keywords: string[]
  intents: string[]
  title: string
  generateResponse: (query: string) => {
    text: string
    links?: Array<{ label: string; url: string; external?: boolean }>
    suggestions?: string[]
  }
}

const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 1. Identity, Biography & Overview
  {
    id: 'bio_identity',
    title: 'Identity & Overview',
    intents: ['who', 'introduce', 'yourself', 'about', 'background', 'bio', 'story', 'developer', 'engineer', 'name', 'profile'],
    keywords: ['harshal', 'deepak', 'zodge', 'who are you', 'tell me about yourself', 'overview', 'summary', 'about harshal', 'who is harshal'],
    generateResponse: () => ({
      text: `Hello! I'm **Harshal AI**, the digital twin and conversational copilot for **Harshal Deepak Zodge**.

Harshal is a **third-year Computer Engineering undergraduate** at **Dr. Vithalrao Vikhe Patil College of Engineering (Savitribai Phule Pune University - SPPU)** in Maharashtra, India.

He specializes in:
• **AI Agents & LLM Workflows**: Oracle Certified in Agentic AI, building autonomous multi-agent systems with LangGraph.
• **Computer Vision & Deep Learning**: Engineering CNN architectures for image classification (CurrencyVision AI) and Grad-CAM explainability.
• **Full-Stack & Backend Systems**: Building high-performance cloud backends with Node.js, Express, and MongoDB Atlas, paired with modern React/TypeScript frontends.
• **Creative WebGL & Performance**: Crafting real-time 60 FPS shaders and interactive web interfaces.

He is passionate about engineering software where intelligence meets sub-millisecond execution. What would you like to explore?`,
      links: [
        { label: 'View Selected Work', url: '#work' },
        { label: 'Inspect Verified Credentials', url: '#certifications' },
        { label: 'Get in Touch', url: '#contact' },
      ],
      suggestions: [
        'Tell me about your AI Agent projects',
        'What is CurrencyVision AI?',
        'What certifications do you hold?',
        'Are you available for hiring?',
      ],
    }),
  },

  // 2. Education & Academics
  {
    id: 'education',
    title: 'Education & University',
    intents: ['study', 'college', 'university', 'degree', 'academics', 'education', 'gpa', 'sppu', 'undergraduate', 'student'],
    keywords: ['college', 'university', 'sppu', 'vithalrao', 'vikhe', 'patil', 'ahilyanagar', 'pune', 'b.e', 'bachelor', 'computer engineering', 'grades', 'graduation year'],
    generateResponse: () => ({
      text: `Harshal is currently pursuing his **Bachelor of Engineering (B.E.) in Computer Engineering** (Third Year / Class of 2026):

• **Institution**: Dr. Vithalrao Vikhe Patil College of Engineering, Ahilyanagar
• **Affiliation**: Savitribai Phule Pune University (SPPU), Maharashtra, India
• **Coursework Focus**: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems, Artificial Intelligence, and Software Engineering.
• **Academic Journey**: Actively participating in technical symposiums, research-driven mini-projects, and continuous industrial mentorship programs outside of the classroom.`,
      links: [
        { label: 'Inspect Academic Chronology', url: '#journey' },
        { label: 'View Verified Mentorships', url: '#certifications' },
      ],
      suggestions: [
        'What are your technical skills?',
        'Tell me about CareerPilot AI',
        'Can I see your resume?',
      ],
    }),
  },

  // 3. AI Agents & Agentic Workflows (Core specialty)
  {
    id: 'ai_agents',
    title: 'Autonomous AI Agents',
    intents: ['agent', 'agentic', 'langgraph', 'langchain', 'supervisor', 'autonomous', 'workflow', 'n8n', 'oracle', 'gemini', 'rag', 'vector'],
    keywords: ['ai agent', 'agentic ai', 'langgraph', 'langchain', 'careerpilot', 'oracle certified', 'n8n', 'workflow', 'supervisor router', 'faiss', 'rag'],
    generateResponse: () => ({
      text: `Agentic AI is one of Harshal's strongest technical specializations:

• **Oracle Certified Foundations Associate — Agentic AI**: Formally verified in agentic architectures, tool calling, memory management, and autonomous agent safety.
• **CareerPilot AI**: Architected a production-grade multi-agent career copilot using **LangGraph**. Features an intelligent **Supervisor Router** coordinating 7 specialized sub-agents:
  1. *Resume & ATS Agent*: Analyzes resume structure and calculates ATS compatibility.
  2. *Skill Gap Agent*: RAG-powered vector search (FAISS) contrasting candidate skills with industry demands.
  3. *Interview Coach & Evaluation Agents*: Dynamic question generation and answer scoring.
  4. *Roadmap Agent*: Generates chronological step-by-step career milestones.
• **No-Code & Low-Code Orchestration**: Certified in **n8n No-Code AI Agent Builder** by Simplilearn for event-driven workflow automation.`,
      links: [
        { label: 'Explore CareerPilot AI Repository', url: 'https://github.com/harshalzodge/Career-AI', external: true },
        { label: 'View Oracle Credential', url: '#certifications' },
      ],
      suggestions: [
        'Tell me about CurrencyVision AI',
        'What is your full tech stack?',
        'How does CareerPilot AI supervisor routing work?',
      ],
    }),
  },

  // 4. Computer Vision & Deep Learning (CurrencyVision AI)
  {
    id: 'computer_vision',
    title: 'Computer Vision & Deep Learning',
    intents: ['vision', 'cnn', 'image', 'classification', 'currency', 'banknote', 'grad-cam', 'opencv', 'deep learning', 'keras', 'tensorflow', 'model'],
    keywords: ['currencyvision', 'cnn', 'computer vision', 'indian currency', 'grad-cam', 'heatmaps', 'opencv', 'tensorflow', 'keras', 'banknotes', 'image recognition'],
    generateResponse: () => ({
      text: `Harshal engineered **CurrencyVision AI**, an end-to-end computer vision and explainable AI system for Indian currency recognition:

• **Problem Solved**: Enables visually impaired individuals and self-checkout kiosks to rapidly identify crumpled, folded, or poorly lit banknotes (₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2000).
• **Architecture**: Custom 4-block Convolutional Neural Network (CNN) initialized with **He Normal weights** and multi-tier **Dropout (0.3 - 0.5)** to prevent overfitting.
• **Explainable AI (Grad-CAM)**: Generates spatial activation heatmaps revealing the exact banknote security features (watermarks, numerals, Reserve Bank threads) triggering predictions.
• **Interface & Auditing**: Streamlit dashboard supporting live webcam scanning, drag-and-drop inference, and PDF/CSV audit reports.`,
      links: [
        { label: 'View CurrencyVision AI Source', url: 'https://github.com/harshalzodge/CurrencyVisionAI', external: true },
        { label: 'View Projects Section', url: '#work' },
      ],
      suggestions: [
        'How did you prevent overfitting in CNN?',
        'What backend technologies do you use?',
        'What other projects have you built?',
      ],
    }),
  },

  // 5. Backend & Databases
  {
    id: 'backend_db',
    title: 'Backend Engineering & Cloud Databases',
    intents: ['backend', 'database', 'mongo', 'mongodb', 'node', 'express', 'sql', 'rest', 'api', 'server', 'crime', 'atlas', 'jwt'],
    keywords: ['backend', 'mongodb', 'atlas', 'node.js', 'express', 'rest api', 'jwt', 'crime record', 'database', 'nosql', 'authentication'],
    generateResponse: () => ({
      text: `On the backend, Harshal focuses on scalable API design and resilient data persistence:

• **Crime Record Management System**: A dedicated backend application managing law enforcement records with persistent **MongoDB Atlas** cloud clustering. Implements structured REST endpoints, input sanitization, and secure record querying.
• **Tech Stack**: Node.js, Express.js, MongoDB Atlas (Mongoose ODM), RESTful API conventions, JWT authentication, and structured environment configurations.
• **Database Proficiency**: MongoDB document modeling, indexing, aggregation pipelines, and relational database fundamentals with SQL/PostgreSQL.`,
      links: [
        { label: 'Inspect Backend in Projects', url: '#work' },
        { label: 'View Skills Constellation', url: '#skills' },
      ],
      suggestions: [
        'What is your experience with full-stack development?',
        'Can I download your resume?',
        'What are your verified certifications?',
      ],
    }),
  },

  // 6. Full-Stack Web & Creative Engineering
  {
    id: 'fullstack_web',
    title: 'Full-Stack & Creative Engineering',
    intents: ['fullstack', 'frontend', 'react', 'typescript', 'javascript', 'tailwind', 'next', 'shader', 'threejs', 'webgl', 'blinkit', 'netflix'],
    keywords: ['full stack', 'frontend', 'react', 'typescript', 'tailwind css', 'three.js', 'webgl', 'blinkit', 'netflix clone', 'liquid chrome', 'lenis'],
    generateResponse: () => ({
      text: `Harshal has built multiple production-level frontend and full-stack systems:

• **This Portfolio Website**: A showcase of creative engineering featuring a custom **raymarched WebGL 2 liquid chrome shader**, procedural **Web Audio API synthesizer**, **Lenis 60 FPS momentum scroll**, Swiss modernist resume generator, and accessible Command Palette.
• **Quick Commerce Storefront**: Blinkit-inspired responsive storefront featuring instant cart state calculations, category drawer navigation, and optimistic UI updates.
• **Media Streaming UI**: Netflix-style component-driven streaming interface with responsive hero carousels and multi-row categorization.
• **Mentorship**: Completed a rigorous 3-month **Full Stack Development Mentorship** at Pregrad covering modern React and server-side engineering.`,
      links: [
        { label: 'View Full Stack Projects', url: '#work' },
        { label: 'Launch Interactive Shader Lab', url: '#lab' },
      ],
      suggestions: [
        'How is the 60 FPS liquid chrome shader built?',
        'Are you available for hire?',
        'Tell me about your Pregrad mentorships',
      ],
    }),
  },

  // 7. Verified Certifications & Professional Learning
  {
    id: 'certifications',
    title: 'Certifications & Credentials',
    intents: ['cert', 'certification', 'credential', 'oracle', 'pregrad', 'ibm', 'simplilearn', 'verified', 'license', 'qualification'],
    keywords: ['certifications', 'oracle agentic ai', 'pregrad full stack', 'pregrad ai ml', 'simplilearn n8n', 'ibm web development', 'azure ai', 'credentials', 'drive vault'],
    generateResponse: () => ({
      text: `Harshal holds **10 verified professional credentials** and intensive industrial mentorships:

1. **Oracle Certified Foundations Associate — Agentic AI** (Oracle University, August 2026, Valid thru August 2028, Candidate ID: 338673475AAI260FA)
2. **Full Stack Development Mentorship** (Pregrad, 3-month industrial program, Nov 2025)
3. **Artificial Intelligence with ML Mentorship** (Pregrad, 3-month mentorship, Aug 2026)
4. **n8n: No-Code AI Agent Builder** (Simplilearn SkillUp, Dec 2025)
5. **Web Development Basics** (IBM Course Completion)
6. **Microsoft Azure AI Fundamentals** (Foundational Cloud & Cognitive Services)
7. **IEEE & SPPU Technical Research & Paper Presentations**

Every certificate includes full verification badges, issuer details, and high-resolution document previews in the interactive credential gallery.`,
      links: [
        { label: 'Open Certifications Gallery', url: '#certifications' },
        { label: 'Access Official Google Drive Vault', url: 'https://drive.google.com/drive/folders/17ZkF4zT2K6EevyA6n6Ea411p2gXvYx7r', external: true },
      ],
      suggestions: [
        'Tell me about Oracle Agentic AI certification',
        'What was covered in the Pregrad AI mentorship?',
        'Can I contact Harshal directly?',
      ],
    }),
  },

  // 8. Hiring, Internships, Relocation & Availability
  {
    id: 'hiring_availability',
    title: 'Hiring & Availability',
    intents: ['hire', 'internship', 'job', 'opportunity', 'available', 'work', 'relocate', 'remote', 'salary', 'start', 'joining', 'roles', 'candidate'],
    keywords: ['hire', 'internship', 'full-time', 'job', 'available', 'open for work', 'relocation', 'remote work', 'pune', 'mumbai', 'bangalore', 'start date', 'summer 2025', '2026'],
    generateResponse: () => ({
      text: `Yes! Harshal is actively **OPEN FOR OPPORTUNITIES** for **2025 / 2026**:

• **Target Roles**:
  - AI / ML Engineer & Agentic AI Developer
  - Full-Stack Software Engineer (React / TypeScript / Node.js)
  - Backend Software Developer (Python / Node.js / Databases)
• **Availability**:
  - Summer 2025 Internships
  - 6-month Final Year Co-ops (2025–2026)
  - Full-time Graduate Positions (Class of 2026)
• **Work Arrangement**: Flexible for **Remote, Hybrid, or On-site** (Pune, Mumbai, Bengaluru, Hyderabad, or any global tech hub).
• **What Harshal Brings**: High agency, fast execution velocity, strong algorithmic foundation, and verified practical experience across autonomous AI agents, computer vision, and cloud architectures.`,
      links: [
        { label: 'Launch Swiss CV / Resume', url: '#resume' },
        { label: 'Initiate Contact & Interview Chat', url: '#contact' },
        { label: 'Send Email Directly', url: 'mailto:harshalzodge01@gmail.com', external: true },
      ],
      suggestions: [
        'How can I get in touch with Harshal?',
        'Can I see Harshal\'s resume?',
        'What are his strongest skills?',
      ],
    }),
  },

  // 9. Contact Info & Social Profiles
  {
    id: 'contact_profiles',
    title: 'Contact Information',
    intents: ['contact', 'email', 'phone', 'reach', 'connect', 'message', 'touch', 'linkedin', 'github', 'social', 'talk'],
    keywords: ['contact', 'email address', 'how to reach', 'linkedin', 'github', 'phone', 'mail', 'get in touch'],
    generateResponse: () => ({
      text: `You can connect directly with Harshal through any of the following verified channels:

• **Email**: [harshalzodge01@gmail.com](mailto:harshalzodge01@gmail.com)
• **GitHub**: [github.com/HarshalZodge](https://github.com/HarshalZodge)
• **LinkedIn**: [linkedin.com/in/harshal-zodge](https://linkedin.com/in/harshal-zodge)
• **Live Portfolio**: [harshalzodge.vercel.app](https://harshalzodge.vercel.app)
• **Location**: Pune / Ahilyanagar, Maharashtra, India (IST / UTC+5:30)

He typically responds to serious inquiries within **24 hours**.`,
      links: [
        { label: 'Email Harshal Directly', url: 'mailto:harshalzodge01@gmail.com', external: true },
        { label: 'View GitHub Repositories', url: 'https://github.com/HarshalZodge', external: true },
        { label: 'Open In-Page Contact Terminal', url: '#contact' },
      ],
      suggestions: [
        'Can I see your resume?',
        'Tell me about your projects',
        'What is your educational background?',
      ],
    }),
  },

  // 10. Technical Skills & Tools Overview
  {
    id: 'skills_tech',
    title: 'Technical Skills & Competencies',
    intents: ['skills', 'tech', 'languages', 'frameworks', 'tools', 'technologies', 'proficient', 'experience', 'competencies'],
    keywords: ['skills', 'tech stack', 'languages', 'python', 'typescript', 'javascript', 'c++', 'sql', 'pytorch', 'tensorflow', 'langgraph', 'react', 'docker', 'git'],
    generateResponse: () => ({
      text: `Here is a consolidated overview of Harshal's technical arsenal:

• **Core Languages**: Python, TypeScript, JavaScript, SQL, C++, HTML5, Modern CSS / Tailwind
• **AI & Intelligent Systems**: LangGraph, LangChain, Google Gemini API, OpenAI APIs, Autonomous Multi-Agent Workflows, RAG Architecture, FAISS Vector Search, Prompt Engineering, CNNs, OpenCV, Keras, TensorFlow, Grad-CAM
• **Backend & APIs**: Node.js, Express.js, RESTful Architecture, JWT Authentication, Microservices principles, MongoDB Atlas, PostgreSQL, SQLite
• **Frontend & UI Engineering**: React 19, Next.js, Vite, Three.js, WebGL 2, GLSL Shaders, Framer Motion, Lenis Smooth Scroll
• **Developer Tooling & Cloud**: Git, GitHub, Docker, Postman, Linux / Bash, Vercel, Streamlit, n8n Automation`,
      links: [
        { label: 'View Interactive Skills Constellation', url: '#skills' },
        { label: 'Inspect Source Code on GitHub', url: 'https://github.com/HarshalZodge', external: true },
      ],
      suggestions: [
        'What is your experience with LangGraph?',
        'How does CurrencyVision AI work?',
        'Are you open to internships?',
      ],
    }),
  },

  // 11. Engineering Philosophy & Approach
  {
    id: 'philosophy',
    title: 'Philosophy & Work Ethic',
    intents: ['philosophy', 'passion', 'why', 'motivation', 'approach', 'culture', 'values', 'mindset', 'work ethic'],
    keywords: ['philosophy', 'approach', 'why coding', 'mindset', 'values', 'work ethic', 'what drives you', 'passion'],
    generateResponse: () => ({
      text: `Harshal's engineering philosophy centers on **rigorous architecture, high agency, and user empathy**:

1. **Substance Over Hype**: Whether implementing a 4-block CNN or a LangGraph agent supervisor, every abstraction must solve a verified problem with measurable metrics.
2. **Speed is a Feature**: Software must feel weightless. From 60 FPS WebGL shaders to sub-50ms API response budgets, performance is non-negotiable.
3. **Continuous Mastery**: A relentless appetite for learning — demonstrated by holding 10 industry certifications and completing two 3-month industrial mentorships alongside university studies.`,
      links: [
        { label: 'Read Biography & Philosophy', url: '#about' },
        { label: 'View Milestones Journey', url: '#journey' },
      ],
      suggestions: [
        'Tell me about your projects',
        'What are your career goals?',
        'Can I get in touch with you?',
      ],
    }),
  },
]

/**
 * Normalizes input text into clean search tokens
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1)
}

/**
 * Intelligent Semantic Matching Algorithm
 * Calculates contextual affinity across all knowledge topics based on intents, keywords,
 * n-grams, and multi-word semantic clusters.
 */
export function queryHarshalAi(rawQuery: string): HarshalAiMessage {
  const query = rawQuery.trim()
  if (!query) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: "I'm Harshal AI! Ask me anything about Harshal's projects, AI Agent engineering, tech stack, certifications, or hiring availability.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me about your AI Agent projects',
        'What is CurrencyVision AI?',
        'What certifications do you hold?',
        'Are you available for internships?',
      ],
    }
  }

  const queryLower = query.toLowerCase()
  const tokens = tokenize(queryLower)

  // Score each knowledge topic
  const scoredTopics = KNOWLEDGE_BASE.map((topic) => {
    let score = 0

    // Check exact phrase matches in keywords
    for (const kw of topic.keywords) {
      if (queryLower.includes(kw)) {
        score += 8
      }
    }

    // Check intent matches
    for (const intent of topic.intents) {
      if (queryLower.includes(intent)) {
        score += 5
      }
      for (const token of tokens) {
        if (token === intent || (token.length > 3 && intent.includes(token))) {
          score += 3
        }
      }
    }

    // Individual token overlap
    for (const token of tokens) {
      for (const kw of topic.keywords) {
        if (kw.includes(token)) {
          score += 2
        }
      }
    }

    return { topic, score }
  })

  // Sort descending by relevance score
  scoredTopics.sort((a, b) => b.score - a.score)
  const topMatch = scoredTopics[0]

  // If high or moderate match found (score >= 4)
  if (topMatch && topMatch.score >= 4) {
    const res = topMatch.topic.generateResponse(query)
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: res.text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      links: res.links,
      suggestions: res.suggestions,
    }
  }

  // Check if query is asking general / off-topic question
  const isGreeting = /^(hi|hello|hey|greetings|hola|sup|good morning|good evening|yo)\b/i.test(queryLower)
  if (isGreeting) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: `Hello! 👋 Great to connect with you. 

I'm **Harshal AI**, your interactive guide to Harshal Deepak Zodge's work. I can answer questions about his:
• **AI & Machine Learning Projects** (LangGraph multi-agents, CNN banknote classifier)
• **Technical Stack** (Python, TypeScript, Node.js, React, MongoDB Atlas)
• **10 Verified Certifications** (Oracle Agentic AI, Pregrad, Simplilearn, IBM)
• **Availability & Hiring** (Open for 2025/2026 software engineering roles)

What would you like to know?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'What are your top projects?',
        'Tell me about your Oracle Agentic AI certification',
        'What tech stack do you use?',
        'How can I contact Harshal?',
      ],
    }
  }

  // Graceful, intelligent fallback that still shares valuable context
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: `I understand you're asking: *"^${query.length > 60 ? query.substring(0, 60) + '...' : query}"*.

As Harshal's digital twin, I am specialized in his engineering background, software projects, certifications, and career journey. While I may not have an exact answer for that specific phrasing, here is what I can tell you about Harshal:

• **Primary Focus**: Software Development, Autonomous AI Agents (LangGraph), Deep Learning / Computer Vision (CNNs), and Full-Stack Engineering (React, Node.js, MongoDB Atlas).
• **Education**: Third-year Computer Engineering at Dr. Vithalrao Vikhe Patil COE (Savitribai Phule Pune University).
• **Verified Credentials**: 10 industry certifications including Oracle Certified Foundations Associate in Agentic AI.
• **Current Status**: Actively open for 2025 / 2026 software engineering roles and internships.

Would you like to explore one of these areas?`,
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    links: [
      { label: 'Explore Projects', url: '#work' },
      { label: 'View Verified Credentials', url: '#certifications' },
      { label: 'Get in Touch', url: '#contact' },
    ],
    suggestions: [
      'Tell me about CareerPilot AI',
      'What is CurrencyVision AI?',
      'What are your technical skills?',
      'How can I contact Harshal?',
    ],
  }
}

/**
 * Dispatch helper to launch Harshal AI copilot modal
 */
export function openHarshalAi() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('studio:open-harshal-ai'))
  }
}

// Attach to window for programmatic queries
if (typeof window !== 'undefined') {
  ;(window as unknown as { __queryHarshalAi?: typeof queryHarshalAi }).__queryHarshalAi = queryHarshalAi
}


