import Link from "next/link";
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
  const skills = [
    "Python / Programming / Software Development / Object-Oriented Design",
    "Machine Learning / Deep Learning / NLP / Computer Vision",
    "Data Science / Analytics / Visualization / Dashboards",
    "GenAI / LLMs / Transformers / RAG Systems / Agentic AI",
    "FastAPI / Flask  / Backend Development / API Design ",
    "Pandas / Scikit-learn / Numpy ",
    "TensorFlow / PyTorch / Hugging Face ",
    "SQL / NoSQL / Postgres / MongoDB / Vector DBs / Pinecone",
    "Power BI / Tableau ",
    "Streamlit / Gradio /showflow ",
    "GitHub / Git / Version Control / CI-CD ",
    "Docker / Containerization/ Deployment ",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[160px]" />

      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">
            Chandini<span className="text-purple-500">.</span>
          </h1>

          <nav className="hidden items-center gap-8 text-gray-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <button className="rounded-full bg-purple-600 px-5 py-2 transition hover:bg-purple-700">
            Hire Me
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pb-20 pt-40 text-center">
        <div className="relative z-10 w-full max-w-5xl">
          <p className="mb-4 text-lg tracking-[0.3em] text-purple-400">
            AI ENGINEER • MACHINE LEARNING • PYTHON • DATA SCIENCE • AUTOMATION • RAG SYSTEMS • DATA ANALYTICS
          </p>

          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Chandini
            <span className="text-purple-500"> Pradhan</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-400">
            AI Engineer specializing in Generative AI, Agentic AI Systems,
            Machine Learning, Data Science, and Enterprise AI Applications.
            Passionate about building production-grade RAG systems,
            intelligent automation workflows, and scalable AI products that
            solve real-world business problems.
          </p>

          {/* Social links with emojis */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/mlexpnew"
              target="_blank"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              🐙 GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/chandni-pradhan-67aa91324/"
              target="_blank"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/chandni_56/"
              target="_blank"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              🧩 LeetCode
            </a>
            <a
              href="https://medium.com/@aschandinip"
              target="_blank"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              ✍️ Medium
            </a>
            <a
              href="mailto:mlexpnew@gmail.com"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              📧 Email
            </a>
          </div>

          {/* Stats — inside hero so no empty gap */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h2 className="text-5xl font-bold text-purple-400">20+</h2>
              <p className="mt-3 text-gray-400">Projects Built</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h2 className="text-5xl font-bold text-purple-400">3+</h2>
              <p className="mt-3 text-gray-400">Internships</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h2 className="text-5xl font-bold text-purple-400">5+</h2>
              <p className="mt-3 text-gray-400">AI Systems</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
              <h2 className="text-5xl font-bold text-purple-400">1000+</h2>
              <p className="mt-3 text-gray-400">Learning Hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl">
            <p className="mb-3 tracking-[0.3em] text-purple-400">ABOUT ME</p>
            <h2 className="text-4xl font-bold">Python, ML & AI Portfolio Builder</h2>
            <p className="mt-6 leading-8 text-gray-400">
              I create intelligent systems using Python, Machine Learning, and
              Generative AI. My focus is on building practical products like
              RAG chatbots, analytics dashboards, predictive models, and
              automation tools that solve real business problems.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl">
            <p className="mb-3 tracking-[0.3em] text-purple-400">FOCUS AREAS</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                "Machine Learning",
                "Data Science",
                "Python Development",
                "Generative AI",
                "Analytics Dashboards",
                "Backend APIs",
                "RAG Systems",
                "AI Automation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      <section id="experience" className="py-24">
  <div className="max-w-7xl mx-auto px-6">
    <p className="text-purple-400 uppercase tracking-[0.3em] text-sm">
      Experience
    </p>

    <h2 className="mt-4 text-5xl font-bold text-white">
      Professional Journey
    </h2>

    <p className="mt-4 text-gray-400 max-w-3xl">
      Internship and industry experience across AI Engineering,
      Machine Learning, Data Analytics, and Software Development.
    </p>

    <div className="mt-16 space-y-8">
      {/* AI Research Intern */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              AI Research Intern
            </h3>
            <p className="text-purple-400 mt-1">
              CodingJr
            </p>
          </div>

          <span className="text-gray-400 mt-2 md:mt-0">
            Jun 2025 – Aug 2025
          </span>
        </div>

        <ul className="mt-6 space-y-2 text-gray-300">
          <li>• Built AI-powered educational solutions.</li>
          <li>• Worked on Generative AI and NLP projects.</li>
          <li>• Developed and tested machine learning models.</li>
        </ul>
      </div>

      {/* Data Analyst Intern */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Data Analyst Intern
            </h3>
          </div>

          <span className="text-gray-400 mt-2 md:mt-0">
            Feb 2025 – May 2025
          </span>
        </div>

        <ul className="mt-6 space-y-2 text-gray-300">
          <li>• Cleaned and analyzed large datasets.</li>
          <li>• Created dashboards using Tableau and Excel.</li>
          <li>• Generated business insights and reports.</li>
        </ul>
      </div>

      {/* ML Intern */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Machine Learning Intern
            </h3>
            <p className="text-purple-400 mt-1">
              MyDailyWork
            </p>
          </div>

          <span className="text-gray-400 mt-2 md:mt-0">
            Dec 2024 – Feb 2025
          </span>
        </div>

        <ul className="mt-6 space-y-2 text-gray-300">
          <li>• Developed predictive machine learning models.</li>
          <li>• Performed feature engineering and model evaluation.</li>
          <li>• Worked with Python and Scikit-Learn.</li>
        </ul>
      </div>

      {/* Software Engineer Intern */}
      <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Software Engineer Intern
            </h3>
            <p className="text-purple-400 mt-1">
              Inferigence Quotient LLP
            </p>
          </div>

          <span className="text-gray-400 mt-2 md:mt-0">
            Jul 2024 – Dec 2024
          </span>
        </div>

        <ul className="mt-6 space-y-2 text-gray-300">
          <li>• Developed Python applications.</li>
          <li>• Reduced processing time by 25%.</li>
          <li>• Built dashboards and automated workflows.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-7xl px-6 pb-24">
        <p className="mb-3 tracking-[0.3em] text-purple-400">SKILLS</p>
        <h2 className="text-4xl font-bold">Core Tech Stack</h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 text-center text-gray-300 transition hover:border-purple-500 hover:text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-6 pb-24">
        <p className="mb-3 tracking-[0.3em] text-purple-400">PROJECTS</p>
        <h2 className="text-4xl font-bold">Featured Work</h2>

        <div className="mt-12 space-y-14">
          {projectGroups.map((group) => (
            <div key={group.slug}>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className={`text-2xl font-semibold ${group.color}`}>
                  {group.domain}
                </h3>
                <Link
                  href={`/projects/${group.slug}`}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
                >
                  View All
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {group.projects.map((project) => (
                  <div
                    key={project.title}
                    className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl transition hover:border-purple-500"
                  >
                    <p className="text-sm tracking-[0.2em] text-purple-400">
                      {project.domain}
                    </p>
                    <h4 className="mt-4 text-2xl font-semibold text-white">
                      {project.title}
                    </h4>
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
                        href={`/projects/${group.slug}`}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="mb-3 tracking-[0.3em] text-purple-400">CASE STUDIES</p>
        <h2 className="text-4xl font-bold">Big Tech AI & Data Case Studies</h2>
        <p className="mt-4 max-w-3xl text-gray-400">
          Real-world AI Engineering, Machine Learning, Data Science,
          GenAI, Recommendation Systems, and Enterprise AI solutions.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { company: "Morgan Stanley", title: "Production RAG System" },
            { company: "JPMorgan Chase", title: "Financial AI Assistant" },
            { company: "Salesforce", title: "Multi-Agent AI System" },
            { company: "OpenAI", title: "Enterprise RAG Assistant" },
            { company: "Swiggy", title: "AI Logistics + GenAI Search" },
            { company: "Amazon", title: "Inventory Optimization" },
            { company: "Google", title: "Search Quality Analysis" },
            { company: "Disney+ Hotstar", title: "Recommendation Engine" },
          ].map(({ company, title }) => (
            <div
              key={company}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6"
            >
              <p className="text-purple-400">{company}</p>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/case-studies"
            className="rounded-2xl bg-purple-600 px-8 py-4 font-medium transition hover:bg-purple-700"
          >
            View All Case Studies →
          </Link>
        </div>
      </section>

    




      <section id="certifications" className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">
      <p className="text-purple-400 uppercase tracking-[0.3em] text-sm">
        Certifications & Technical Articles
      </p>

      <h2 className="mt-4 text-5xl font-bold text-white">
        Credentials & Knowledge Contributions
      </h2>

      <p className="mt-6 text-gray-400 max-w-3xl mx-auto">
        Professional certifications, technical case studies,
        research-driven AI projects, and engineering documentation.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 mt-20">

      {/* Certifications */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8">
          🏆 Certifications
        </h3>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h4 className="text-xl font-semibold text-white">
                  {cert.title}
                </h4>

                <p className="mt-2 text-purple-400">
                  {cert.issuer}
                </p>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-5 rounded-xl bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition-all"
                >
                  Verify Certificate →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Articles */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8">
          📚 Technical Articles
        </h3>

        <div className="space-y-6">
          {publications.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 hover:border-purple-500/50 transition-all duration-300"
            >
              <h4 className="text-xl font-semibold text-white">
                {item.title}
              </h4>

              <p className="mt-4 text-gray-400 leading-relaxed">
                {item.description}
              </p>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 text-purple-400 hover:text-purple-300"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>


    

  

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <p className="mb-3 tracking-[0.3em] text-purple-400">CONTACT</p>
        <h2 className="text-4xl font-bold">Let's Build Something Amazing</h2>
        <p className="mt-4 max-w-3xl text-gray-400">
          Open to AI Engineer, Machine Learning Engineer, Data Scientist,
          GenAI Engineer, Analytics Engineer, and Research Engineer opportunities.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <a
            href="mailto:mlexpnew@gmail.com"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500"
          >
            <p className="text-purple-400">EMAIL</p>
            <h3 className="mt-3 text-lg font-semibold break-all">mlexpnew@gmail.com</h3>
          </a>

          <a
            href="tel:+917619254532"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500"
          >
            <p className="text-purple-400">PHONE</p>
            <h3 className="mt-3 text-lg font-semibold">+91 7619254532</h3>
          </a>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
            <p className="text-purple-400">LOCATION</p>
            <h3 className="mt-3 text-lg font-semibold">Bangalore, Karnataka, India</h3>
          </div>

          <a
            href="https://www.linkedin.com/in/chandni-pradhan-67aa91324/"
            target="_blank"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500"
          >
            <p className="text-purple-400">LINKEDIN</p>
            <h3 className="mt-3 text-lg font-semibold">Connect With Me</h3>
          </a>

          <a
            href="https://github.com/mlexpnew"
            target="_blank"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500"
          >
            <p className="text-purple-400">GITHUB</p>
            <h3 className="mt-3 text-lg font-semibold">github.com/mlexpnew</h3>
          </a>

          <a
            href="https://leetcode.com/u/chandni_56/"
            target="_blank"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500"
          >
            <p className="text-purple-400">LEETCODE</p>
            <h3 className="mt-3 text-lg font-semibold">Problem Solving Profile</h3>
          </a>

          <a
            href="https://medium.com/@aschandinip"
            target="_blank"
            className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 transition hover:border-purple-500 md:col-span-2 xl:col-span-3"
          >
            <p className="text-purple-400">MEDIUM BLOG</p>
            <h3 className="mt-3 text-lg font-semibold">
              AI • Machine Learning • Data Science • GenAI Articles
            </h3>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="mailto:mlexpnew@gmail.com"
            className="rounded-2xl bg-purple-600 px-8 py-4 font-medium transition hover:bg-purple-700"
          >
            Hire Me
          </a>
          <a
            href="https://github.com/mlexpnew"
            target="_blank"
            className="rounded-2xl border border-white/10 px-8 py-4 transition hover:border-purple-500"
          >
            View GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chandni-pradhan-67aa91324/"
            target="_blank"
            className="rounded-2xl border border-white/10 px-8 py-4 transition hover:border-purple-500"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500">
        <p>© 2026 Chandini Pradhan</p>
        <p className="mt-2">AI Engineer • Machine Learning Engineer • GenAI Developer</p>
        <p className="mt-2">Python • Machine Learning • Data Science • Generative AI</p>
      </footer>

    </main>
  );
}
