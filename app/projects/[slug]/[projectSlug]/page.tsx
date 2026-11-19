import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectGroups } from "@/data/projects";
import { ACCENTS } from "@/components/stream/ProjectCover";

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
  challenges: string[];
  learnings: string[];
};

const blueprintBySlug: Record<string, ProjectBlueprint> = {
  invoiceiq: {
    impact: ["ITC at risk and a supplier chase list every month", "Only clean invoices reach Tally", "0 wrong invoices posted on an unseen layout"],
    architecture: ["Invoice PDFs → Rule extractor → (low confidence) LLM fallback → GST checks → Duplicates → GSTR-2B reconciliation → Workbook + Tally XML"],
    challenges: ["Layouts the rules have never seen", "Never letting a model guess overwrite a parsed figure", "Honest benchmarking with a held-out layout"],
    learnings: ["GST compliance rules", "Fail-closed design for finance", "Error analysis loops"],
  },
  fairshortlist: {
    impact: ["Shortlists that cite resume evidence", "Zero score change when names and gender are swapped", "Keyword stuffers filtered out"],
    architecture: ["Resumes → Redact identity → Sections + date ranges → Demonstrated vs listed skills → Rubric → Requirement gates → Shortlist + questions"],
    challenges: ["Resume layouts without headings", "Separating used skills from listed skills", "Proving fairness, not asserting it"],
    learnings: ["Responsible AI in hiring", "Counterfactual fairness tests", "Explainable scoring"],
  },
  churnshield: {
    impact: ["Ranked call list within a fixed budget", "EUR 406,848 realised value vs 111,726 random", "Reasons and talking points per customer"],
    architecture: ["Customers → Validate → Calibrated model → Reason codes → Expected-value planner → Call list; PSI drift monitor alongside"],
    challenges: ["Probabilities that mean what they say", "Fairness without using protected attributes", "Uplift without campaign data"],
    learnings: ["Calibration", "Decision-focused ML evaluation", "Model monitoring"],
  },
  workbridge: {
    impact: ["128 alerts vs 35,143 from threshold rules", "46 of the top 50 cases real vs 3", "Held-out book: 44 of 47 suspicious customers caught with 59 flagged, vs 1,857 for rules"],
    architecture: ["Core-banking export → 8 typology detectors → alerts with evidence → one ranked case per customer → analyst review → draft STR; CTR and cross-border reports"],
    challenges: ["Telling a busy shop from structuring", "Mules hidden behind ordinary spending", "Name variants without false matches"],
    learnings: ["AML typologies and PMLA reporting", "Explainable detection", "Held-out benchmarking"],
  },
  ticktrust: {
    impact: ["0 bad quotes vs 2,870 single API (held-out)", "58/58 feed faults detected", "0 false alerts"],
    architecture: ["8 venues → drop stale → drop frozen → median, drop >1% outliers → quorum (ok / degraded / halt) → quote API + incidents → Slack"],
    challenges: ["Telling a real crash from a broken feed", "Refusing safely instead of guessing", "Venues without timestamps"],
    learnings: ["Robust statistics", "Market data engineering", "Held-out fault benchmarking"],
  },
  architectai: {
    impact: ["8/8 generated apps boot", "112/112 CRUD checks pass in CI", "200/200 generated files compile"],
    architecture: ["Requirements → Planner → Generators → Reviewer → Quality Gate → Self-heal → Repository → CI verification"],
    challenges: ["Proving generated code works", "Keeping agents consistent", "Separating mock from live evaluation"],
    learnings: ["Agent orchestration", "Quality gates for LLM output", "End-to-end verification"],
  },
  supportpilot: {
    impact: ["1M tickets in 9.4 s", "About 109 bytes of memory per ticket ID", "No PII reaches downstream models"],
    architecture: ["JSONL tickets → stream (1 MB line cap) → Pydantic v2 validate → dedup by ticket ID → redact email / phone / card → accepted + rejected files (atomic) → summary line; OrderHub client for order status"],
    challenges: ["Memory for dedup at millions of records", "Bad files without crashing the run", "Never overwriting outputs halfway"],
    learnings: ["Streaming data validation", "Measuring before scaling", "Resilient API clients"],
  },
  reglens: {
    impact: ["Every claim cited and verified", "Off-topic questions refused at zero LLM cost", "Refuses instead of guessing when nothing is verified"],
    architecture: ["Question → relevance gate → Planner (≤3 sub-queries) → ChromaDB + cross-encoder rerank → Analyst → Compliance Checker (number check + LLM judge, one revise loop) → cited answer or 'insufficient evidence'"],
    challenges: ["Dense legal text", "Citation accuracy", "Versioned regulations"],
    learnings: ["LangGraph loops", "Grounding and verification", "Domain retrieval"],
  },
  proofpost: {
    impact: ["0 problem posts vs 606 naive", "100% of safe reviews used", "About 3,800 reviews per second"],
    architecture: ["Weekly trigger → Reviews sheet → ProofPost API (screen → redact → verbatim quote → compose → 9 checks) → Approval sheet + Slack → Human approves"],
    challenges: ["Quoting customers without rewording them", "Catching incentivised and fake reviews", "Personal data hidden in review text"],
    learnings: ["n8n + API design", "Compliance-first automation", "Held-out benchmarking"],
  },
  clearmis: {
    impact: ["Exact revenue vs up to 14% raw-export error", "Right driver 12/12 months", "0 unverified numbers in summaries"],
    architecture: ["Export → map columns → clean + log fixes → KPIs · drivers · unusual days → summary from facts → number check → Excel MIS; questions → validated plan → fixed pandas code"],
    challenges: ["Indian number and date formats", "Explaining change beyond the overall trend", "Stopping invented numbers"],
    learnings: ["Safe LLM design without code execution", "Robust anomaly detection", "Held-out benchmarking"],
  },
  clausewise: {
    impact: ["0 HR-only leaks vs 16 for a typical RAG", "0 outdated answers vs 15", "Honest 'not covered' answers logged as policy gaps"],
    architecture: ["Policy files → numbered clauses (version, date, audience) → current versions for this role → BM25 + HR glossary (+ embeddings) → answer / restricted / not covered → quoted clause with citation"],
    challenges: ["Refusing honestly without refusing too much", "Paraphrased and Hinglish questions", "Never leaking restricted documents"],
    learnings: ["Retrieval evaluation with held-out sets", "Access control in RAG", "Version-aware answers"],
  },
  balancebook: {
    impact: ["50-78% less tax than band rebalancing", "0% of months outside the client's band", "More after-tax wealth for most clients"],
    architecture: ["Clients + lots → suitability check → new money to underweight → band trigger → cheapest lots by tax and exit load → March gain harvest → plan → adviser approval → audit log"],
    challenges: ["Indian capital gains rules and the ₹1.25 lakh exemption", "Partial rebalancing that still restores the band", "A fair after-tax comparison"],
    learnings: ["Tax-lot optimisation", "Backtesting with held-out markets", "Human-in-the-loop design"],
  },
  shelfwatch: {
    impact: ["3 false alerts vs 7,264", "No delisting after an incomplete crawl", "Prices in rupees with a guarded exchange rate"],
    architecture: ["Catalogue pages → parse with fallbacks → completeness check + rate guard → mass-change guard → diff by product ID → alerts + PostgreSQL (Airflow DAG)"],
    challenges: ["Scrapers fail quietly", "Currency and sale-price parsing", "Testing without a real competitor: simulated catalogue with faults"],
    learnings: ["Data quality gates", "Idempotent pipelines", "Honest held-out evaluation"],
  },
  "bangalore-airbnb-pricing": {
    impact: ["A recommended nightly price in one click", "Weekend and demand adjustments built in"],
    architecture: ["Listing inputs → feature encoding → scikit-learn model → weekend / demand adjustment → Streamlit app"],
    challenges: ["Seasonality and location effects", "Serving a model simply"],
    learnings: ["Feature engineering", "Serving a trained model", "Deployment"],
  },
  "financial-health-analyzer": {
    impact: ["10 financial ratios computed from one CSV", "Headline sentiment next to the numbers", "Plain-language summary of trends"],
    architecture: ["CSV upload or yFinance → ratio engine (profitability, liquidity, leverage, efficiency, returns) → VADER headline sentiment → trend summary → Streamlit pages"],
    challenges: ["Messy CSV columns and separators", "Turning ratios into a readable verdict", "Combining text and numbers"],
    learnings: ["Financial statement analysis", "Sentiment scoring", "Multipage Streamlit apps"],
  },
  tiltguard: {
    impact: ["92% of injected episodes caught vs 50%", "One seventh of the alerts of fixed limits", "Plain-language reason on every alert"],
    architecture: ["Fills → orders → each trader's last 30 days → tilt, size spike, overtrading (firm-wide limits for new accounts) + daily loss, drawdown, concentration → alerts → risk desk"],
    challenges: ["No labels in real trades: testing with injected episodes", "Keeping alert noise readable", "Cold start for new accounts"],
    learnings: ["Behavioural risk detection", "Bootstrap confidence intervals", "Honest held-out evaluation"],
  },
};

