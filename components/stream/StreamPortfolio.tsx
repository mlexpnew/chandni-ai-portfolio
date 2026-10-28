"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as RPointerEvent, ReactNode } from "react";
import AgentSphere from "./AgentSphere";
import type { Project, ProjectGroup } from "@/data/projects";

type Cert = { title: string; issuer: string; image: string; link: string };
type Pub = { title: string; description: string; link: string };
type CaseStudy = { slug: string; company: string; title: string; category: string };

type ProfileKey = "recruiter" | "engineer" | "founder";

const PROFILES: { key: ProfileKey; label: string; hue: string; line: string; tagline: string; order: string[] }[] = [
  {
    key: "recruiter",
    label: "Recruiter",
    hue: "linear-gradient(135deg,#7C5CFF,#3B82F6)",
    line: "Hiring an AI engineer? Start with the shipped work.",
    tagline: "Agentic AI engineer. 4 internships, 1 current role, 25+ projects. Available to join now.",
    order: ["agentic-ai", "experience", "generative-ai", "certs", "machine-learning", "automation", "data-analytics", "internship-projects", "writing", "cases"],
  },
  {
    key: "engineer",
    label: "Engineer",
    hue: "linear-gradient(135deg,#FF4D6D,#F59E0B)",
    line: "Want the architecture? Every card opens the pipeline.",
    tagline: "Multi-agent orchestration, RAG pipelines and FastAPI services with tests, Docker and CI.",
    order: ["agentic-ai", "generative-ai", "automation", "machine-learning", "writing", "experience", "data-analytics", "internship-projects", "certs", "cases"],
  },
  {
    key: "founder",
    label: "Founder",
    hue: "linear-gradient(135deg,#10B981,#06B6D4)",
    line: "Need agents that save real hours? Here is what they did.",
    tagline: "I turn messy workflows into AI agents: support triage, content pipelines, compliance research.",
    order: ["agentic-ai", "automation", "generative-ai", "cases", "experience", "data-analytics", "machine-learning", "internship-projects", "certs", "writing"],
  },
];

const EXPERIENCE = [
  { role: "Agentic AI Engineer", org: "Zetheta Algorithms", when: "Jun 2026 – Present", note: "Building multi-agent LLM workflows for fintech research and automation.", now: true },
  { role: "AI Research Intern", org: "CodingJr", when: "Jun – Aug 2025", note: "Generative AI and NLP features for education products; trained and evaluated ML models." },
  { role: "Data Analyst Intern", org: "Unified Mentor", when: "Feb – May 2025", note: "Cleaned large datasets and built Tableau and Excel dashboards for business reporting." },
  { role: "Machine Learning Intern", org: "MyDailyWork", when: "Dec 2024 – Feb 2025", note: "Predictive models with scikit-learn, feature engineering and model evaluation." },
  { role: "Software Engineer Intern", org: "Inferigence Quotient LLP", when: "Jul – Dec 2024", note: "Python applications and automated workflows; cut processing time by 25%." },
];

const SKILLS = [
  ["Agents & LLMs", "CrewAI · LangChain · LangGraph · OpenAI · Gemini · Groq · Ollama"],
  ["Retrieval", "RAG · Embeddings · FAISS · ChromaDB · Pinecone · Hugging Face"],
  ["Backend", "Python · FastAPI · Flask · Pydantic · Docker · GitHub Actions · Pytest"],
  ["Data", "SQL · PostgreSQL · MongoDB · Pandas · NumPy · Power BI · Tableau"],
  ["ML", "scikit-learn · XGBoost · TensorFlow · PyTorch · NLP"],
  ["Automation", "n8n · Streamlit · Gradio"],
];

