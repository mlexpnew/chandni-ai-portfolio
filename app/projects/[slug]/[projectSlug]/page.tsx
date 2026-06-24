import Link from "next/link";
import { notFound } from "next/navigation";
import { projectGroups } from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
};

type ProjectBlueprint = {
  impact: string[];
  architecture: string[];
  screenshots: string[];
  challenges: string[];
  learnings: string[];
};

const blueprintBySlug: Record<string, ProjectBlueprint> = {
  "rag-chatbot": {
    impact: ["Faster document Q&A", "Grounded answers", "Reusable RAG pipeline"],
    architecture: ["Upload Docs → Chunking → Embeddings → Vector Search → LLM Answer"],
    screenshots: ["Chat UI", "Sources Panel", "Answer Output"],
    challenges: ["Chunk quality", "Hallucination control", "Retrieval latency"],
    learnings: ["Prompt structuring", "Vector DB flow", "Context management"],
  },
  "ai-resume-assistant": {
    impact: ["Resume feedback automation", "Job match suggestions", "Faster review"],
    architecture: ["Resume Input → Parsing → Skill Extraction → LLM Feedback"],
    screenshots: ["Resume Upload", "Analysis Result", "Improvement Tips"],
    challenges: ["Text extraction", "Ranking relevance", "Structured output"],
    learnings: ["NLP pipelines", "LLM formatting", "Prompt design"],
  },
  "document-qa-bot": {
    impact: ["PDF knowledge search", "Quick answers", "Source-based responses"],
    architecture: ["PDF Upload → OCR/Text Extraction → Chunking → Retrieval → Answer"],
    screenshots: ["PDF Upload", "Search Results", "Answer Panel"],
    challenges: ["Large files", "Chunk overlap", "Answer accuracy"],
    learnings: ["RAG design", "Document parsing", "Citation flow"],
  },
  "meeting-notes-generator": {
    impact: ["Faster meeting summaries", "Action item extraction", "Cleaner notes"],
    architecture: ["Meeting Text → Summarization → Action Items → Final Notes"],
    screenshots: ["Input Text", "Summary View", "Action Items"],
    challenges: ["Long context", "Section formatting", "Summary quality"],
    learnings: ["Summarization patterns", "Output structuring", "Automation logic"],
  },
  "airbnb-pricing-model": {
    impact: ["Price prediction", "Feature-based estimation", "Data-driven decisions"],
    architecture: ["Raw Data → Cleaning → Feature Engineering → Regression Model → Prediction"],
    screenshots: ["Dataset View", "Model Output", "Prediction Result"],
    challenges: ["Missing values", "Feature selection", "Model tuning"],
    learnings: ["Regression workflow", "Feature engineering", "Model evaluation"],
  },
  "customer-churn-predictor": {
    impact: ["Risk identification", "Customer retention insight", "Prediction scoring"],
    architecture: ["Customer Data → Preprocessing → Classification Model → Churn Score"],
    screenshots: ["Feature Table", "Prediction Score", "Business Insights"],
    challenges: ["Class imbalance", "Feature quality", "Interpretability"],
    learnings: ["Classification methods", "Business metrics", "Evaluation strategy"],
  },
  "loan-approval-predictor": {
    impact: ["Approval support", "Faster screening", "Decision assistance"],
    architecture: ["Applicant Data → Cleaning → Classification → Approval Prediction"],
    screenshots: ["Applicant Form", "Model Result", "Decision Output"],
    challenges: ["Data imbalance", "Noise in records", "Threshold tuning"],
    learnings: ["Binary classification", "Decision thresholds", "Pipeline design"],
  },
  "house-price-predictor": {
    impact: ["Property price estimate", "Market insight", "Regression output"],
    architecture: ["Housing Data → Cleaning → Regression → Estimated Price"],
    screenshots: ["Property Inputs", "Prediction Chart", "Price Output"],
    challenges: ["Outliers", "Feature scaling", "Accuracy improvement"],
    learnings: ["Regression analysis", "Model comparison", "Data cleaning"],
  },
  "google-search-quality-analysis": {
    impact: ["Search relevance insight", "Query trend analysis", "Reporting clarity"],
    architecture: ["Search Logs → Cleaning → SQL/Python Analysis → Dashboard"],
    screenshots: ["Query Table", "Insight Chart", "Report View"],
    challenges: ["Noisy logs", "Metric design", "Trend grouping"],
    learnings: ["Analytics workflow", "Data storytelling", "Visualization"],
  },
  "sales-dashboard": {
    impact: ["Sales visibility", "KPI tracking", "Business reporting"],
    architecture: ["Sales Data → Cleaning → Metrics → Dashboard"],
    screenshots: ["KPI Cards", "Trend Graphs", "Filters"],
    challenges: ["Multi-source data", "Dashboard layout", "Metric consistency"],
    learnings: ["BI design", "Dashboard UX", "Reporting structure"],
  },
  "revenue-insights-report": {
    impact: ["Revenue clarity", "Executive reporting", "Trend monitoring"],
    architecture: ["Revenue Data → SQL Analysis → Reporting → Insights"],
    screenshots: ["Revenue Table", "Trend Graph", "Summary Page"],
    challenges: ["Data gaps", "Metric consistency", "Clean presentation"],
    learnings: ["Reporting structure", "Business KPIs", "Insight writing"],
  },
  "ecommerce-analytics": {
    impact: ["Customer behavior insight", "Conversion tracking", "Product analysis"],
    architecture: ["E-commerce Data → Cleaning → Funnel Analysis → Dashboard"],
    screenshots: ["Funnel Chart", "Sales Report", "Product Metrics"],
    challenges: ["Event mapping", "Funnel logic", "Category grouping"],
    learnings: ["E-commerce metrics", "Behavior analysis", "Trend discovery"],
  },
  "resume-screening-tool": {
    impact: ["Resume ranking", "Shortlisting support", "Manual effort reduction"],
    architecture: ["Resume Input → NLP Scoring → Ranking → Match Result"],
    screenshots: ["Upload Screen", "Score Output", "Ranked List"],
    challenges: ["Keyword matching", "Text normalization", "Scoring logic"],
    learnings: ["NLP automation", "Rule design", "FastAPI workflow"],
  },
  "lead-email-bot": {
    impact: ["Follow-up automation", "Lead nurturing", "Time saving"],
    architecture: ["Lead Data → Rules Engine → AI Draft → Email Send"],
    screenshots: ["Lead List", "Email Draft", "Automation Logs"],
    challenges: ["Template control", "Send reliability", "Message quality"],
    learnings: ["Automation flow", "SMTP handling", "LLM assistance"],
  },
  "invoice-parser": {
    impact: ["Invoice extraction", "Faster processing", "Structured output"],
    architecture: ["Invoice Upload → OCR → Field Extraction → Table Output"],
    screenshots: ["Upload View", "Parsed Fields", "Export Table"],
    challenges: ["OCR accuracy", "Layout variety", "Field parsing"],
    learnings: ["Document AI", "Extraction flow", "Data normalization"],
  },
  "report-generator": {
    impact: ["Weekly automation", "Repeatable reports", "Less manual work"],
    architecture: ["Source Data → Script Run → Summary Report → Export"],
    screenshots: ["Input Data", "Generated Report", "Export View"],
    challenges: ["Scheduling", "Formatting consistency", "Error handling"],
    learnings: ["Automation scripts", "Scheduled tasks", "Output design"],
  },
  "internship-project-tracker": {
    impact: ["Task visibility", "Deadline tracking", "Deliverable control"],
    architecture: ["Task Data → Tracking Logic → Reporting View"],
    screenshots: ["Tracker Table", "Task Status", "Timeline View"],
    challenges: ["Priority tracking", "Status updates", "Reporting clarity"],
    learnings: ["Workflow organization", "Tracking metrics", "Internship planning"],
  },
  "internship-analytics-dashboard": {
    impact: ["Progress visibility", "Reporting clarity", "Performance review"],
    architecture: ["Internship Data → Metrics → Dashboard"],
    screenshots: ["Charts", "Summary Cards", "Progress View"],
    challenges: ["Metric selection", "Layout balancing", "Readable presentation"],
    learnings: ["Dashboard design", "Metrics mapping", "Data storytelling"],
  },
  "internship-task-automation": {
    impact: ["Task automation", "Time saving", "Less repetition"],
    architecture: ["Manual Task → Python Script → Automated Output"],
    screenshots: ["Script Run", "Log Output", "Result View"],
    challenges: ["Repeatability", "Script errors", "Process standardization"],
    learnings: ["Automation logic", "Script maintenance", "Workflow simplification"],
  },
  "internship-data-cleaning-project": {
    impact: ["Cleaner data", "Analysis-ready dataset", "Better reporting"],
    architecture: ["Raw Data → Cleaning Rules → Structured Dataset"],
    screenshots: ["Raw Data", "Cleaned Table", "Quality Report"],
    challenges: ["Missing values", "Duplicates", "Inconsistent formats"],
    learnings: ["Data cleaning", "Quality control", "Preparation pipelines"],
  },
};