/* Real benchmark charts and demos (from each repo's README results). */
const RESULT_VISUALS: Record<string, { src: string; caption: string }> = {
  workbridge: { src: "/thumbs/workbridge.webp", caption: "Threshold rules vs WorkBridge on six months of benchmark transactions" },
  clearmis: { src: "/thumbs/clearmis.webp", caption: "Monthly revenue: raw export summed vs ClearMIS, against the true ledger" },
  clausewise: { src: "/thumbs/clausewise.webp", caption: "Questions answered right: typical RAG vs Clausewise, on dev and two held-out handbooks" },
  balancebook: { src: "/thumbs/balancebook.webp", caption: "Tax and exit loads per client over 10 years, vs fixed-date and band rebalancing" },
  proofpost: { src: "/thumbs/proofpost.webp", caption: "The weekly n8n workflow, from reviews to an approved post" },
  shelfwatch: { src: "/thumbs/shelfwatch.webp", caption: "Original ETL vs ShelfWatch on a simulated catalogue with known faults" },
  tiltguard: { src: "/thumbs/tiltguard.webp", caption: "Fixed limits vs TiltGuard on real Hyperliquid trades (held-out)" },
  ticktrust: { src: "/thumbs/ticktrust.webp", caption: "Two venues flash-crash at once; the TickTrust reference price holds" },
  reglens: { src: "https://raw.githubusercontent.com/mlexpnew/reglens/main/docs/demo.gif", caption: "Live run: question in, cited and verified answer out" },
};

