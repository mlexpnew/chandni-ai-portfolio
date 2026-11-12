import Link from "next/link";
import { notFound } from "next/navigation";
import { projectGroups } from "@/data/projects";

const isReal = (url: string) => Boolean(url) && !url.includes("your-");

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
  invoiceiq: {
    impact: ["ITC at risk and a supplier chase list every month", "Only clean invoices reach Tally", "0 wrong invoices posted on an unseen layout"],
    architecture: ["Invoice PDFs → Rule extractor → (low confidence) LLM fallback → GST checks → Duplicates → GSTR-2B reconciliation → Workbook + Tally XML"],
    screenshots: ["Streamlit review app", "Excel review workbook", "CI benchmark report"],
    challenges: ["Layouts the rules have never seen", "Never letting a model guess overwrite a parsed figure", "Honest benchmarking with a held-out layout"],
    learnings: ["GST compliance rules", "Fail-closed design for finance", "Error analysis loops"],
  },
  hirelens: {
    impact: ["Shortlists that cite resume evidence", "Zero score change when names and gender are swapped", "Keyword stuffers filtered out"],
    architecture: ["Resumes → Redact identity → Sections + date ranges → Demonstrated vs listed skills → Rubric → Requirement gates → Shortlist + questions"],
    screenshots: ["Streamlit screening app", "Excel shortlist", "Benchmark vs TF-IDF and keyword ATS"],
    challenges: ["Resume layouts without headings", "Separating used skills from listed skills", "Proving fairness, not asserting it"],
    learnings: ["Responsible AI in hiring", "Counterfactual fairness tests", "Explainable scoring"],
  },
  retainlens: {
    impact: ["Ranked call list within a fixed budget", "EUR 406,848 realised value vs 111,726 random", "Reasons and talking points per customer"],
    architecture: ["Customers → Validate → Calibrated model → Reason codes → Expected-value planner → Call list; PSI drift monitor alongside"],
    screenshots: ["Streamlit call-plan app", "Model report", "API docs"],
    challenges: ["Probabilities that mean what they say", "Fairness without using protected attributes", "Uplift without campaign data"],
    learnings: ["Calibration", "Decision-focused ML evaluation", "Model monitoring"],
  },
  architectai: {
    impact: ["8/8 generated apps boot", "112/112 CRUD checks pass in CI", "CI green again after 6 weeks red"],
    architecture: ["Requirements → Planner → Generators → Reviewer → Quality Gate → Self-heal → Repository → CI verification"],
    screenshots: ["CLI Run", "Generated Project Tree", "Verification table"],
    challenges: ["Proving generated code works", "Keeping agents consistent", "Separating mock from live evaluation"],
    learnings: ["Agent orchestration", "Quality gates for LLM output", "End-to-end verification"],
  },
  supportpilot: {
    impact: ["Clean deduplicated ticket stream", "Secured triage API", "Documented operations"],
    architecture: ["JSONL Tickets → Validate → Dedup → Redact PII → Triage Model → FastAPI /triage"],
    screenshots: ["OpenAPI Docs", "Metrics Endpoint", "CI Pipeline"],
    challenges: ["Rate limiting per key", "Image size under 400 MB", "Safe key rotation"],
    learnings: ["Production API design", "Runbooks and on-call", "Team code review"],
  },
  reglens: {
    impact: ["Cited regulatory answers", "Faster compliance research"],
    architecture: ["Question → Plan Sub-questions → Retrieve Circulars → Draft → Verify → Cited Answer"],
    screenshots: ["Question Input", "Cited Answer", "Source Panel"],
    challenges: ["Dense legal text", "Citation accuracy", "Versioned regulations"],
    learnings: ["LangGraph loops", "Grounding and verification", "Domain retrieval"],
  },
  "crewai-content-workflow": {
    impact: ["Reviewed drafts", "Deployable Streamlit app"],
    architecture: ["Topic → Researcher → Writer → Evaluator → Final Content"],
    screenshots: ["Streamlit App", "Agent Log", "Final Output"],
    challenges: ["Agent hand-offs", "Evaluation criteria"],
    learnings: ["CrewAI roles", "Gemini prompting", "Streamlit deploys"],
  },
  "n8n-ugc-generator": {
    impact: ["Posts for 3 platforms", "No manual copywriting"],
    architecture: ["Reviews (CSV/API/Sheets) → Gemini Summary → Templates → X / LinkedIn / Instagram"],
    screenshots: ["n8n Workflow", "Templates", "Generated Posts"],
    challenges: ["Platform tone and length", "Messy review data"],
    learnings: ["n8n automation", "Template design"],
  },
  "data-analyst-agent": {
    impact: ["Analyst-style report from a raw CSV", "Insights in plain English"],
    architecture: ["CSV → Profile → Clean → Analyse (LLM-written code) → Charts → Insights → Recommendations"],
    screenshots: ["Upload screen", "Charts", "Insight report"],
    challenges: ["Running model-written code safely", "Explaining statistics simply"],
    learnings: ["Code-generating agents", "Gemini prompting", "Streamlit apps"],
  },
  wealthpilot: {
    impact: ["Explainable rebalancing proposals", "Human approval before any trade", "Full audit trail"],
    architecture: ["Portfolio → Monitor → Risk → Market → Decision → Trade → Tax → Compliance → Approval → Audit → Dashboard"],
    screenshots: ["Dashboard", "Agent timeline", "PDF report"],
    challenges: ["Coordinating 10 agents", "Compliance checks before execution"],
    learnings: ["Multi-agent design", "Human-in-the-loop systems", "Financial risk basics"],
  },
  "pricing-etl-airflow": {
    impact: ["Daily analytics-ready pricing table", "Fully reproducible stack"],
    architecture: ["Scrape → Exchange rate → Transform → Load PostgreSQL (Airflow DAG, Docker Compose)"],
    screenshots: ["Airflow DAG", "PostgreSQL table", "Docker Compose"],
    challenges: ["Idempotent daily loads", "Flaky external sources"],
    learnings: ["Airflow orchestration", "Data modelling", "Containers"],
  },
  "bangalore-airbnb-pricing": {
    impact: ["Price recommendations for hosts", "Database to app, end to end"],
    architecture: ["PostgreSQL → Features → ML model → Streamlit app"],
    screenshots: ["App", "Feature analysis", "Model results"],
    challenges: ["Seasonality and location effects", "Serving a model simply"],
    learnings: ["Feature engineering", "SQL + ML together", "Deployment"],
  },
  "trader-sentiment": {
    impact: ["Strategy ideas tied to sentiment regimes", "Live dashboard anyone can explore"],
    architecture: ["Fear & Greed Index + Hyperliquid trades → Daily aggregates → Metrics → Segments → Dashboard"],
    screenshots: ["Live dashboard", "Regime comparison", "Trader segments"],
    challenges: ["Joining market and trade data", "Separating noise from behaviour"],
    learnings: ["Behavioural analytics", "Financial metrics", "Dashboard storytelling"],
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
                {isReal(project.liveDemo) && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-purple-600 px-4 py-3 text-center font-medium text-white transition hover:bg-purple-700"
                >
                  Open Live Demo
                </a>
                )}
                {isReal(project.dashboard) && (
                <a
                  href={project.dashboard}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 px-4 py-3 text-center text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  Open Live Dashboard
                </a>
                )}
                {isReal(project.github) && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 px-4 py-3 text-center text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  View GitHub
                </a>
                )}
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