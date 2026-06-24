import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-12">
          <p className="text-purple-400 tracking-[0.3em]">
            CASE STUDIES
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Big Tech AI & Data Case Studies
          </h1>

          <p className="mt-4 text-gray-400 max-w-3xl">
            Real-world AI, Data Science, GenAI, and Machine Learning
            system designs inspired by leading technology companies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {caseStudies.map((study) => (
            <div
              key={study.slug}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
            >
              <p className="text-purple-400 text-sm">
                {study.company}
              </p>

              <h2 className="mt-3 text-xl font-semibold">
                {study.title}
              </h2>

              <p className="mt-3 text-gray-400">
                {study.category}
              </p>

              <button className="mt-6 rounded-xl bg-purple-600 px-4 py-2">
                Read Case Study
              </button>
            </div>
          ))}

        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-5 py-3"
          >
            Back Home
          </Link>
        </div>

      </section>
    </main>
  );
}