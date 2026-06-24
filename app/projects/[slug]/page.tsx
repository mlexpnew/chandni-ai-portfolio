import Link from "next/link";
import { notFound } from "next/navigation";
import { projectGroups } from "@/data/projects";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectGroups.map((group) => ({
    slug: group.slug,
  }));
}

export default async function ProjectCategoryPage({ params }: Props) {
  const { slug } = await params;
  const group = projectGroups.find((item) => item.slug === slug);

  if (!group) return notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className={`mb-3 tracking-[0.3em] ${group.color}`}>
              PROJECT CATEGORY
            </p>
            <h1 className="text-4xl font-bold md:text-6xl">{group.domain}</h1>
            <p className="mt-4 max-w-2xl text-gray-400">
              Browse all projects in this category. Open any project to see
              detailed explanation, tech stack, live links, dashboard links,
              and project outcome.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
          >
            Back Home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {group.projects.map((project) => (
            <div
              key={project.slug}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl transition hover:border-purple-500"
            >
              <p className="text-sm tracking-[0.2em] text-purple-400">
                {project.domain}
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white">
                {project.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/projects/${group.slug}/${project.slug}`}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}