const POSTERS: Record<string, [string, string]> = {
  "agentic-ai": ["#2A1B6B", "#7C5CFF"],
  "generative-ai": ["#3B0F3A", "#E0457B"],
  "machine-learning": ["#0F2E3B", "#22B8CF"],
  "data-analytics": ["#13301F", "#34D399"],
  automation: ["#3A2408", "#F59E0B"],
  "internship-projects": ["#1E2433", "#94A3B8"],
};

type Selected = { project: Project; group: ProjectGroup } | null;

function readProfile(): ProfileKey | null {
  try {
    return (sessionStorage.getItem("sp-profile") as ProfileKey) || null;
  } catch {
    return null;
  }
}

export default function StreamPortfolio({
  groups,
  certifications,
  publications,
  caseStudies,
}: {
  groups: ProjectGroup[];
  certifications: Cert[];
  publications: Pub[];
  caseStudies: CaseStudy[];
}) {
  const [stage, setStage] = useState<"intro" | "who" | "browse">("intro");
  const [profile, setProfile] = useState<ProfileKey>("recruiter");
  const [selected, setSelected] = useState<Selected>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = readProfile();
    if (saved) {
      setProfile(saved);
      setStage("browse");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setStage("who"), reduce ? 200 : 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (k: ProfileKey) => {
    setProfile(k);
    try {
      sessionStorage.setItem("sp-profile", k);
    } catch {}
    setStage("browse");
    window.scrollTo({ top: 0 });
  };

  const p = PROFILES.find((x) => x.key === profile)!;
  const agentic = groups.find((g) => g.slug === "agentic-ai");
  const featured = agentic?.projects[0];

  const rows: Record<string, ReactNode> = {};
  groups.forEach((g) => {
    rows[g.slug] =
      g.slug === "agentic-ai" ? (
        <Row key={g.slug} title={`Top ${g.projects.length} for ${p.label.toLowerCase()}s`} sub="Agentic AI originals" href={`/projects/${g.slug}`}>
          {g.projects.map((proj, i) => (
            <RankCard key={proj.slug} rank={i + 1} project={proj} group={g} onOpen={() => setSelected({ project: proj, group: g })} />
          ))}
        </Row>
      ) : (
        <Row key={g.slug} title={g.domain} href={`/projects/${g.slug}`}>
          {g.projects.map((proj, i) => (
            <PosterCard key={proj.slug} index={i} project={proj} group={g} onOpen={() => setSelected({ project: proj, group: g })} />
          ))}
        </Row>
      );
  });
  rows.experience = (
    <Row key="experience" title="The journey so far" sub="Experience">
      {EXPERIENCE.map((x, i) => (
        <div key={x.org} className="sp-ep">
          <span className="sp-ep-n">E{EXPERIENCE.length - i}</span>
          <div className="sp-ep-body">
            <div className="sp-ep-when">
              {x.when}
              {x.now && <b className="sp-live">Now streaming</b>}
            </div>
            <h4>{x.role}</h4>
            <div className="sp-ep-org">{x.org}</div>
            <p>{x.note}</p>
          </div>
        </div>
      ))}
    </Row>
  );
  rows.certs = (
    <Row key="certs" title="Certified" sub="Credentials">
      {certifications.map((c) => (
        <div key={c.title} className="sp-cert">
          <div className="sp-cert-img">
            <Image src={c.image} alt={`${c.title} certificate`} fill sizes="320px" style={{ objectFit: "cover" }} />
          </div>
          <h4>{c.title}</h4>
          <span>{c.issuer}</span>
        </div>
      ))}
    </Row>
  );
  rows.writing = (
    <Row key="writing" title="Technical write-ups" sub="Documentaries">
      {publications.map((x) => (
        <a key={x.title} className="sp-doc" href={x.link} target="_blank" rel="noreferrer">
          <h4>{x.title}</h4>
          <p>{x.description}</p>
          <span>Read on GitHub</span>
        </a>
      ))}
    </Row>
  );
  rows.cases = (
    <Row key="cases" title="Industry case studies" sub="Self-study breakdowns of public AI systems" href="/case-studies">
      {caseStudies.map((c) => (
        <Link key={c.slug} href="/case-studies" className="sp-case">
          <span className="sp-case-co">{c.company}</span>
          <h4>{c.title}</h4>
          <span className="sp-case-cat">{c.category}</span>
        </Link>
      ))}
    </Row>
  );

  return (
    <div className="sp">
      {stage === "intro" && (
        <div className="sp-intro" onClick={() => setStage("who")} role="button" tabIndex={0} aria-label="Skip intro" onKeyDown={(e) => e.key === "Enter" && setStage("who")}>
          <div className="sp-intro-word" aria-hidden="true">
            {"CHANDINI".split("").map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 70}ms` }}>
                {c}
              </span>
            ))}
          </div>
          <div className="sp-intro-sub">Agentic AI · Season 2026</div>
          <span className="sp-skip">Skip intro</span>
        </div>
      )}

      {stage === "who" && (
        <div className="sp-who">
          <h1>Who&apos;s exploring?</h1>
          <div className="sp-who-grid">
            {PROFILES.map((x, i) => (
              <button key={x.key} className="sp-who-btn" onClick={() => choose(x.key)} style={{ animationDelay: `${i * 90}ms` }}>
                <span className="sp-avatar" style={{ background: x.hue }}>
                  <AvatarFace kind={x.key} />
                </span>
                <span className="sp-who-label">{x.label}</span>
              </button>
            ))}
          </div>
          <p className="sp-who-note">Pick one. The site reorders itself for what you care about.</p>
        </div>
      )}

      {stage === "browse" && (
        <>
          <header className={`sp-nav ${scrolled ? "is-solid" : ""}`}>
            <a href="#top" className="sp-logo">CHANDINI</a>
            <nav aria-label="Sections">
              <a href="#rows">Projects</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>
            <button className="sp-switch" onClick={() => setStage("who")} title="Switch profile">
              <span className="sp-avatar sm" style={{ background: p.hue }}>
                <AvatarFace kind={p.key} />
              </span>
              <span className="sp-switch-l">{p.label}</span>
            </button>
          </header>

          <section className="sp-bill" id="top">
            <div className="sp-bill-3d">
              <AgentSphere className="sp-sphere" />
            </div>
            <div className="sp-bill-shade" />
            <div className="sp-bill-copy">
              <div className="sp-badge">
                <span className="sp-c-mark">C</span> ORIGINAL SERIES
              </div>
              <h1 className="sp-title">Chandini Pradhan</h1>
              <div className="sp-meta">
                <b>98% match</b>
                <span>2026</span>
                <span className="sp-chip">AI ENGINEER</span>
                <span>Bengaluru · Remote</span>
              </div>
              <p className="sp-line">{p.line}</p>
              <p className="sp-tag">{p.tagline}</p>
              <div className="sp-actions">
                {featured && agentic && (
                  <button className="sp-play" onClick={() => setSelected({ project: featured, group: agentic })}>
                    <PlayIcon /> Play {featured.title}
                  </button>
                )}
                <a className="sp-more" href="#contact">
                  <InfoIcon /> Hire me
                </a>
              </div>
              <p className="sp-hint">Drag the agent network to spin it</p>
            </div>
          </section>

          <main id="rows" className="sp-rows">
            {p.order.map((k) => rows[k])}

            <section id="about" className="sp-about">
              <div className="sp-about-photo">
                <Image src="/profile.jpg" alt="Chandini Pradhan" fill sizes="(max-width: 760px) 100vw, 320px" style={{ objectFit: "cover" }} />
                <span className="sp-starring">Starring</span>
              </div>
              <div>
                <h2>About the lead</h2>
                <p>
                  I&apos;m an AI engineer in Bengaluru building agentic systems: LLM workflows where agents break down a goal, call tools, check their own output and hand results to real software.
                </p>
                <p>
                  I work on agentic AI at Zetheta Algorithms after four internships across AI research, machine learning, data analytics and software engineering. That mix is why I care about the unglamorous parts too: validation, tests, logging, deployment and docs.
                </p>
                <div className="sp-stats">
                  <div><b>25+</b><span>projects built</span></div>
                  <div><b>4</b><span>internships</span></div>
                  <div><b>5</b><span>agentic systems</span></div>
                </div>
              </div>
            </section>

            <section id="skills" className="sp-skills">
              <h2>Cast &amp; crew</h2>
              <p className="sp-skills-sub">The tools behind every episode.</p>
              <div className="sp-skill-grid">
                {SKILLS.map(([k, v]) => (
                  <div key={k}>
                    <h4>{k}</h4>
                    <p>{v}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="sp-contact">
              <h2>Ready for the next episode?</h2>
              <p>Open to AI Engineer, Agentic AI and GenAI Engineer roles. Available to join immediately.</p>
              <div className="sp-contact-actions">
                <a className="sp-play" href="mailto:mlexpnew@gmail.com">
                  <PlayIcon /> Email me
                </a>
                <a className="sp-more" href="https://www.linkedin.com/in/chandni-pradhan-67aa91324/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="sp-more" href="https://github.com/mlexpnew" target="_blank" rel="noreferrer">GitHub</a>
              </div>
              <ul className="sp-contact-list">
                <li><span>Email</span>mlexpnew@gmail.com</li>
                <li><span>Phone</span>+91 76192 54532</li>
                <li><span>LeetCode</span><a href="https://leetcode.com/u/chandni_56/" target="_blank" rel="noreferrer">chandni_56</a></li>
                <li><span>Medium</span><a href="https://medium.com/@aschandinip" target="_blank" rel="noreferrer">@aschandinip</a></li>
              </ul>
            </section>
          </main>
          <footer className="sp-foot">© 2026 Chandini Pradhan · Built with Next.js and a hand-rolled 3D canvas</footer>
        </>
      )}

      {selected && <Modal sel={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ---------- rows & cards ---------- */

function Row({ title, sub, href, children }: { title: string; sub?: string; href?: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <section className="sp-row">
      <div className="sp-row-head">
        <h3>
          {title}
          {sub && <small>{sub}</small>}
        </h3>
        {href && (
          <Link href={href} className="sp-explore">
            Explore all
          </Link>
        )}
      </div>
      <div className="sp-row-wrap">
        <button className="sp-arrow l" onClick={() => go(-1)} aria-label={`Scroll ${title} left`}>‹</button>
        <div className="sp-track" ref={track}>
          {children}
        </div>
        <button className="sp-arrow r" onClick={() => go(1)} aria-label={`Scroll ${title} right`}>›</button>
      </div>
    </section>
  );
}

function useTilt() {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = useCallback((e: RPointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 18}deg`);
    el.style.setProperty("--rx", `${-y * 14}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }, []);
  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

function PosterArt({ seed, colors }: { seed: number; colors: [string, string] }) {
  const shapes = Array.from({ length: 6 }, (_, i) => {
    const a = (seed * 37 + i * 61) % 100;
    const b = (seed * 53 + i * 29) % 100;
    return { cx: a, cy: b, r: 8 + ((seed + i * 7) % 18) };
  });
  return (
    <svg className="sp-art" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`g${seed}${colors[1]}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="100" height="60" fill={`url(#g${seed}${colors[1]})`} />
      {shapes.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy * 0.6} r={s.r} fill="none" stroke="#fff" strokeOpacity={0.12 + (i % 3) * 0.06} strokeWidth="0.6" />
      ))}
      {shapes.slice(0, 4).map((s, i) => (
        <line key={`l${i}`} x1={s.cx} y1={s.cy * 0.6} x2={shapes[i + 1].cx} y2={shapes[i + 1].cy * 0.6} stroke="#fff" strokeOpacity="0.18" strokeWidth="0.4" />
      ))}
    </svg>
  );
}

