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
  visual: "youtube" | "assistant" | "media" | "api" | "events" | "podcast";
  stack: string[];
  url: string;
  overview: string;
  features: { title: string; description: string }[];
};

export const projects: Project[] = [
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
    slug: "stedi-api",
    title: "Stedi API Request Runner",
    category: "Developer tools",
    summary:
      "A focused workspace for selecting healthcare API requests, editing JSON payloads, and running API calls.",
    label: "A clearer way to explore APIs",
    visual: "api",
    stack: ["Streamlit", "Stedi Healthcare API", "JSON"],
    url: "https://stedi-api.streamlit.app/",
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
