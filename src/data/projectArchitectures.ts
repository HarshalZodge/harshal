export interface ArchitectureStage {
  id: string
  step: number
  title: string
  techBadge: string
  category: 'ingestion' | 'processing' | 'model' | 'explainability' | 'storage' | 'output'
  shortDesc: string
  detailedExplanation: string
  inputs: string
  outputs: string
  keyDecisions: string[]
}

export interface ProjectArchitecture {
  projectId: string
  pipelineTitle: string
  paradigm: string
  summary: string
  stages: ArchitectureStage[]
}

export const PROJECT_ARCHITECTURES: Record<string, ProjectArchitecture> = {
  'currencyvision-ai': {
    projectId: 'currencyvision-ai',
    pipelineTitle: '4-Block Custom CNN & Grad-CAM Explainable Vision Pipeline',
    paradigm: 'Deep Convolutional Neural Network + Gradient-weighted Class Activation Mapping',
    summary:
      'A multi-stage computer vision inference pipeline that ingests raw camera feeds or uploaded banknote images, applies photometric normalization, extracts hierarchical spatial features across 4 convolutional blocks, generates class-discriminative Grad-CAM heatmaps, and outputs audit-ready denomination classifications.',
    stages: [
      {
        id: 'cv-1',
        step: 1,
        title: 'Input Ingestion & Frame Normalization',
        techBadge: 'OpenCV / PIL',
        category: 'ingestion',
        shortDesc: 'Ingests webcam streams or image files and standardizes pixel spatial geometry.',
        detailedExplanation:
          'Raw RGB inputs are resized to standard 224x224 dimensions. Pixel intensities are normalized to [0, 1] floating-point tensors to ensure gradient stability during backpropagation and inference.',
        inputs: 'Raw RGB Banknote Image (JPEG/PNG/Webcam Frame)',
        outputs: 'Standardized 4D Tensor shape (1, 224, 224, 3)',
        keyDecisions: [
          'Fixed 224x224 resolution provides optimal trade-off between banknote watermark detail and CPU inference speed',
          'Bi-cubic interpolation prevents pixel distortion on crumpled banknote edges',
        ],
      },
      {
        id: 'cv-2',
        step: 2,
        title: 'Illumination & Preprocessing Pipeline',
        techBadge: 'NumPy / Albumentations',
        category: 'processing',
        shortDesc: 'Applies dynamic contrast equalization and shadow attenuation.',
        detailedExplanation:
          'Indian banknotes in real-world circulation are frequently folded, soiled, or photographed in dim lighting. CLAHE (Contrast Limited Adaptive Histogram Equalization) balances illumination across localized banknote regions.',
        inputs: 'Standardized Tensor (1, 224, 224, 3)',
        outputs: 'Contrast-Equalized Preprocessed Tensor',
        keyDecisions: [
          'Localized contrast adaptation preserves fine RBI micro-lettering and security threads',
          'Eliminates glare artifacts from mobile flashlight scanning',
        ],
      },
      {
        id: 'cv-3',
        step: 3,
        title: 'Hierarchical 4-Block Conv2D Extraction',
        techBadge: 'TensorFlow / Keras',
        category: 'model',
        shortDesc: 'Extracts progressive spatial features from low-level edges to complex denominational patterns.',
        detailedExplanation:
          'Custom 4-block architecture: Block 1 (32 filters, 3x3 kernel) captures raw edges; Block 2 (64 filters) extracts numeral outlines; Block 3 (128 filters) maps Mahatma Gandhi portraiture and security strips; Block 4 (128 filters) captures holistic denominational patterns. Each block features BatchNormalization and ReLU activations.',
        inputs: 'Preprocessed Tensor',
        outputs: 'High-Level Spatial Feature Maps (14x14x128)',
        keyDecisions: [
          'He Normal weight initialization accelerates convergence and prevents early saturation',
          'BatchNormalization after each Conv2D layer stabilizes internal covariate shifts',
        ],
      },
      {
        id: 'cv-4',
        step: 4,
        title: 'Regularization & Global Average Pooling',
        techBadge: 'Keras Layers',
        category: 'model',
        shortDesc: 'Suppresses feature co-adaptation and reduces parameter dimensionality.',
        detailedExplanation:
          'Multi-stage Dropout layers (rate: 0.3 to 0.5) randomly deactivate neurons during training, forcing redundant path learning. Global Average Pooling (GAP) collapses 2D spatial feature maps into a 1D vector, drastically minimizing trainable parameters compared to dense flattening.',
        inputs: 'Feature Maps (14x14x128)',
        outputs: 'Compact Latent Feature Vector (128-dim)',
        keyDecisions: [
          'GAP prevents severe overfitting common in small-to-medium currency datasets',
          'Reduces model weight footprint for faster low-end device deployment',
        ],
      },
      {
        id: 'cv-5',
        step: 5,
        title: 'Grad-CAM Explainable AI Engine',
        techBadge: 'Grad-CAM / tf.GradientTape',
        category: 'explainability',
        shortDesc: 'Calculates gradients of target class score with respect to final convolutional layer.',
        detailedExplanation:
          'Computes the partial derivatives of the winning banknote denomination logit against the feature maps of the final Conv2D layer. Generates a 2D activation heatmap that is overlaid onto the original image, proving whether the model inspected the correct Reserve Bank watermark or numeral.',
        inputs: 'Target Class Index + Final Conv2D Feature Maps',
        outputs: '224x224 Jet Colormap Overlay Heatmap',
        keyDecisions: [
          'Ensures the model is not relying on spurious background artifacts (e.g. table textures)',
          'Fosters immediate trust for visually impaired accessibility systems and bank audit compliance',
        ],
      },
      {
        id: 'cv-6',
        step: 6,
        title: 'Softmax Classification & Audit Export',
        techBadge: 'Streamlit / ReportLab',
        category: 'output',
        shortDesc: 'Computes multi-class probability distribution across all 7 Indian denominations.',
        detailedExplanation:
          'Dense layer with Softmax activation produces calibrated confidence scores across ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, and ₹2000 notes. The Streamlit UI renders confidence progress bars, official RBI security feature comparisons, and one-click PDF/CSV audit reports.',
        inputs: 'Latent Feature Vector',
        outputs: 'Class Probability Distribution + Audit Report Dossier',
        keyDecisions: [
          'Confidence threshold gating (>85%) flags ambiguous or heavily damaged notes for manual verification',
          'Structured JSON/CSV output supports seamless integration into POS billing kiosks',
        ],
      },
    ],
  },

  'careerpilot-ai': {
    projectId: 'careerpilot-ai',
    pipelineTitle: 'LangGraph Multi-Agent Orchestration & RAG Graph Architecture',
    paradigm: 'StateGraph Multi-Agent System + Supervisor Routing + FAISS Vector Store',
    summary:
      'An enterprise-grade autonomous AI multi-agent workflow orchestrated with LangGraph. Coordinates a Supervisor Router agent and specialized downstream worker agents to analyze candidate resumes, score ATS keyword alignment, retrieve industry requirements via RAG, and formulate step-by-step milestone roadmaps.',
    stages: [
      {
        id: 'cp-1',
        step: 1,
        title: 'Candidate Profile & Resume Ingestion',
        techBadge: 'PyPDF / Docx2txt',
        category: 'ingestion',
        shortDesc: 'Extracts unstructured text from candidate resumes and normalizes candidate metadata.',
        detailedExplanation:
          'Parses multi-format resume documents (PDF, DOCX) into clean text tokens. Extracts work experience, skills inventory, education chronology, and project bullet points into a structured dataclass session state.',
        inputs: 'Resume Document (PDF/DOCX) + Target Career Path',
        outputs: 'Structured CandidateState Dataclass',
        keyDecisions: [
          'Deterministic text normalization strips proprietary font ligatures and table artifacts',
          'Session state persistence enables iterative resume updates without re-uploading',
        ],
      },
      {
        id: 'cp-2',
        step: 2,
        title: 'LangGraph Supervisor Router Agent',
        techBadge: 'LangGraph / StateGraph',
        category: 'processing',
        shortDesc: 'Intelligent decision node routing execution flow dynamically based on candidate needs.',
        detailedExplanation:
          'Acts as the orchestrator of the LangGraph state graph. Evaluates the candidate profile and query to decide which specialized sub-agent must execute next. Manages conditional state edges and prevents redundant agent invocations.',
        inputs: 'CandidateState + User Chat Prompt',
        outputs: 'Directed Graph Edge Transition to Specialized Sub-Agent',
        keyDecisions: [
          'Stateful router decouples agent logic, allowing new agents to be plugged in with zero rewrites',
          'Built-in safety loops prevent infinite recursion or cyclical agent dependencies',
        ],
      },
      {
        id: 'cp-3',
        step: 3,
        title: 'Specialized Worker Agent Suite',
        techBadge: 'LangChain / Gemini API',
        category: 'model',
        shortDesc: 'Domain-specific agents executing deep technical analysis in parallel.',
        detailedExplanation:
          'Coordinates 4 primary analytical sub-agents: (1) ATS Evaluation Agent checks keyword density against ATS parsers; (2) Skill Gap Agent isolates missing prerequisite technologies; (3) Interview Coach Agent generates tailored behavioral and technical questions; (4) Roadmap Agent structures chronological milestone steps.',
        inputs: 'Normalized CandidateState Profile',
        outputs: 'Detailed Analytical Findings & Scoring Metrics',
        keyDecisions: [
          'Agent specialization minimizes prompt token bloat and improves precision',
          'Role-specific system prompts prevent hallucinatory recommendations',
        ],
      },
      {
        id: 'cp-4',
        step: 4,
        title: 'FAISS Semantic Vector Retrieval (RAG)',
        techBadge: 'FAISS / Text-Embeddings',
        category: 'storage',
        shortDesc: 'Retrieves verified industry skill requirements from vector index.',
        detailedExplanation:
          'Queries an embedded vector index containing current job role requirements, university syllabi, and industry frameworks. Computes cosine similarity to ground the Skill Gap Agent in actual real-world hiring criteria rather than generic suggestions.',
        inputs: 'Target Role Query Embeddings',
        outputs: 'Top-K Verified Role Competency Chunks',
        keyDecisions: [
          'FAISS sub-millisecond similarity search enables instantaneous real-time querying',
          'Grounding with verified criteria completely prevents LLM curriculum hallucination',
        ],
      },
      {
        id: 'cp-5',
        step: 5,
        title: 'Gemini Inference & Token Streaming',
        techBadge: 'Google Gemini / Tenacity',
        category: 'model',
        shortDesc: 'Centralized model inference with exponential backoff and streaming tokens.',
        detailedExplanation:
          'Centralized GeminiService manages model temperature, token budgets, and exponential backoff retries via Tenacity. Streams tokens directly to the Streamlit UI for instantaneous response feel.',
        inputs: 'Assembled Multi-Agent Prompt Context',
        outputs: 'Real-time Streaming Token Responses',
        keyDecisions: [
          'Exponential backoff ensures reliability against API rate-limiting spikes',
          'Streaming output keeps perceived user latency under 400ms',
        ],
      },
      {
        id: 'cp-6',
        step: 6,
        title: 'Dossier Generation & Client Delivery',
        techBadge: 'Streamlit / ReportLab',
        category: 'output',
        shortDesc: 'Delivers real-time interactive chat guidance and downloadable PDF dossiers.',
        detailedExplanation:
          'Renders an interactive Career Copilot chat with candidate history. Compiles analytical findings into professional, multi-page PDF dossiers (via ReportLab) and structured JSON for ATS profile portability.',
        inputs: 'Complete Session Analysis State',
        outputs: 'Interactive UI + Audit-Ready PDF Dossier',
        keyDecisions: [
          'ReportLab vector PDF generation ensures pixel-perfect printing and recruiter distribution',
          'JSON exports allow candidates to ingest roadmap milestones into calendar or Notion apps',
        ],
      },
    ],
  },

  'crime-record-management': {
    projectId: 'crime-record-management',
    pipelineTitle: 'Secure Cloud Backend & Persistent Database Architecture',
    paradigm: 'Node.js RESTful API + MongoDB Atlas Cloud Cluster + JWT Security',
    summary:
      'A secure, persistent database management architecture built with Node.js, Express, and MongoDB Atlas. Features role-based access control, schema validation with Mongoose, and encrypted criminal record case management.',
    stages: [
      {
        id: 'cr-1',
        step: 1,
        title: 'Client Request & Authentication Gateway',
        techBadge: 'Express.js / JWT',
        category: 'ingestion',
        shortDesc: 'Authenticates law enforcement personnel and verifies JSON Web Tokens.',
        detailedExplanation:
          'All incoming API requests pass through an authentication gateway. Validates signed JWT tokens in the Authorization header to verify role privileges (Admin, Investigator, Officer) prior to request processing.',
        inputs: 'HTTP Request with Bearer JWT Token',
        outputs: 'Authenticated User Session Context',
        keyDecisions: [
          'Stateless JWT tokens eliminate server-side session memory overhead',
          'Role-based access control guarantees sensitive case records are restricted to authorized personnel',
        ],
      },
      {
        id: 'cr-2',
        step: 2,
        title: 'Input Sanitization & Schema Validation',
        techBadge: 'Mongoose / Express Validator',
        category: 'processing',
        shortDesc: 'Guards against NoSQL injection and enforces strict data types.',
        detailedExplanation:
          'Sanitizes incoming payloads against script injection and enforces strict schema validation for criminal IDs, case numbers, FIR records, evidence attachments, and timestamp logs.',
        inputs: 'Raw Request Body (JSON)',
        outputs: 'Validated & Sanitized Data Object',
        keyDecisions: [
          'Strong schema enforcement prevents corrupted case records in database',
          'NoSQL injection filters sanitize query parameters on search routes',
        ],
      },
      {
        id: 'cr-3',
        step: 3,
        title: 'Business Logic & Audit Trail Logging',
        techBadge: 'Node.js Controllers',
        category: 'model',
        shortDesc: 'Executes case record transactions and updates immutable audit logs.',
        detailedExplanation:
          'Handles core CRUD operations on criminal records, warrants, and evidence chains. Automatically logs who created, updated, or viewed each case record with precise UTC timestamps for forensic accountability.',
        inputs: 'Validated Case Payload',
        outputs: 'Database Transaction Execution + Audit Log Entry',
        keyDecisions: [
          'Immutable audit logging ensures full chain-of-custody compliance for legal proceedings',
          'Modular controller-service pattern decouples HTTP routes from business logic',
        ],
      },
      {
        id: 'cr-4',
        step: 4,
        title: 'MongoDB Atlas Cloud Cluster Layer',
        techBadge: 'MongoDB Atlas / Mongoose',
        category: 'storage',
        shortDesc: 'Persistent cloud document storage with compound indexing.',
        detailedExplanation:
          'Stores case documents in a managed MongoDB Atlas cloud replica set. Implements compound indexes on case IDs, FIR numbers, and suspect names to ensure sub-10ms query execution across thousands of records.',
        inputs: 'Mongoose Document Models',
        outputs: 'Encrypted at-rest MongoDB Document Persistence',
        keyDecisions: [
          'Atlas automated replica sets provide 99.99% high availability and automated failover',
          'Compound indexes drastically speed up multi-field investigative searches',
        ],
      },
      {
        id: 'cr-5',
        step: 5,
        title: 'Response Formatting & Pagination',
        techBadge: 'RESTful JSON',
        category: 'output',
        shortDesc: 'Dispatches paginated, filtered record sets with standard HTTP status codes.',
        detailedExplanation:
          'Formats database outputs into structured JSON responses with cursor-based pagination metadata, preventing payload bloat when searching extensive case databases.',
        inputs: 'MongoDB Query Cursor',
        outputs: 'Paginated JSON API Response (HTTP 200 OK)',
        keyDecisions: [
          'Cursor-based pagination keeps server memory footprint constant regardless of database size',
          'Consistent REST error schemas accelerate frontend client error handling',
        ],
      },
    ],
  },
}