const ALL = projectGroups.flatMap((g) => g.projects.map((p) => ({ group: g, project: p })));

function find(slug: string, projectSlug: string) {
  const group = projectGroups.find((g) => g.slug === slug);
  const project = group?.projects.find((p) => p.slug === projectSlug);
  return group && project ? { group, project } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, projectSlug } = await params;
  const hit = find(slug, projectSlug);
  if (!hit) return {};
  return {
    title: `${hit.project.title.split(":")[0]} · Chandini Pradhan`,
    description: hit.project.description,
  };
}

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
  const hit = find(slug, projectSlug);
  if (!hit) return notFound();
  const { group, project } = hit;

  const accent = ACCENTS[group.slug] ?? "#8B7BFF";
  const name = project.title.split(":")[0];
  const blueprint = blueprintBySlug[project.slug];
  const visual = RESULT_VISUALS[project.slug];
  const steps = blueprint ? blueprint.architecture.flatMap((a) => a.split(" → ")) : [];
  const idx = ALL.findIndex((x) => x.project.slug === project.slug);
  const prev = ALL[(idx - 1 + ALL.length) % ALL.length];
  const next = ALL[(idx + 1) % ALL.length];
  const href = (x: (typeof ALL)[number]) => `/projects/${x.group.slug}/${x.project.slug}`;

  const card = "rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8";
  const label = "mb-5 text-xs font-semibold uppercase tracking-[0.18em]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080F] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: `radial-gradient(60% 100% at 80% 0%, ${accent}33, transparent 70%)` }}
      />
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
        <nav className="mb-12 flex items-center justify-between text-sm text-gray-400">
          <Link href="/" className="transition hover:text-white">← All projects</Link>
          <span>{group.domain}</span>
        </nav>

        {/* header */}
        <header className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            {project.sector && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                {project.sector}
              </p>
            )}
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {project.metric && (
              <div className={card}>
                <p className="text-5xl font-extrabold tracking-tight">{project.metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{project.metric.label}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {isReal(project.github) && (
                <a href={project.github} target="_blank" rel="noreferrer" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                  View code on GitHub
                </a>
              )}
              {isReal(project.liveDemo) && (
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white/50">
                  Live demo
                </a>
              )}
              {isReal(project.dashboard) && (
                <a href={project.dashboard} target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white/50">
                  Dashboard
                </a>
              )}
            </div>
          </div>
        </header>

        {/* results */}
        <section className="mt-16">
          <h2 className={label} style={{ color: accent }}>Results</h2>
          {visual && (
            <figure className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visual.src} alt={visual.caption} className="block w-full" loading="lazy" />
              <figcaption className="border-t border-white/10 px-5 py-3 text-sm text-gray-400">{visual.caption}</figcaption>
            </figure>
          )}
          <ul className="grid gap-4 md:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 leading-7 text-gray-200">
                <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full" style={{ background: accent }} />
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* overview */}
        <section className={`mt-12 ${card}`}>
          <h2 className={label} style={{ color: accent }}>The problem and the build</h2>
          <p className="max-w-4xl text-[17px] leading-8 text-gray-300">{project.longDescription}</p>
        </section>

        {/* how it works */}
        {steps.length > 0 && (
          <section className={`mt-6 ${card}`}>
            <h2 className={label} style={{ color: accent }}>How it works</h2>
            <ol className="flex flex-wrap items-stretch gap-2">
              {steps.map((step, i) => (
                <li key={`${i}-${step}`} className="flex items-center gap-2">
                  <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200">
                    <span className="mr-2 font-semibold" style={{ color: accent }}>{i + 1}</span>
                    {step}
                  </span>
                  {i < steps.length - 1 && <span className="text-gray-600" aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {blueprint && (
          <>
            {/* impact */}
            <section className="mt-6 grid gap-4 md:grid-cols-3">
              {blueprint.impact.map((item) => (
                <div key={item} className={card}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Impact</p>
                  <p className="mt-3 leading-7 text-gray-200">{item}</p>
                </div>
              ))}
            </section>

            {/* challenges + learnings */}
            <section className="mt-6 grid gap-6 md:grid-cols-2">
              <div className={card}>
                <h2 className={label} style={{ color: accent }}>Hard parts</h2>
                <ul className="space-y-3 text-gray-300">
                  {blueprint.challenges.map((c) => <li key={c} className="leading-7">• {c}</li>)}
                </ul>
              </div>
              <div className={card}>
                <h2 className={label} style={{ color: accent }}>What I learned</h2>
                <ul className="space-y-3 text-gray-300">
                  {blueprint.learnings.map((l) => <li key={l} className="leading-7">• {l}</li>)}
                </ul>
              </div>
            </section>
          </>
        )}

        {/* outcome */}
        <section className="mt-6 rounded-2xl border p-6 md:p-8" style={{ borderColor: `${accent}55`, background: `${accent}12` }}>
          <h2 className={label} style={{ color: accent }}>Outcome</h2>
          <p className="text-lg leading-8 text-gray-100">{project.outcome}</p>
        </section>

        {/* prev / next */}
        <nav className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          <Link href={href(prev)} className="group rounded-xl border border-white/10 p-5 transition hover:border-white/30">
            <span className="text-xs uppercase tracking-[0.18em] text-gray-500">← Previous</span>
            <span className="mt-2 block font-semibold group-hover:text-white">{prev.project.title.split(":")[0]}</span>
          </Link>
          <Link href={href(next)} className="group rounded-xl border border-white/10 p-5 text-right transition hover:border-white/30">
            <span className="text-xs uppercase tracking-[0.18em] text-gray-500">Next →</span>
            <span className="mt-2 block font-semibold group-hover:text-white">{next.project.title.split(":")[0]}</span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
