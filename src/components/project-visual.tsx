import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  Play,
  SquarePlay,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`project-visual visual-${project.visual}${large ? " visual-large" : ""}`}
      aria-label={`${project.title} illustrative interface preview`}
      role="img"
    >
      <span className="visual-caption">ILLUSTRATIVE PREVIEW</span>
      {project.visual === "youtube" && (
        <div className="mock-window video-window">
          <div className="mock-top">
            <div className="mock-brand">
              <SquarePlay size={18} /> youtube-rag
            </div>
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="video-layout">
            <div className="video-scene">
              <div className="scene-grid" />
              <div className="scene-orbit" />
              <span className="scene-title">
                A little curiosity.
                <br />A new perspective.
              </span>
              <span className="play-circle">
                <Play size={17} fill="currentColor" />
              </span>
              <span className="video-duration">Explore a recording</span>
            </div>
            <div className="video-question">
              <span className="mock-eyebrow">
                <Sparkles size={11} /> ASK YOUR VIDEO
              </span>
              <h4>
                Find the answer
                <br />
                in the conversation.
              </h4>
              <div className="mock-input">
                What would you like to know?
                <ArrowUpRight size={12} />
              </div>
              <div className="mock-evidence">
                <span className="evidence-icon">
                  <Play size={10} />
                </span>
                <div>
                  Grounded in the recording<small>Audio · video · evidence clips</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {project.visual === "assistant" && (
        <div className="assistant-art">
          <div className="floating-file file-one">
            <FileText size={17} />
            <span>Documents</span>
            <Check size={12} />
          </div>
          <div className="floating-file file-two">
            <BookOpen size={17} />
            <span>Your knowledge</span>
          </div>
          <div className="assistant-symbol">
            <Sparkles strokeWidth={1.2} size={44} />
          </div>
          <div className="assistant-question">
            <Sparkles size={15} />
            <span>What would you like to discover?</span>
            <span className="send-icon">
              <ArrowUpRight size={16} />
            </span>
          </div>
          <span className="assistant-hint">A conversation with your knowledge.</span>
        </div>
      )}
      {project.visual === "media" && (
        <div className="mock-window media-window">
          <div className="mock-top">
            <div className="mock-brand">
              <SquarePlay size={15} /> media library
            </div>
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="media-content">
            <span className="mock-eyebrow">AUDIO + VIDEO + CONTEXT</span>
            <h4>Every recording has a story.</h4>
            <div className="media-tiles">
              <div className="media-audio">
                <div className="audio-wave">
                  {[10, 22, 16, 34, 25, 41, 29, 18, 33, 23, 12, 26].map((height, i) => (
                    <i key={i} style={{ height }} />
                  ))}
                </div>
                <span>Explore the sound</span>
              </div>
              <div className="media-video">
                <Play size={25} fill="currentColor" />
                <span>Explore the scene</span>
              </div>
            </div>
            <div className="media-question">
              What would you like to know?
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      )}
      {project.visual === "api" && (
        <div className="mock-window api-window">
          <div className="mock-top">
            <div className="mock-brand">
              <FileText size={15} /> stedi<span className="api-brand-note">/ request runner</span>
            </div>
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="api-content">
            <span className="mock-eyebrow">HEALTHCARE API WORKSPACE</span>
            <h4>A little clarity for every request.</h4>
            <div className="api-endpoint">
              <span>POST</span>
              <code>/change/medicalnetwork/claimstatus/v2</code>
            </div>
            <div className="api-workflow">
              <div>
                <span>01</span>Select a request
                <Check size={11} />
              </div>
              <div>
                <span>02</span>Edit the JSON payload
                <FileText size={11} />
              </div>
              <div>
                <span>03</span>Choose the usage indicator
                <Check size={11} />
              </div>
            </div>
            <span className="api-mode">
              Single request<span>Test (T)</span>
            </span>
          </div>
        </div>
      )}
      {project.visual === "events" && (
        <div className="mock-window events-window">
          <div className="mock-top">
            <div className="mock-brand">
              <Sparkles size={15} /> ai events
            </div>
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="events-content">
            <span className="mock-eyebrow">A LITTLE CURIOSITY. A NEW CONNECTION.</span>
            <h4>Find your next conversation.</h4>
            <div className="events-regions">
              <span>Bay Area</span>
              <span>New York</span>
            </div>
            <div className="events-sources">
              <div>
                <span className="source-mark">L</span>
                <span>Lu.ma</span>
                <ArrowUpRight size={12} />
              </div>
              <div>
                <span className="source-mark">C</span>
                <span>Cerebral Valley</span>
                <ArrowUpRight size={12} />
              </div>
              <div>
                <span className="source-mark">M</span>
                <span>Meetup + more</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          </div>
        </div>
      )}
      {project.visual === "podcast" && (
        <div className="mock-window podcast-window">
          <div className="mock-top">
            <div className="mock-brand">
              <Play size={14} /> podcast → linkedin
            </div>
            <span className="mock-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="podcast-content">
            <span className="mock-eyebrow">GOOD IDEAS DESERVE TO BE SHARED</span>
            <h4>From an episode to an idea.</h4>
            <div className="podcast-player">
              <span className="podcast-play">
                <Play size={12} fill="currentColor" />
              </span>
              <div className="podcast-wave">
                {[7, 13, 9, 20, 15, 25, 17, 12, 20, 16, 9, 14, 7, 18, 13, 21, 10, 15].map(
                  (height, i) => (
                    <i key={i} style={{ height }} />
                  ),
                )}
              </div>
            </div>
            <div className="podcast-flow">
              <span>Audio</span>
              <ArrowRight size={10} />
              <span>Transcript</span>
              <ArrowRight size={10} />
              <span>Article</span>
            </div>
            <div className="podcast-article">
              <FileText size={19} />
              <div>
                <span>Your next article starts here.</span>
                <i />
                <i />
              </div>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
