/* Unique flat line-art covers, one per project.
   All drawn in a 160x96 box with the same stroke width; the card places this
   box in the upper 60% and keeps the title in the lower 40%. */

import type { ReactNode } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const SOFT = "rgba(255,255,255,.16)";
const HI = "rgba(255,255,255,.9)";

function Doc({ x, y, w = 34, h = 44, lines = 4 }: { x: number; y: number; w?: number; h?: number; lines?: number }) {
  return (
    <g>
      <path {...S} d={`M${x} ${y}h${w - 9}l9 9v${h - 9}h-${w}z`} />
      <path {...S} d={`M${x + w - 9} ${y}v9h9`} />
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} {...S} d={`M${x + 6} ${y + 16 + i * 7}h${i % 2 ? w - 18 : w - 12}`} />
      ))}
    </g>
  );
}

const C: Record<string, ReactNode> = {
  /* ---------- Agentic AI ---------- */
  architectai: (
    <g>
      {Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${16 + i * 16} 4v86`} stroke={SOFT} strokeWidth=".6" />)}
      {Array.from({ length: 6 }, (_, i) => <path key={`h${i}`} d={`M8 ${8 + i * 16}h144`} stroke={SOFT} strokeWidth=".6" />)}
      <rect {...S} x="64" y="10" width="32" height="18" rx="3" />
      <rect {...S} x="22" y="50" width="30" height="18" rx="3" />
      <rect {...S} x="65" y="58" width="30" height="18" rx="3" />
      <rect {...S} x="108" y="50" width="30" height="18" rx="3" />
      <path {...S} d="M80 28v14M37 42h86M37 42v8M80 42v16M123 42v8" />
      <circle cx="80" cy="42" r="2.6" fill={HI} />
    </g>
  ),
  supportpilot: (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${14 + i * 8} ${12 + i * 12})`}>
          <rect {...S} width="34" height="16" rx="3" />
          <path {...S} d="M6 6h18M6 11h12" />
        </g>
      ))}
      <path {...S} d="M66 36h18M84 36l18-20M84 36h20M84 36l18 20" />
      <path {...S} d="M98 13l4 3-4 3M100 33l4 3-4 3M98 53l4 3-4 3" />
      {[["Bug", 6], ["Billing", 26], ["Order", 46]].map(([t, y]) => (
        <g key={t as string}>
          <path {...S} d={`M110 ${y}v16h36v-16`} />
          <text x="128" y={(y as number) + 12} fontSize="7" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">{t}</text>
        </g>
      ))}
    </g>
  ),
  reglens: (
    <g>
      <path {...S} d="M42 8h50l12 12v68H42z" />
      <path {...S} d="M92 8v12h12" />
      {[22, 30, 38, 46, 54, 62, 70].map((y, i) => <path key={y} {...S} d={`M50 ${y}h${i % 3 === 1 ? 30 : 44}`} />)}
      <rect x="48" y="35" width="48" height="6" rx="2" fill="rgba(255,230,120,.45)" />
      <rect x="48" y="59" width="36" height="6" rx="2" fill="rgba(255,230,120,.45)" />
      <circle {...S} cx="100" cy="46" r="18" fill="rgba(255,255,255,.08)" />
      <path {...S} strokeWidth="3.2" d="M113 59l16 16" />
      <path {...S} d="M90 46l6 6 11-12" />
    </g>
  ),
  "crewai-content-workflow": (
    <g>
      {[[28, "R"], [80, "W"], [132, "E"]].map(([x, l]) => (
        <g key={l as string}>
          <circle {...S} cx={x as number} cy="38" r="14" />
          <text x={x as number} y="42" fontSize="11" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">{l}</text>
        </g>
      ))}
      <path {...S} d="M43 38h22M95 38h22M60 34l5 4-5 4M112 34l5 4-5 4" />
      <g transform="translate(46 58)">
        <path {...S} d="M0 0h12l5 5v17H0z" />
        <path {...S} d="M3 9h9M3 14h7" />
      </g>
      <path {...S} strokeDasharray="2 4" d="M54 70c14 10 40 10 54 0" />
      <path {...S} d="M128 58l4 4 8-9" />
    </g>
  ),
  "n8n-ugc-generator": (
    <g>
      <rect {...S} x="60" y="4" width="40" height="72" rx="7" />
      <path {...S} d="M74 10h12" />
      <circle {...S} cx="80" cy="40" r="12" />
      <path d="M77 34v12l9-6z" fill={HI} />
      <path {...S} d="M40 22v10M35 27h10M122 14v8M118 18h8M118 58v12M112 64h12" />
      <circle cx="34" cy="58" r="2" fill={HI} />
      <circle cx="134" cy="38" r="2" fill={HI} />
    </g>
  ),
  /* ---------- Generative AI ---------- */
  "rag-chatbot": (
    <g>
      <path {...S} d="M14 14h52v24H32l-10 8v-8h-8z" />
      <path {...S} d="M22 22h34M22 29h22" />
      <path {...S} d="M30 52h48v20H78v8l-10-8H30z" />
      <path {...S} d="M38 60h30M38 66h18" />
      <g transform="translate(110 16)">
        <rect {...S} x="0" y="22" width="34" height="10" rx="2" />
        <rect {...S} x="2" y="11" width="34" height="10" rx="2" />
        <rect {...S} x="4" y="0" width="34" height="10" rx="2" />
      </g>
      <path {...S} strokeDasharray="2 3" d="M66 26c18 0 26 4 42 4M78 62c16 0 22-10 32-20" />
    </g>
  ),
  "ai-resume-assistant": (
    <g>
      <Doc x={40} y={8} w={46} h={62} lines={6} />
      <circle {...S} cx="52" cy="20" r="5" />
      <path {...S} d="M94 70l26-34 7 5-26 34-9 3z" />
      <path {...S} d="M116 41l7 5" />
      <path {...S} d="M100 12h40v16h-26l-8 6v-6h-6z" />
      <path {...S} d="M106 20h26" />
      <path {...S} d="M8 40h26v12H18l-6 5v-5H8z" />
    </g>
  ),
  "document-qa-bot": (
    <g>
      <Doc x={52} y={24} w={56} h={64} lines={5} />
      <circle cx="80" cy="22" r="17" fill="rgba(8,8,15,.55)" stroke="currentColor" strokeWidth="1.6" />
      <path {...S} strokeWidth="2.6" d="M74 17c0-5 12-6 12 1 0 4-6 5-6 9" />
      <circle cx="80" cy="32" r="1.8" fill={HI} />
    </g>
  ),
  "meeting-notes-generator": (
    <g>
      <path
        {...S}
        d="M8 40h6l3-12 4 26 4-34 4 40 4-30 4 18 4-10 3 4h8"
      />
      <path {...S} d="M66 40h14M74 34l6 6-6 6" />
      <rect {...S} x="90" y="12" width="58" height="58" rx="4" />
      {[24, 38, 52].map((y, i) => (
        <g key={y}>
          <circle cx="100" cy={y} r="2.2" fill={HI} />
          <path {...S} d={`M108 ${y}h${i === 1 ? 26 : 32}`} />
        </g>
      ))}
    </g>
  ),
  /* ---------- Automation ---------- */
  "resume-screening-tool": (
    <g>
      <Doc x={46} y={6} w={48} h={64} lines={5} />
      <circle {...S} cx="58" cy="18" r="5" />
      <circle cx="108" cy="28" r="14" fill="rgba(52,211,153,.25)" stroke="currentColor" strokeWidth="1.6" />
      <path {...S} strokeWidth="2.4" d="M101 28l5 5 9-10" />
      <rect {...S} x="46" y="78" width="68" height="8" rx="4" />
      <rect x="46" y="78" width="50" height="8" rx="4" fill={HI} />
    </g>
  ),
  "lead-email-bot": (
    <g>
      <rect {...S} x="12" y="22" width="56" height="38" rx="3" />
      <path {...S} d="M12 24l28 20 28-20" />
      <path {...S} d="M74 41h22M90 35l6 6-6 6" />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${104 + i * 8} ${12 + i * 26})`}>
          <rect {...S} width="38" height="22" rx="3" fill="rgba(8,8,15,.4)" />
          <circle {...S} cx="10" cy="11" r="5" />
          <path {...S} d="M19 8h14M19 14h10" />
        </g>
      ))}
    </g>
  ),
  "invoice-parser": (
    <g>
      <path {...S} d="M12 6h40v70l-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4z" />
      <path {...S} d="M18 16h20M18 28h28M18 36h16M18 44h24" />
      <rect x="16" y="24" width="32" height="8" rx="2" fill="rgba(255,255,255,.18)" />
      <path {...S} d="M60 40h18M72 34l6 6-6 6" />
      <rect {...S} x="86" y="14" width="64" height="56" rx="3" />
      <path {...S} d="M86 28h64M86 42h64M86 56h64M112 14v56" />
    </g>
  ),
  "report-generator": (
    <g>
      <Doc x={44} y={34} w={72} h={56} lines={3} />
      {[[56, 22], [70, 34], [84, 14], [98, 42]].map(([x, h]) => (
        <rect key={x} x={x} y={50 - h} width="10" height={h} rx="1.5" fill={x === 98 ? HI : "rgba(255,255,255,.35)"} stroke="currentColor" strokeWidth="1.2" />
      ))}
      <path {...S} d="M52 26l18-10 14 8 24-18" />
      <path {...S} d="M100 6h8v8" />
    </g>
  ),
  /* ---------- Machine learning ---------- */
  "airbnb-pricing-model": (
    <g>
      <path {...S} d="M30 46l26-24 26 24v32H30z" />
      <path {...S} d="M48 78V60h16v18" />
      <path {...S} d="M96 20h30l16 16-30 30-16-16z" />
      <circle cx="108" cy="32" r="3" fill={HI} />
      <text x="120" y="50" fontSize="12" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">₹</text>
    </g>
  ),
  "customer-churn-predictor": (
    <g>
      {[30, 56, 82].map((x, i) => (
        <g key={x} opacity={i === 2 ? 0.45 : 1}>
          <circle {...S} cx={x} cy="30" r="8" />
          <path {...S} d={`M${x - 13} 62c0-12 26-12 26 0`} />
        </g>
      ))}
      <path {...S} d="M96 44h40M128 36l8 8-8 8" />
      <path {...S} d="M108 16h26v10" />
      <text x="122" y="76" fontSize="11" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">12%</text>
    </g>
  ),
  "loan-approval-predictor": (
    <g>
      <Doc x={34} y={8} w={50} h={68} lines={6} />
      <g transform="rotate(-14 112 52)">
        <rect {...S} x="88" y="38" width="48" height="26" rx="4" />
        <text x="112" y="56" fontSize="10" fontWeight="800" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">APPROVED</text>
      </g>
    </g>
  ),
  "house-price-predictor": (
    <g>
      <path {...S} d="M14 82h132M14 82V10" />
      <path {...S} d="M20 74l22-14 18 6 26-22 20 6 34-34" />
      <path {...S} d="M132 16h8v8" />
      <g transform="translate(26 18)">
        <path {...S} d="M0 16L14 4l14 12v16H0z" />
        <path {...S} d="M10 32v-9h8v9" />
      </g>
    </g>
  ),
  /* ---------- Data analytics ---------- */
  "google-search-quality-analysis": (
    <g>
      <rect {...S} x="20" y="8" width="120" height="16" rx="8" />
      <circle {...S} cx="32" cy="16" r="4" />
      <path {...S} d="M35 19l3 3M46 16h50" />
      {[34, 50, 66].map((y, i) => (
        <g key={y}>
          <text x="22" y={y + 8} fontSize="9" fontWeight="700" fill="currentColor" fontFamily="system-ui,sans-serif">{i + 1}</text>
          <path {...S} d={`M34 ${y + 2}h${70 - i * 14}M34 ${y + 8}h${48 - i * 8}`} />
          <rect x="120" y={y} width={20 - i * 6} height="9" rx="2" fill={HI} opacity={1 - i * 0.25} />
        </g>
      ))}
    </g>
  ),
  "sales-dashboard": (
    <g>
      <rect {...S} x="16" y="6" width="128" height="80" rx="5" />
      <rect {...S} x="24" y="14" width="34" height="18" rx="2" />
      <rect {...S} x="63" y="14" width="34" height="18" rx="2" />
      <rect {...S} x="102" y="14" width="34" height="18" rx="2" />
      <path {...S} d="M24 76l18-14 16 6 20-20 18 10 16-16" />
      <circle {...S} cx="124" cy="62" r="12" />
      <path d="M124 50a12 12 0 0 1 12 12h-12z" fill={HI} />
    </g>
  ),
  "revenue-insights-report": (
    <g>
      <path {...S} d="M14 80h132" />
      <path {...S} d="M18 70c20-4 26-26 46-24s24-22 44-26 22-8 34-12" />
      <path d="M18 70c20-4 26-26 46-24s24-22 44-26 22-8 34-12V80H18z" fill="rgba(255,255,255,.12)" />
      {[64, 108].map((x) => <circle key={x} cx={x} cy={x === 64 ? 46 : 20} r="3" fill={HI} />)}
      <rect {...S} x="22" y="10" width="40" height="18" rx="3" />
      <text x="42" y="23" fontSize="9" fontWeight="700" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">+18%</text>
    </g>
  ),
  "ecommerce-analytics": (
    <g>
      <path {...S} d="M12 16h10l8 36h36l8-26H26" />
      <circle {...S} cx="36" cy="62" r="4" />
      <circle {...S} cx="60" cy="62" r="4" />
      <path {...S} d="M90 14h56l-12 18h-32z" />
      <path {...S} d="M102 32h32l-8 16h-16z" />
      <path {...S} d="M110 48h16l-4 14h-8z" />
      <path {...S} d="M116 62v18" />
    </g>
  ),
  /* ---------- Internship projects ---------- */
  "internship-project-tracker": (
    <g>
      {[14, 62, 110].map((x, c) => (
        <g key={x}>
          <rect {...S} x={x} y="6" width="38" height="80" rx="4" />
          <path {...S} d={`M${x + 6} 16h${c === 2 ? 18 : 26}`} />
          {Array.from({ length: 3 - c }, (_, i) => (
            <rect key={i} x={x + 5} y={24 + i * 18} width="28" height="13" rx="2" fill={c === 2 ? HI : "rgba(255,255,255,.22)"} />
          ))}
        </g>
      ))}
      <path {...S} d="M118 72l4 4 8-9" />
    </g>
  ),
  "internship-analytics-dashboard": (
    <g>
      <path {...S} d="M30 62a50 50 0 0 1 100 0" />
      <path {...S} strokeWidth="5" d="M30 62a50 50 0 0 1 78-41" stroke={HI} />
      <path {...S} d="M80 62l22-28" />
      <circle cx="80" cy="62" r="4" fill={HI} />
      {[[22, 84], [58, 84], [94, 84]].map(([x, y]) => (
        <rect key={x} {...S} x={x} y={y - 10} width="30" height="10" rx="2" />
      ))}
    </g>
  ),
  "internship-task-automation": (
    <g>
      <circle {...S} cx="46" cy="44" r="14" />
      <circle {...S} cx="46" cy="44" r="5" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <path key={i} {...S} d={`M${46 + Math.cos(a) * 14} ${44 + Math.sin(a) * 14}L${46 + Math.cos(a) * 20} ${44 + Math.sin(a) * 20}`} />;
      })}
      <path {...S} d="M74 44h12M80 38l6 6-6 6" />
      <rect {...S} x="94" y="12" width="52" height="64" rx="4" />
      {[26, 42, 58].map((y) => (
        <g key={y}>
          <path {...S} d={`M101 ${y}l3 3 6-7`} />
          <path {...S} d={`M116 ${y}h22`} />
        </g>
      ))}
    </g>
  ),
  "internship-data-cleaning-project": (
    <g>
      {[[16, 20], [34, 12], [24, 40], [48, 30], [14, 62], [40, 56], [56, 70], [30, 78]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={i % 3 ? HI : "none"} stroke="currentColor" strokeWidth="1.4" />
      ))}
      <path {...S} d="M66 44h18M78 38l6 6-6 6" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={96 + (i % 4) * 14} y={20 + Math.floor(i / 4) * 16} width="10" height="10" rx="2" fill={HI} opacity=".85" />
      ))}
    </g>
  ),
};

export const COVER_SLUGS = Object.keys(C);

export default function Cover({
  slug,
  colors,
  image,
  title,
}: {
  slug: string;
  colors: [string, string];
  image?: string;
  title: string;
}) {
  const art = C[slug];
  return (
    <div className="sp-cover" style={{ background: `linear-gradient(140deg, ${colors[0]}, ${colors[1]})` }}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="sp-cover-img" src={image} alt={`${title} screenshot`} loading="lazy" />
      ) : (
        <svg className="sp-cover-art" viewBox="0 0 160 96" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {art ?? (
            <text x="80" y="58" fontSize="36" fontWeight="800" textAnchor="middle" fill="currentColor" fontFamily="system-ui,sans-serif">
              {title.slice(0, 2)}
            </text>
          )}
        </svg>
      )}
      <span className="sp-cover-fade" />
    </div>
  );
}