export function generateStaticParams() {
  const paths: { slug: string; projectSlug: string }[] = [];

  projectGroups.forEach((group) => {
    group.projects.forEach((project) => {
      paths.push({
        slug: group.slug,
        projectSlug: project.slug,
      });
    });
  });

  return paths;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, projectSlug } = await params;

  const group = projectGroups.find((item) => item.slug === slug);
  const project = group?.projects.find((item) => item.slug === projectSlug);

  if (!group || !project) {
    return notFound();
  }

  const blueprint =
    blueprintBySlug[project.slug] ?? {
      impact: [
        "Better workflow clarity",
        "Reusable project structure",
        "Professional portfolio presentation",
      ],
      architecture: ["Input → Processing → Output"],
      screenshots: ["Overview", "Detail View", "Result View"],
      challenges: ["Scope control", "UI clarity", "Output formatting"],
      learnings: ["Architecture thinking", "UI design", "Project storytelling"],
    };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className={`mb-3 tracking-[0.3em] ${group.color}`}>
              PROJECT DETAILS
            </p>
            <h1 className="text-4xl font-bold md:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-gray-400">
              {project.domain} • {project.description}
            </p>
          </div>

          <Link
            href={`/projects/${group.slug}`}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
          >
            Back to Category
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-3 tracking-[0.25em] text-purple-400">
                PROJECT OVERVIEW
              </p>
              <p className="leading-8 text-gray-300">{project.longDescription}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-6 tracking-[0.25em] text-purple-400">
                PROJECT IMPACT
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {blueprint.impact.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-6 tracking-[0.25em] text-purple-400">
                SCREENSHOTS
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {blueprint.screenshots.map((label) => (
                  <div
                    key={label}
                    className="flex min-h-[180px] items-end rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4"
                  >
                    <span className="text-sm text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-6 tracking-[0.25em] text-purple-400">
                ARCHITECTURE FLOW
              </p>
              <div className="space-y-4">
                {blueprint.architecture.map((step) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-gray-300"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-6 tracking-[0.25em] text-purple-400">
                CHALLENGES & LEARNINGS
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Challenges
                  </h3>
                  <ul className="space-y-3">
                    {blueprint.challenges.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-gray-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Learnings
                  </h3>
                  <ul className="space-y-3">
                    {blueprint.learnings.map((item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-gray-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-4 tracking-[0.25em] text-purple-400">
                TECH STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-4 tracking-[0.25em] text-purple-400">
                PROJECT LINKS
              </p>
              <div className="space-y-3">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-purple-600 px-4 py-3 text-center font-medium text-white transition hover:bg-purple-700"
                >
                  Open Live Demo
                </a>
                <a
                  href={project.dashboard}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 px-4 py-3 text-center text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  Open Live Dashboard
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 px-4 py-3 text-center text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
              <p className="mb-4 tracking-[0.25em] text-purple-400">
                SUMMARY
              </p>
              <p className="leading-8 text-gray-300">{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}