import StreamPortfolio from "@/components/stream/StreamPortfolio";
import { caseStudies } from "@/data/caseStudies";
import { projectGroups } from "@/data/projects";

const certifications = [
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    image: "/certificates/google-data-analytics.jpg",
    link: "https://your-certificate-link.com",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera",
    image: "/certificates/ml-specialization.jpg",
    link: "https://your-certificate-link.com",
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI",
    image: "/certificates/genai-llm.jpg",
    link: "https://your-certificate-link.com",
  },
];

const publications = [
  {
    title: "NexBank Agentic AI Customer Service System",
    description:
      "Production-grade multi-agent AI banking assistant with guardrails, escalation framework, and continuous learning pipeline.",
    link: "https://github.com/mlexpnew",
  },
  {
    title: "WorkBridge Compliance AI System",
    description:
      "AI-powered compliance monitoring system with transaction scanning and regulatory intelligence.",
    link: "https://github.com/mlexpnew",
  },
  {
    title: "Autonomous Financial Research Agent",
    description:
      "Multi-source financial intelligence platform using SEC filings, sentiment analysis, and vector search.",
    link: "https://github.com/mlexpnew",
  },
];

export default function Home() {
  return (
    <StreamPortfolio
      groups={projectGroups}
      certifications={certifications}
      publications={publications}
      caseStudies={caseStudies}
    />
  );
}
