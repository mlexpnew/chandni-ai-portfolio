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
  /** Optional real screenshot path (e.g. "/covers/architectai.png"). Replaces the illustrated cover. */
  cover?: string;
  /** Optional 2:3 poster used on the Top 5 row. */
  poster?: string;
};

export type ProjectGroup = {
  slug: string;
  domain: string;
  color: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    // Top 5 row and the hero "Play" button use this group (slug kept for routing)
    slug: "agentic-ai",
    domain: "Flagship builds",
    color: "text-violet-300",
    projects: [
      {
        slug: "invoiceiq",
        title: "InvoiceIQ",
        domain: "Flagship builds",
        description: "Checks GST purchase invoices and reconciles them with GSTR-2B before a business claims input tax credit.",
        longDescription: "InvoiceIQ reads supplier invoice PDFs, validates them against GST rules (GSTIN check digit, tax type by state, GST 2.0 slabs, Section 16(4) ITC window, duplicates, arithmetic), reconciles them with the GSTR-2B from the GST portal and produces a review workbook, the ITC at risk, a supplier chase list and a Tally import of clean invoices. Rules handle known layouts; an LLM fallback fills only missing fields and everything is re-validated.",
        techStack: ["Python", "FastAPI", "Pydantic", "pdfplumber", "LLM fallback (Groq / Gemini)", "Docker", "Streamlit"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/invoiceiq",
        highlights: ["100% extraction, error detection and reconciliation on a 160-invoice benchmark", "Held-out layout: 0 wrong invoices posted, 60/60 routed to the LLM fallback", "11 GST compliance checks and 5 reconciliation buckets", "CI fails if any benchmark score drops below 95%"],
        outcome: "Built for CA firms and finance teams that reconcile purchase invoices every month.",
        cover: "/thumbs/invoice-parser.webp",
      },
      {
        slug: "reglens",
        title: "RegLens",
        domain: "Flagship builds",
        description: "A compliance research agent that answers SEBI regulation questions with citations to the source circulars.",
        longDescription: "RegLens plans sub-questions, retrieves relevant SEBI circulars and master directions, drafts an answer and checks it against the sources before replying, so every claim carries a citation.",
        techStack: ["Python", "LangGraph", "RAG", "Vector DB"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/reglens",
        highlights: ["Agentic plan, retrieve, verify loop", "Citations on every claim", "Built for fintech compliance teams"],
        outcome: "Currently in build as a flagship agentic project.",
        cover: "/thumbs/reglens.webp",
        poster: "/posters/reglens.webp",
      },
      {
        slug: "fairshortlist",
        title: "FairShortlist",
        domain: "Flagship builds",
        description: "Blind, explainable resume screening: a ranked shortlist with evidence, gaps and interview questions.",
        longDescription: "FairShortlist redacts names, contact details, age and gender before scoring, separates skills a candidate actually used at work from skills only listed, measures experience from role dates and scores against a published rubric. Requirements gate the shortlist and a recruiter always makes the final call.",
        techStack: ["Python", "FastAPI", "scikit-learn", "pdfplumber", "python-docx", "Streamlit", "Docker"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/fairshortlist",
        highlights: ["R-precision 100% vs 42% for TF-IDF matching and 30% for keyword ATS filters", "Swapping every name and gender changes scores by exactly 0", "Keyword stuffers, juniors and near-misses never shortlisted", "Held-out resume layout scored 100% on its first run"],
        outcome: "Built for recruiters and staffing firms screening high volumes fairly.",
        cover: "/thumbs/resume-screening-tool.webp",
      },
      {
        slug: "churnshield",
        title: "ChurnShield",
        domain: "Flagship builds",
        description: "Churn early warning for banks: who is about to leave, why, and who to call first with a fixed budget.",
        longDescription: "ChurnShield scores 10,000 real bank customers with a calibrated gradient-boosting model, explains each score with reason codes and talking points, and plans retention calls by expected value within a budget. Gender is excluded as an input, fairness is reported by gender and market, and a PSI drift monitor flags when to retrain.",
        techStack: ["Python", "scikit-learn", "pandas", "FastAPI", "Streamlit", "Docker"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/churnshield",
        highlights: ["Held-out ROC-AUC 0.864; top 10% riskiest: 82% actually left (4.0x base rate)", "EUR 20k budget test: EUR 406,848 net value vs 111,726 for random targeting", "Gender excluded at a measured cost of 0.002 AUC", "CI retrains from scratch with a quality gate"],
        outcome: "Built for retail bank retention teams deciding who to call each month.",
        cover: "/thumbs/customer-churn-predictor.webp",
      },
      {
        slug: "architectai",
        title: "ArchitectAI",
        domain: "Flagship builds",
        description: "An autonomous tech lead that turns plain-English requirements into a working, reviewed backend project.",
        longDescription: "ArchitectAI is a multi-agent pipeline. A planner breaks requirements into tasks, generators build models, schemas, APIs and services, a reviewer critiques the output and a quality gate triggers self-healing fixes. A verification harness generates 8 projects in CI and runs a full create, read, update, delete round-trip on every entity, so working code is measured rather than claimed.",
        techStack: ["Python", "CrewAI", "Groq", "FastAPI", "SQLAlchemy", "Docker", "Pytest"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/architectai",
        highlights: ["Planner, reviewer and self-healing agents", "CI verification: 8/8 generated apps boot and pass 112/112 CRUD checks", "Multi-provider LLM engine with offline mock mode", "105 unit tests in CI"],
        outcome: "Generates complete backend projects from a requirements file through one CLI command.",
        cover: "/thumbs/architectai.webp",
        poster: "/posters/architectai.webp",
      },
    ],
  },
  {
    slug: "generative-ai",
    domain: "Agentic & GenAI systems",
    color: "text-purple-400",
    projects: [
      {
        slug: "supportpilot",
        title: "SupportPilot",
        domain: "Agentic & GenAI systems",
        description: "A support-ticket triage API: ingest, clean, deduplicate and classify tickets behind secured endpoints.",
        longDescription: "SupportPilot streams JSONL tickets through Pydantic v2 validation, deduplication and PII redaction, then serves a FastAPI triage model with API-key auth, sliding-window rate limits and an operational metrics endpoint.",
        techStack: ["Python 3.11", "FastAPI", "Pydantic v2", "Alembic", "Docker", "GitHub Actions"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/supportpilot-ingestion",
        highlights: ["Streaming ingestion with validation and dedup", "API keys with 60 req/min rate limit", "Docker image under 400 MB", "CI, deployment guide and on-call runbook"],
        outcome: "A production-shaped ML service built and documented as a team.",
        cover: "/thumbs/supportpilot.webp",
        poster: "/posters/supportpilot.webp",
      },
      {
        slug: "data-analyst-agent",
        title: "Autonomous Data Analyst Agent",
        domain: "Agentic & GenAI systems",
        description: "An agent that explores a dataset, writes and runs its own Python analysis, and explains the results in business terms.",
        longDescription: "Upload a dataset and the agent profiles columns, missing values, duplicates and outliers, cleans the data, runs statistical analysis, generates charts, writes and executes Python analysis code with Gemini, and turns the results into plain-English insights and recommendations.",
        techStack: ["Python", "Gemini", "pandas", "Streamlit"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/autonomous-data-analyst-agent",
        highlights: ["Automatic profiling and cleaning", "LLM-written analysis code, executed and charted", "Insights and recommendations in plain English"],
        outcome: "Turns a raw CSV into an analyst-style report without writing code.",
        cover: "/thumbs/ecommerce-analytics.webp",
      },
      {
        slug: "wealthpilot",
        title: "WealthPilot: Portfolio Rebalancing Agent",
        domain: "Agentic & GenAI systems",
        description: "A multi-agent system that monitors portfolios, assesses risk and proposes explainable rebalancing trades for human approval.",
        longDescription: "Specialised agents handle portfolio monitoring, risk, market data, trade construction, tax impact, compliance validation, human approval and audit logging. Recommendations come with explanations, Monte Carlo simulations and PDF reports, served through FastAPI and a Streamlit dashboard.",
        techStack: ["Python", "Multi-agent", "FastAPI", "Streamlit", "Docker"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/Autonomous-Portfolio-Rebalancing-Agent",
        highlights: ["10 specialised agents from monitoring to audit", "Human-in-the-loop approval before any trade", "Compliance validation and full audit log", "Monte Carlo simulation and PDF reports"],
        outcome: "A wealth-management workflow where agents propose and humans approve.",
      },
      {
        slug: "proofpost",
        title: "ProofPost: Reviews to Compliant Posts",
        domain: "Agentic & GenAI systems",
        description: "Turns real customer reviews into compliant, on-brand social posts every week. A person approves before anything is published.",
        longDescription: "An n8n workflow reads new reviews every Monday and sends them to a FastAPI service. ProofPost screens out incentivised, mixed and fake reviews, redacts phone numbers, emails, UPI ids and order ids (DPDP Act), quotes customers word for word without health claims (ASCI), writes Instagram, LinkedIn and X posts in the brand voice and runs 9 checks per post. Posts land in an approval sheet and the team gets a Slack summary.",
        techStack: ["Python", "FastAPI", "n8n", "Streamlit", "Docker", "GitHub Actions"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/proofpost",
        highlights: ["0 problem posts vs 606 with naive reposting", "Held-out benchmark never used for tuning", "Verbatim quotes, checked automatically", "Human approval built in"],
        outcome: "A week of review posts in minutes, with the checks a careful human would do and a log of what was held back.",
        cover: "/thumbs/proofpost.webp",
        poster: "/posters/proofpost.webp",
      },
    ],
  },
  {
    slug: "data-analytics",
    domain: "Data engineering & analytics",
    color: "text-cyan-400",
    projects: [
      {
        slug: "pricing-etl-airflow",
        title: "Product Pricing ETL with Airflow",
        domain: "Data engineering & analytics",
        description: "A daily pipeline that scrapes product prices, converts them with live exchange rates and loads analytics-ready data into PostgreSQL.",
        longDescription: "Apache Airflow orchestrates four tasks every day: scrape products, fetch the GBP to INR exchange rate, transform pricing data and load it into PostgreSQL. The whole stack runs in Docker Compose.",
        techStack: ["Python", "Apache Airflow", "PostgreSQL", "Docker Compose"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/product-pricing-airflow-etl",
        highlights: ["Scheduled DAG with four isolated tasks", "Live currency conversion", "Reproducible with Docker Compose"],
        outcome: "A production-shaped batch pipeline from source to warehouse.",
        cover: "/thumbs/report-generator.webp",
      },
      {
        slug: "bangalore-airbnb-pricing",
        title: "Bangalore Airbnb Dynamic Pricing",
        domain: "Data engineering & analytics",
        description: "A database-driven dynamic pricing system for Bangalore Airbnb listings, from PostgreSQL to a deployed Streamlit app.",
        longDescription: "Listing data lives in PostgreSQL, a machine learning model recommends prices from listing features, and a Streamlit app serves the recommendations.",
        techStack: ["Python", "PostgreSQL", "scikit-learn", "Streamlit"],
        liveDemo: "",
        dashboard: "",
        github: "https://github.com/mlexpnew/bangalore-airbnb-dynamic-pricing",
        highlights: ["End-to-end: database, model and app", "Feature engineering on listing data", "Deployed with Streamlit"],
        outcome: "Price recommendations for hosts, built end to end.",
        cover: "/thumbs/airbnb-pricing-model.webp",
      },
      {
        slug: "trader-sentiment",
        title: "Trader Performance vs Market Sentiment",
        domain: "Data engineering & analytics",
        description: "How Bitcoin Fear and Greed sentiment shapes trader behaviour and profit on Hyperliquid, with a live dashboard.",
        longDescription: "Joins the Bitcoin Fear and Greed Index with Hyperliquid trader history, engineers PnL, win rate, trade frequency and position size, segments traders and compares behaviour across sentiment regimes, then proposes strategies. A live Streamlit dashboard lets anyone explore the results.",
        techStack: ["Python", "pandas", "Streamlit"],
        liveDemo: "https://primetrade-trader-sentiment-analysis.streamlit.app/",
        dashboard: "",
        github: "https://github.com/mlexpnew/primetrade-trader-sentiment-analysis",
        highlights: ["Sentiment regimes vs PnL and win rate", "Trader segmentation", "Live interactive dashboard"],
        outcome: "Actionable strategy ideas backed by real trading data.",
        cover: "/thumbs/revenue-insights-report.webp",
      },
    ],
  },
];
