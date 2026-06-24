export type Project = {
  slug: string;
  title: string;
  domain: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveDemo: string;
  dashboard: string;
  github: string;
  highlights: string[];
  outcome: string;
};

export type ProjectGroup = {
  slug: string;
  domain: string;
  color: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    slug: "generative-ai",
    domain: "Generative AI",
    color: "text-purple-400",
    projects: [
      {
        slug: "rag-chatbot",
        title: "RAG Chatbot",
        domain: "Generative AI",
        description:
          "A retrieval-augmented chatbot built with Python, embeddings, and vector databases.",
        longDescription:
          "This project is a full retrieval-augmented generation system that lets users ask questions over documents and get grounded answers. It combines document chunking, embeddings, vector search, and an LLM response layer.",
        techStack: ["Python", "LangChain", "FAISS", "Streamlit"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/rag-chatbot",
        highlights: [
          "Document ingestion pipeline",
          "Semantic search over chunks",
          "Grounded answer generation",
          "Chat UI with source context",
        ],
        outcome:
          "Improved knowledge retrieval speed and created a practical assistant for document-based Q&A.",
      },
      {
        slug: "ai-resume-assistant",
        title: "AI Resume Assistant",
        domain: "Generative AI",
        description:
          "An AI assistant that analyzes resumes and suggests improvements using LLMs.",
        longDescription:
          "This tool reviews resumes, extracts strengths and gaps, and gives improvement suggestions using a language model pipeline. It can also compare a resume against a job description.",
        techStack: ["Python", "OpenAI", "FastAPI", "NLP"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/ai-resume-assistant",
        highlights: [
          "Resume parsing",
          "Skill gap analysis",
          "Job match suggestions",
          "FastAPI backend",
        ],
        outcome:
          "Helped structure resume feedback into a practical, recruiter-friendly workflow.",
      },
      {
        slug: "document-qa-bot",
        title: "Document Q&A Bot",
        domain: "Generative AI",
        description:
          "A smart document question-answering system for PDFs and knowledge bases.",
        longDescription:
          "This project supports PDF upload, text extraction, chunking, embeddings, and question answering. It is designed for internal docs, policies, and study materials.",
        techStack: ["Python", "RAG", "ChromaDB", "LLM"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/document-qa-bot",
        highlights: [
          "PDF upload support",
          "Chunk + embed pipeline",
          "Citation-based answers",
          "Knowledge base search",
        ],
        outcome:
          "Created a useful assistant for document-heavy workflows and internal knowledge access.",
      },
      {
        slug: "meeting-notes-generator",
        title: "Meeting Notes Generator",
        domain: "Generative AI",
        description:
          "An AI tool that converts raw meeting text into structured summaries and action points.",
        longDescription:
          "This application transforms unstructured meeting text into clean summaries, action items, decisions, and follow-up tasks using an LLM-based summarization flow.",
        techStack: ["Python", "LLM", "NLP", "Automation"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/meeting-notes-generator",
        highlights: [
          "Summary generation",
          "Action item extraction",
          "Decision tracking",
          "Automation pipeline",
        ],
        outcome:
          "Reduced manual note-taking effort and made meetings easier to review later.",
      },
    ],
  },
  {
    slug: "machine-learning",
    domain: "Machine Learning",
    color: "text-pink-400",
    projects: [
      {
        slug: "airbnb-pricing-model",
        title: "Airbnb Pricing Model",
        domain: "Machine Learning",
        description:
          "A dynamic pricing model using data analysis, feature engineering, and prediction logic.",
        longDescription:
          "This project predicts property pricing using historical listing data, engineered features, and machine learning regression techniques.",
        techStack: ["Python", "Pandas", "Scikit-learn", "XGBoost"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/airbnb-pricing-model",
        highlights: [
          "Feature engineering",
          "Regression modeling",
          "Price prediction",
          "Model evaluation",
        ],
        outcome:
          "Produced a practical pricing recommendation model for real estate-style listings.",
      },
      {
        slug: "customer-churn-predictor",
        title: "Customer Churn Predictor",
        domain: "Machine Learning",
        description:
          "Predicts customer churn using classification models and feature importance analysis.",
        longDescription:
          "This model identifies customers likely to leave by analyzing usage behavior, demographics, and service patterns.",
        techStack: ["Python", "ML", "SQL", "Power BI"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/customer-churn-predictor",
        highlights: [
          "Binary classification",
          "Feature importance",
          "Business risk insight",
          "Prediction pipeline",
        ],
        outcome:
          "Helped prioritize retention efforts by identifying high-risk customer segments.",
      },
      {
        slug: "loan-approval-predictor",
        title: "Loan Approval Predictor",
        domain: "Machine Learning",
        description:
          "A machine learning model that predicts whether a loan application should be approved.",
        longDescription:
          "This project uses classification logic to support a lending workflow by predicting approval outcomes from applicant attributes.",
        techStack: ["Python", "Classification", "Pandas", "Scikit-learn"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/loan-approval-predictor",
        highlights: [
          "Approval prediction",
          "Data preprocessing",
          "Classification model",
          "Decision support",
        ],
        outcome:
          "Created a useful decision-support model for finance-style application screening.",
      },
      {
        slug: "house-price-predictor",
        title: "House Price Predictor",
        domain: "Machine Learning",
        description:
          "A regression model that estimates house prices based on property features.",
        longDescription:
          "This project predicts housing prices from property characteristics, location variables, and market-related numeric features.",
        techStack: ["Python", "Regression", "ML", "Data Analysis"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/house-price-predictor",
        highlights: [
          "Regression analysis",
          "Market estimation",
          "Model tuning",
          "Property analytics",
        ],
        outcome:
          "Provided a pricing estimator useful for analysis and model comparison.",
      },
    ],
  },
  {
    slug: "data-analytics",
    domain: "Data Analytics",
    color: "text-cyan-400",
    projects: [
      {
        slug: "google-search-quality-analysis",
        title: "Google Search Quality Analysis",
        domain: "Data Analytics",
        description:
          "An analytics project focused on search relevance, query patterns, and quality insights.",
        longDescription:
          "This project analyzes search logs and query behavior to surface relevance issues, ranking patterns, and optimization opportunities.",
        techStack: ["SQL", "Python", "Tableau", "Pandas"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/google-search-quality-analysis",
        highlights: [
          "Query analysis",
          "Search relevance insights",
          "Analytics dashboard",
          "Reporting workflow",
        ],
        outcome: "Turned raw search data into actionable product insights.",
      },
      {
        slug: "sales-dashboard",
        title: "Sales Dashboard",
        domain: "Data Analytics",
        description:
          "Interactive dashboard to analyze sales performance and business trends.",
        longDescription:
          "This dashboard provides sales KPIs, revenue trends, category performance, and region-level breakdowns for decision-making.",
        techStack: ["Power BI", "Excel", "SQL", "Python"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/sales-dashboard",
        highlights: [
          "Revenue analysis",
          "KPI visuals",
          "Trend reporting",
          "Business insights",
        ],
        outcome:
          "Helped create a clearer view of sales performance and business trends.",
      },
      {
        slug: "revenue-insights-report",
        title: "Revenue Insights Report",
        domain: "Data Analytics",
        description:
          "A business reporting project that summarizes revenue, growth, and KPI trends.",
        longDescription:
          "This report combines SQL, spreadsheet analysis, and visualization to present a business-ready revenue summary.",
        techStack: ["SQL", "Excel", "Power BI", "Reporting"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/revenue-insights-report",
        highlights: [
          "Revenue tracking",
          "Reporting format",
          "Trend analysis",
          "Executive summary",
        ],
        outcome:
          "Made business reporting easier to read and more decision-focused.",
      },
      {
        slug: "ecommerce-analytics",
        title: "E-commerce Analytics",
        domain: "Data Analytics",
        description:
          "Analysis of customer behavior, product sales, and conversion trends.",
        longDescription:
          "This project studies ecommerce behavior, sales funnels, and product performance to identify growth opportunities.",
        techStack: ["Python", "SQL", "Dashboard", "Analytics"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/ecommerce-analytics",
        highlights: [
          "Customer behavior",
          "Product performance",
          "Conversion trends",
          "Funnel analysis",
        ],
        outcome:
          "Enabled deeper understanding of ecommerce sales and customer journeys.",
      },
    ],
  },
  {
    slug: "automation",
    domain: "Automation",
    color: "text-yellow-400",
    projects: [
      {
        slug: "resume-screening-tool",
        title: "Resume Screening Tool",
        domain: "Automation",
        description:
          "A Python-based system to classify and score resumes against job descriptions.",
        longDescription:
          "This automation tool reduces manual resume screening by using NLP rules and scoring logic aligned with job requirements.",
        techStack: ["Python", "NLP", "FastAPI", "Automation"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/resume-screening-tool",
        highlights: [
          "Resume scoring",
          "Job matching",
          "NLP pipeline",
          "Workflow automation",
        ],
        outcome: "Reduced manual effort in early candidate filtering.",
      },
      {
        slug: "lead-email-bot",
        title: "Lead Email Bot",
        domain: "Automation",
        description:
          "Automates lead follow-up emails using rules and AI-generated responses.",
        longDescription:
          "This bot monitors leads and sends smart follow-up messages using automation rules and AI response generation.",
        techStack: ["Python", "SMTP", "APIs", "AI"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/lead-email-bot",
        highlights: [
          "Auto follow-up",
          "Rule-based workflow",
          "Email automation",
          "AI response support",
        ],
        outcome:
          "Improved follow-up consistency and saved manual outreach time.",
      },
      {
        slug: "invoice-parser",
        title: "Invoice Parser",
        domain: "Automation",
        description:
          "Extracts and structures invoice data automatically from uploaded documents.",
        longDescription:
          "This project uses OCR and parsing logic to convert raw invoices into structured tabular data.",
        techStack: ["Python", "OCR", "Automation", "Pandas"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/invoice-parser",
        highlights: [
          "OCR extraction",
          "Structured output",
          "Document automation",
          "Data cleanup",
        ],
        outcome:
          "Reduced manual invoice processing and improved data consistency.",
      },
      {
        slug: "report-generator",
        title: "Report Generator",
        domain: "Automation",
        description:
          "Automatically creates weekly summary reports from raw data sources.",
        longDescription:
          "This system compiles data into formatted weekly reports on a schedule, making recurring reporting easier.",
        techStack: ["Python", "Excel", "Scheduling", "Scripts"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/report-generator",
        highlights: [
          "Weekly automation",
          "Formatted summaries",
          "Scheduled generation",
          "Data collection",
        ],
        outcome:
          "Simplified repetitive reporting and reduced manual work.",
      },
    ],
  },
  {
    slug: "internship-projects",
    domain: "Internship Projects",
    color: "text-emerald-400",
    projects: [
      {
        slug: "internship-project-tracker",
        title: "Internship Project Tracker",
        domain: "Internship Projects",
        description:
          "A project created during internship work to organize tasks, deadlines, and deliverables.",
        longDescription:
          "This tracker was built to manage internship assignments, timelines, and deliverables in a clear and organized way.",
        techStack: ["Python", "Excel", "Data Analysis", "Reporting"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/internship-project-tracker",
        highlights: [
          "Task tracking",
          "Deadline visibility",
          "Status reporting",
          "Workflow organization",
        ],
        outcome:
          "Improved visibility of internship tasks and deliverables.",
      },
      {
        slug: "internship-analytics-dashboard",
        title: "Internship Analytics Dashboard",
        domain: "Internship Projects",
        description:
          "A dashboard built during internship to summarize insights, progress, and performance metrics.",
        longDescription:
          "This dashboard presents internship progress metrics, task summaries, and analysis visuals in one place.",
        techStack: ["Power BI", "SQL", "Python", "Charts"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/internship-analytics-dashboard",
        highlights: [
          "Progress charts",
          "Task summaries",
          "Performance metrics",
          "Dashboard design",
        ],
        outcome:
          "Made internship reporting clearer and easier to review.",
      },
      {
        slug: "internship-task-automation",
        title: "Internship Task Automation",
        domain: "Internship Projects",
        description:
          "Automated repetitive internship tasks and reporting using Python scripts.",
        longDescription:
          "This automation project helped reduce repetitive work by running structured Python scripts for reporting tasks.",
        techStack: ["Python", "Automation", "Scripts", "APIs"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/internship-task-automation",
        highlights: [
          "Automated workflows",
          "Script-based reporting",
          "Task reduction",
          "API integration",
        ],
        outcome: "Saved time on repetitive internship tasks.",
      },
      {
        slug: "internship-data-cleaning-project",
        title: "Internship Data Cleaning Project",
        domain: "Internship Projects",
        description:
          "Cleaned and transformed raw datasets into analysis-ready formats during internship.",
        longDescription:
          "This project focused on data quality, cleaning rules, transformation logic, and preparing datasets for analysis.",
        techStack: ["Python", "Pandas", "SQL", "Data Cleaning"],
        liveDemo: "https://your-live-demo-link.com",
        dashboard: "https://your-live-dashboard-link.com",
        github: "https://github.com/your-github/internship-data-cleaning-project",
        highlights: [
          "Cleaning logic",
          "Transformation pipeline",
          "Data quality improvement",
          "Analysis-ready data",
        ],
        outcome:
          "Improved dataset quality for later analysis and reporting.",
      },
    ],
  },
];

export function getProjectGroupBySlug(slug: string) {
  return projectGroups.find((group) => group.slug === slug);
}

export function getProjectBySlug(groupSlug: string, projectSlug: string) {
  const group = getProjectGroupBySlug(groupSlug);
  return group?.projects.find((project) => project.slug === projectSlug);
}