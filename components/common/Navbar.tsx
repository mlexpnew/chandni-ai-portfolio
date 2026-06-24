const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight text-white">
          Chandni<span className="text-purple-500">.</span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-gray-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-purple-500 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20"
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}