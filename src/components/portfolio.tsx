"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Mail,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import { ProjectVisual } from "./project-visual";

const categories = ["All projects", ...new Set(projects.map((project) => project.category))];

export default function Portfolio() {
  const [category, setCategory] = useState("All projects");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setQuery("");
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);
  const filtered = projects.filter(
    (project) =>
      (category === "All projects" || project.category === category) &&
      `${project.title} ${project.summary} ${project.stack.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );

  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="page-container">
        <header className="site-header">
          <Link href="/" className="brand" aria-label={`${profile.name} home`}>
            <span className="brand-mark">
              {profile.initials}
              <span>·</span>
            </span>
            <span className="brand-name">
              {profile.name}
              <span className="brand-divider">/</span>
              <span className="brand-subtitle">builds & experiments</span>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            <a className="active" href="#projects">
              Projects
            </a>
            <a href="#about">About</a>
          </nav>
        </header>
        <main id="main-content">
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" /> A PERSONAL COLLECTION OF WORK
              </div>
              <h1>
                Ideas, turned into
                <br />
                <em>useful things.</em>
              </h1>
              <p>{profile.introduction}</p>
              <a href="#projects" className="hero-link">
                Explore my projects
                <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orbit-center">
                <Code2 size={34} strokeWidth={1.2} />
              </div>
              <span className="art-note art-note-one">curiosity → creation</span>
              <span className="art-note art-note-two">always a work in progress</span>
              <span className="art-plus art-plus-one">+</span>
              <span className="art-plus art-plus-two">+</span>
            </div>
          </section>
          <section id="projects" className="projects-section" aria-labelledby="projects-heading">
            <div className="section-heading">
              <div>
                <span className="section-kicker">THE THINGS I MAKE</span>
                <h2 id="projects-heading">
                  Selected projects
                  <span className="project-count">{String(projects.length).padStart(2, "0")}</span>
                </h2>
              </div>
              <span className="section-aside">A little engineering. A lot of curiosity.</span>
            </div>
            <div className="project-controls">
              {categories.length > 2 ? (
                <div className="filter-tabs" role="group" aria-label="Filter projects">
                  {categories.map((value) => (
                    <button
                      key={value}
                      aria-pressed={category === value}
                      onClick={() => setCategory(value)}
                    >
                      {value}
                      {value === "All projects" && <span>{projects.length}</span>}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="collection-label">
                  {projects[0]?.category} <span>·</span> {projects.length} projects
                </span>
              )}
              <div className={`search-control ${searchOpen ? "search-expanded" : ""}`}>
                {searchOpen ? (
                  <>
                    <Search size={15} />
                    <input
                      ref={searchRef}
                      type="search"
                      aria-label="Search projects"
                      placeholder="Search projects…"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button
                      aria-label="Close search"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                    >
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <button aria-label="Open project search" onClick={() => setSearchOpen(true)}>
                    <Search size={16} />
                    <span>Search</span>
                    <kbd>/</kbd>
                  </button>
                )}
              </div>
            </div>
            <div className="project-grid">
              {filtered.map((project) => (
                <article key={project.slug} className="project-card">
                  <Link
                    className="project-art-link"
                    href={`/projects/${project.slug}`}
                    aria-label={`Explore ${project.title}`}
                  >
                    <ProjectVisual project={project} />
                    <span className="art-open">
                      <ArrowUpRight size={19} />
                    </span>
                  </Link>
                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span className="project-status">
                        <span />
                        Live project
                      </span>
                    </div>
                    <Link href={`/projects/${project.slug}`} className="project-title">
                      <h3>{project.title}</h3>
                      <ArrowUpRight size={20} />
                    </Link>
                    <p>{project.summary}</p>
                    <div className="project-stack">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <Search size={25} />
                <h3>No projects found</h3>
                <p>Try another search or explore all projects.</p>
                <button
                  className="button-primary"
                  onClick={() => {
                    setCategory("All projects");
                    setQuery("");
                  }}
                >
                  Show all projects
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
            <div className="projects-footnote">
              <span>
                <span className="status-dot" /> Built to be explored.
              </span>
              <span>{projects.length} independent projects.</span>
            </div>
          </section>
          <section id="about" className="about-section">
            <div className="about-monogram">
              {profile.initials}
              <span>↗</span>
            </div>
            <div>
              <span className="section-kicker">THE PERSON BEHIND THE PROJECTS</span>
              <h2>
                Curious by default.
                <br />
                <em>A builder at heart.</em>
              </h2>
              <p>{profile.about}</p>
              <div className="about-links">
                {profile.email && (
                  <a href={`mailto:${profile.email}`}>
                    <Mail size={15} />
                    Say hello
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Code2 size={15} />
                    GitHub
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
            <div className="about-side-note">
              <Sparkles size={23} strokeWidth={1} />
              <p>
                Good things start
                <br />
                with a small idea.
              </p>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <span>
            © 2026 {profile.name}
            <span className="footer-dot">·</span>Made with intention.
          </span>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </div>
    </div>
  );
}
