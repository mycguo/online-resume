import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { BackToProjects } from "@/components/back-to-projects";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const siteUrl = getSiteUrl();
  return {
    title: project?.title ?? "Project not found",
    description: project?.summary,
    ...(project ? { openGraph: { title: project.title, description: project.summary } } : {}),
    ...(project && siteUrl
      ? { alternates: { canonical: new URL(`/projects/${project.slug}`, siteUrl).href } }
      : {}),
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main className="detail-page page-container">
      <BackToProjects />
      <div className="detail-header">
        <div>
          <span className="eyebrow">
            {project.category}
            <span> / </span>
            LIVE PROJECT
          </span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        {project.url && (
          <a
            href={project.url}
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open live app
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
      <ProjectVisual project={project} large />
      <div className="detail-body">
        <aside>
          <span className="section-kicker">BUILT WITH</span>
          <div className="detail-stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <span className="section-kicker">PROJECT TYPE</span>
          <p>Personal application</p>
        </aside>
        <div>
          <span className="section-kicker">THE IDEA</span>
          <h2>{project.label}</h2>
          <p className="detail-overview">{project.overview}</p>
          <h3>What you can explore</h3>
          <div className="feature-list">
            {project.features.map((feature) => (
              <div key={feature.title}>
                <span>
                  <Check size={16} />
                </span>
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="detail-note">
            <Sparkles size={15} />
            <span>
              The image above is an illustrative design preview.
              {" Open the live app to see its actual interface."}
            </span>
          </div>
        </div>
      </div>
      <div className="detail-next">
        <BackToProjects className="collection-link">Explore the collection</BackToProjects>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          Open live app
          <ArrowUpRight size={14} />
        </a>
      </div>
    </main>
  );
}
