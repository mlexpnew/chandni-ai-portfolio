/* One consistent, text-first cover for every project card.
   No screenshots or baked-in text: sector, title and one verified metric,
   tinted by the row's accent so all rows read as one system. */

import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export const ACCENTS: Record<string, string> = {
  "agentic-ai": "#8B7BFF",
  "generative-ai": "#F06A9B",
  "data-analytics": "#3DD6A3",
};

export default function ProjectCover({
  project,
  groupSlug,
  badge,
  hideTitle = false,
}: {
  project: Project;
  groupSlug: string;
  badge?: string;
  hideTitle?: boolean;
}) {
  const accent = ACCENTS[groupSlug] ?? "#8B7BFF";
  return (
    <div className="sp-pc" style={{ "--pc-accent": accent } as CSSProperties}>
      <div className="sp-pc-top">
        {project.sector && <span className="sp-pc-sector">{project.sector}</span>}
        {badge && <span className="sp-pc-badge">{badge}</span>}
      </div>
      {!hideTitle && <h4 className="sp-pc-title">{project.title.split(":")[0]}</h4>}
      {!hideTitle && <p className="sp-pc-desc">{project.description}</p>}
      <div className="sp-pc-bottom">
        {project.metric ? (
          <>
            <span className="sp-pc-value">{project.metric.value}</span>
            <span className="sp-pc-label">{project.metric.label}</span>
          </>
        ) : (
          <span className="sp-pc-stack">{project.techStack.slice(0, 3).join(" · ")}</span>
        )}
      </div>
    </div>
  );
}