function PosterCard({ project, group, index, onOpen }: { project: Project; group: ProjectGroup; index: number; onOpen: () => void }) {
  const tilt = useTilt();
  const colors = POSTERS[group.slug] ?? ["#1b1b2f", "#7C5CFF"];
  return (
    <button className="sp-card" onClick={onOpen} {...tilt} aria-label={`Open ${project.title}`}>
      <div className="sp-card-in">
        <PosterArt seed={index + project.title.length} colors={colors} />
        <span className="sp-glare" />
        <span className="sp-card-title">{project.title}</span>
        <div className="sp-card-more">
          <p>{project.description}</p>
          <div className="sp-card-tags">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function RankCard({ project, group, rank, onOpen }: { project: Project; group: ProjectGroup; rank: number; onOpen: () => void }) {
  const tilt = useTilt();
  return (
    <div className="sp-rank">
      <span className="sp-rank-n" aria-hidden="true">{rank}</span>
      <button className="sp-card tall" onClick={onOpen} {...tilt} aria-label={`Open ${project.title}`}>
        <div className="sp-card-in">
          <PosterArt seed={rank * 9} colors={POSTERS[group.slug]} />
          <span className="sp-glare" />
          {project.slug === "reglens" && <span className="sp-flag">New episodes soon</span>}
          {project.liveDemo && <span className="sp-flag live">Live demo</span>}
          <span className="sp-card-title big">{project.title}</span>
          <div className="sp-card-more">
            <p>{project.description}</p>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ---------- modal ---------- */

function Modal({ sel, onClose }: { sel: NonNullable<Selected>; onClose: () => void }) {
  const { project, group } = sel;
  const real = (u: string) => Boolean(u) && !u.includes("your-");
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = o;
    };
  }, []);
  return (
    <div className="sp-modal-bg" onClick={onClose}>
      <div className="sp-modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <div className="sp-modal-hero">
          <PosterArt seed={project.title.length * 3} colors={POSTERS[group.slug] ?? ["#1b1b2f", "#7C5CFF"]} />
          <div className="sp-modal-fade" />
          <h2>{project.title}</h2>
          <button ref={closeRef} className="sp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="sp-modal-body">
          <div>
            <div className="sp-meta">
              <b>{group.domain}</b>
              {project.techStack.slice(0, 2).map((t) => (
                <span key={t} className="sp-chip">{t}</span>
              ))}
            </div>
            <p className="sp-modal-desc">{project.longDescription}</p>
            <h4>Highlights</h4>
            <ul>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <aside>
            <p><span>Stack</span>{project.techStack.join(", ")}</p>
            <p><span>Outcome</span>{project.outcome}</p>
            <div className="sp-modal-links">
              <Link className="sp-play" href={`/projects/${group.slug}/${project.slug}`}>
                <PlayIcon /> Full case study
              </Link>
              {real(project.liveDemo) && (
                <a className="sp-more" href={project.liveDemo} target="_blank" rel="noreferrer">Live demo</a>
              )}
              {real(project.github) && (
                <a className="sp-more" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- icons ---------- */

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10.5v6M12 7.2v.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function AvatarFace({ kind }: { kind: ProfileKey }) {
  const mouth = kind === "recruiter" ? "M8 15c2 2 6 2 8 0" : kind === "engineer" ? "M8 15h8" : "M8 14.5c2 2.5 6 2.5 8 0";
  return (
    <svg viewBox="0 0 24 24" width="56%" height="56%" aria-hidden="true">
      <circle cx="8.5" cy="9.5" r="1.4" fill="#fff" />
      <circle cx="15.5" cy="9.5" r="1.4" fill="#fff" />
      <path d={mouth} stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {kind === "engineer" && <path d="M5 6.5l2-1.5M19 6.5l-2-1.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />}
    </svg>
  );
}
