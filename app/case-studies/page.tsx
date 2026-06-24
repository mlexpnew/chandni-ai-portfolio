import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 tracking-[0.3em] text-purple-400">
          CASE STUDIES
        </p>

        <h2 className="text-4xl font-bold">
          Big Tech AI & Data Case Studies
        </h2>

        <p className="mt-4 max-w-3xl text-gray-400">
          AI Engineering, Generative AI, Machine Learning, Data Science,
          Recommendation Systems, and Enterprise AI solutions inspired by
          leading global technology companies.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {[
            "Morgan Stanley",
            "JPMorgan Chase",
            "Salesforce",
            "OpenAI",
            "Swiggy",
            "Amazon",
            "Google",
            "Disney+ Hotstar"
          ].map((company) => (
            <div
              key={company}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
            >
              <p className="text-purple-400">{company}</p>
            </div>
          ))}

        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/case-studies"
            className="rounded-2xl bg-purple-600 px-8 py-4 font-medium"
          >
            View All Case Studies →
          </Link>
        </div>
      </section>

    </main>
  );
}