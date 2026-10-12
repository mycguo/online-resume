export const profile = {
  name: "Charles",
  initials: "cg",
  headline: "Ideas, turned into useful things.",
  introduction:
    "A collection of things I’ve built, problems I’ve explored, and ideas brought to life. Currently exploring the possibilities of AI.",
  about:
    "I’m Charles. I enjoy turning complex ideas into approachable tools. This space is a home for my experiments with AI, useful applications, and the work behind them.",
  // Add your public contact details to enable contact links.
  email: "",
  github: "",
  linkedin: "",
};

export type Category = "AI & ML" | "Data" | "Developer tools" | "Productivity";
export type Project = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  label: string;
  visual: "jobs" | "youtube" | "assistant" | "media" | "photo" | "api" | "events" | "podcast";
  stack: string[];
  url: string;
  // Required for Streamlit apps included in the scheduled browser check.
  appHeading?: string;
  overview: string;
  features: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "joboffermaster",
    title: "JobOfferMaster",
    category: "Productivity",
    summary:
      "A calmer job search. Save roles, prepare applications, and keep interviews and follow-ups together.",
    label: "Every application. One clear next step.",
    visual: "jobs",
    stack: ["Chrome extension", "AI assistance", "Application tracking"],
    url: "https://joboffermaster.com/",
    overview:
      "A job-search workspace designed for people starting their first job search. Save roles, reuse application details through a Chrome extension, and keep interview notes and follow-ups together. A role preparation workflow helps draft a tailored resume, cover letter, and interview practice questions.",
    features: [
      {
        title: "Save and organize roles",
        description:
          "Save LinkedIn jobs with the Chrome extension and keep job descriptions, application details, interviews, and notes in one place.",
      },
      {
        title: "Prepare for the role",
        description:
          "Use a saved job and your resume to draft a tailored resume, cover letter, and interview questions, then review the files in one ZIP package.",
      },
      {
        title: "Apply and follow up",
        description:
          "Reuse profile details on application forms and ask Private AI about saved applications, interview dates, notes, and job descriptions.",
      },
    ],
  },
  {
    slug: "youtube-rag",
    title: "YouTube RAG",
    category: "AI & ML",
    summary:
      "Find the right moment. Ask questions and explore answers grounded in the original recording.",
    label: "Video meets knowledge",
    visual: "youtube",
    stack: ["Streamlit", "Gemini", "RAG"],
    url: "https://youtube-videos-rag.streamlit.app/",
    appHeading: "youtube-rag",
    overview:
      "A video knowledge app with two ways to explore: ask Gemini about a public YouTube video directly, or search an indexed library of recordings. The indexed workflow exposes audio and video search, evidence clips, and citation-oriented answers.",
    features: [
      {
        title: "Ask a video",
        description: "Provide a public YouTube URL and a question in the direct-question mode.",
      },
      {
        title: "Build a library",
        description: "Add YouTube recordings to an indexed library and revisit saved videos.",
      },
      {
        title: "Follow the evidence",
        description: "Search audio and video, choose evidence clips, and ask for cited answers.",
      },
    ],
  },
  {
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    category: "AI & ML",
    summary:
      "A conversational way to explore your documents and ask questions about your knowledge base.",
    label: "Your knowledge, connected",
    visual: "assistant",
    stack: ["Streamlit", "Gemini", "Google Gen AI File API"],
    url: "https://ai-personal-assistant.streamlit.app/",
    appHeading: "AI Knowledge Assistant",
    overview:
      "An AI assistant that presents a simple question interface for a document knowledge base. The public app identifies Streamlit, Gemini, and the Google Gen AI File API as its stack, bringing document-based question answering into an approachable interface.",
    features: [
      {
        title: "Ask naturally",
        description: "Use a plain-language question to explore the document knowledge base.",
      },
      {
        title: "Connect your knowledge",
        description:
          "The app uses the Google Gen AI File API for its document-based retrieval workflow.",
      },
      {
        title: "Keep it approachable",
        description:
          "A focused Streamlit interface puts the question and knowledge base at the center.",
      },
    ],
  },
  {
    slug: "media-rag",
    title: "Media RAG",
    category: "AI & ML",
    summary:
      "Ask your audio and video. Search recordings and explore answers grounded in the original media.",
    label: "Every recording has a story",
    visual: "media",
    stack: ["Streamlit", "TwelveLabs", "RAG"],
    url: "https://media-rag.streamlit.app/",
    appHeading: "Ask your audio and video",
    overview:
      "A media library for exploring audio and video with natural-language questions. Upload recordings, index their sound and visual content, and search across your library with evidence clips and citation-oriented answers.",
    features: [
      {
        title: "Add a recording",
        description:
          "Upload audio or video to index its sound and visual content through TwelveLabs.",
      },
      {
        title: "Find the right moment",
        description:
          "Search all ready recordings or narrow the search to specific recordings and audio or video content.",
      },
      {
        title: "Ask and follow the evidence",
        description:
          "Ask for cited answers, use search-only mode, and adjust evidence clips and minimum similarity.",
      },
    ],
  },
  {
    slug: "ask-my-photo",
    title: "Ask My Photo",
    category: "AI & ML",
    summary:
      "Find a memory. Search your photo library and ask questions with evidence photos behind the answer.",
    label: "A new way to explore your memories",
    visual: "photo",
    stack: ["Streamlit", "Photo search", "AI question answering"],
    url: "https://ask-my-photo.streamlit.app/",
    appHeading: "Ask My Photo",
    overview:
      "A photo-library app for finding images and asking questions about their contents. Add photos to your library, search across all or selected photos, and choose between finding photos or asking for answers with photo evidence. Evidence count and minimum similarity controls help focus the search.",
    features: [
      {
        title: "Build a photo library",
        description:
          "Use the Add photos and Photo library views to collect and revisit your images.",
      },
      {
        title: "Find the photo",
        description:
          "Describe what you want to find, search all or selected photos, and adjust the minimum similarity.",
      },
      {
        title: "Ask and explore the evidence",
        description:
          "Ask a question about your photos, choose the evidence photo count, and use the Ask & cite workflow.",
      },
    ],
  },
  {
    slug: "stedi-api",
    title: "Stedi API Request Runner",
    category: "Developer tools",
    summary:
      "A focused workspace for selecting healthcare API requests, editing JSON payloads, and running API calls.",
    label: "A clearer way to explore APIs",
    visual: "api",
    stack: ["Streamlit", "Stedi Healthcare API", "JSON"],
    url: "https://stedi-api.streamlit.app/",
    appHeading: "Stedi Healthcare API Request Runner",
    overview:
      "A Streamlit request runner for the Stedi Healthcare API. The interface brings request selection, endpoint details, documentation links, editable JSON, and request execution into one workspace, with single-request and all-request modes.",
    features: [
      {
        title: "Choose the request",
        description:
          "Select a request and inspect its method, endpoint, description, and documentation link.",
      },
      {
        title: "Edit the payload",
        description:
          "Customize the JSON request payload and review its validation state before running it.",
      },
      {
        title: "Configure the workflow",
        description:
          "Choose single-request or all-request mode and a usage indicator. The public interface defaults to Test (T).",
      },
    ],
  },
  {
    slug: "ai-events",
    title: "AI Events",
    category: "Productivity",
    summary:
      "Discover and organize AI events across the Bay Area and New York, with multiple sources in one workspace.",
    label: "Find your next conversation",
    visual: "events",
    stack: ["Streamlit", "Event discovery", "Multi-source aggregation"],
    url: "https://ai-events.streamlit.app/",
    appHeading: "AI Events Scraper",
    overview:
      "An AI event discovery workspace with separate Bay Area and New York views. Each region offers Lu.ma, Cerebral Valley, Evion, Meetup, and combined-source views, alongside controls for saving, loading, and organizing events.",
    features: [
      {
        title: "Explore two regions",
        description:
          "Use independent Bay Area and New York workspaces to explore events in each community.",
      },
      {
        title: "Bring sources together",
        description: "Choose Lu.ma, Cerebral Valley, Evion, or Meetup, or use the combined view.",
      },
      {
        title: "Organize and create",
        description:
          "The interface includes event saving, loading, organization, essay generation, and image generation controls.",
      },
    ],
  },
  {
    slug: "podcast-linkedin",
    title: "Podcast to LinkedIn",
    category: "Productivity",
    summary:
      "Turn podcast audio into a transcript and a LinkedIn article, with optional artwork and a connected publishing workflow.",
    label: "From a conversation to a new idea",
    visual: "podcast",
    stack: ["Streamlit", "Audio transcription", "LinkedIn"],
    url: "https://podcast-linkedin.streamlit.app/",
    appHeading: "AI Podcast to LinkedIn Article",
    overview:
      "A podcast-to-article workflow that presents source selection, audio transcription, article generation, optional image generation, and LinkedIn publishing in one interface. Connecting a LinkedIn account enables source setup and publishing controls.",
    features: [
      {
        title: "Choose the source",
        description:
          "Connect LinkedIn, then select a podcast episode or provide an audio or supported episode URL.",
      },
      {
        title: "Turn audio into an article",
        description:
          "Transcribe the episode and use an editable prompt to generate a LinkedIn article, with optional article artwork.",
      },
      {
        title: "Connect the publishing workflow",
        description:
          "The app provides a LinkedIn connection and publication step, plus preparation and combined-workflow controls.",
      },
    ],
  },
];
