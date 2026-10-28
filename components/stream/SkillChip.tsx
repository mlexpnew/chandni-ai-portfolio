"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/* Logo sources (pinned where the CDN allows it):
   - Devicon:      https://devicon.dev  (MIT)
   - Simple Icons: https://simpleicons.org (CC0)
   `invert` makes black monochrome logos readable on the dark theme. */
const DEV = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}.svg`;
const SI = (slug: string, color = "ffffff") => `https://cdn.simpleicons.org/${slug}/${color}`;

const ICONS: Record<string, { src: string; invert?: boolean }> = {
  Python: { src: DEV("python/python-original") },
  FastAPI: { src: DEV("fastapi/fastapi-original") },
  Flask: { src: DEV("flask/flask-original"), invert: true },
  Pydantic: { src: SI("pydantic", "E92063") },
  LangChain: { src: SI("langchain") },
  LangGraph: { src: SI("langgraph") },
  CrewAI: { src: SI("crewai", "FF5A50") },
  Gemini: { src: SI("googlegemini", "8E75B2") },
  Ollama: { src: SI("ollama") },
  "Hugging Face": { src: SI("huggingface", "FFD21E") },
  PostgreSQL: { src: DEV("postgresql/postgresql-original") },
  MongoDB: { src: DEV("mongodb/mongodb-original") },
  Pandas: { src: SI("pandas") },
  NumPy: { src: DEV("numpy/numpy-original") },
  "scikit-learn": { src: DEV("scikitlearn/scikitlearn-original") },
  PyTorch: { src: DEV("pytorch/pytorch-original") },
  TensorFlow: { src: DEV("tensorflow/tensorflow-original") },
  Docker: { src: DEV("docker/docker-original") },
  "GitHub Actions": { src: DEV("githubactions/githubactions-original") },
  Git: { src: DEV("git/git-original") },
  AWS: { src: DEV("amazonwebservices/amazonwebservices-plain-wordmark"), invert: true },
  Pytest: { src: DEV("pytest/pytest-original") },
  n8n: { src: SI("n8n", "EA4B71") },
  Streamlit: { src: SI("streamlit", "FF4B4B") },
};

/* Simple drawn icons for tools without an official open logo */
function Glyph({ name }: { name: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const glyphs: Record<string, ReactNode> = {
    SQL: (
      <>
        <ellipse {...s} cx="12" cy="6" rx="7" ry="3" />
        <path {...s} d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </>
    ),
    FAISS: (
      <>
        <circle {...s} cx="10" cy="10" r="6" />
        <path {...s} d="M14.5 14.5L20 20M7 10h6M10 7v6" />
      </>
    ),
    ChromaDB: (
      <>
        <circle {...s} cx="9" cy="12" r="5" />
        <circle {...s} cx="15" cy="12" r="5" />
      </>
    ),
    Pinecone: (
      <>
        <path {...s} d="M12 3l5 6-5 12-5-12z" />
        <path {...s} d="M7 9h10M8.5 14h7" />
      </>
    ),
    Groq: (
      <>
        <circle {...s} cx="12" cy="12" r="8" />
        <path {...s} d="M16 9a5 5 0 1 0 0 6h-4" />
      </>
    ),
    Tableau: (
      <>
        <path {...s} d="M12 4v16M4 12h16" />
        <path {...s} d="M6 6v4M4 8h4M18 6v4M16 8h4M6 14v4M4 16h4M18 14v4M16 16h4" />
      </>
    ),
    "Power BI": (
      <>
        <rect {...s} x="4" y="12" width="4" height="8" rx="1" />
        <rect {...s} x="10" y="8" width="4" height="12" rx="1" />
        <rect {...s} x="16" y="4" width="4" height="16" rx="1" />
      </>
    ),
  };
  const g = glyphs[name];
  if (g) return <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">{g}</svg>;
  return (
    <span className="sp-mono" aria-hidden="true">
      {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
    </span>
  );
}

export default function SkillChip({ name }: { name: string }) {
  const icon = ICONS[name];
  const [failed, setFailed] = useState(false);
  return (
    <span className="sp-chip-skill">
      {icon && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon.src}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          className={icon.invert ? "invert" : undefined}
          onError={() => setFailed(true)}
        />
      ) : (
        <Glyph name={name} />
      )}
      {name}
    </span>
  );
}
