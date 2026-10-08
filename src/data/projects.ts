export interface ProjectAward {
  title: string;
  event: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url?: string;
  github?: string;
  award?: ProjectAward;
  /** Shown on project cards (original/preview only) */
  cardTech?: string[];
  /** Full list shown in modal when project is clicked */
  tech?: string[];
}

export const projects: Project[] = [
  {
    slug: "silo-labs",
    title: "silo labs",
    description: "multi-agent pipeline that turns hardware requirements into simulated firmware",
    longDescription:
      "silo labs turns natural-language hardware requirements into working firmware. a multi-agent pipeline plans peripherals and pin assignments, generates and builds the firmware, then runs the result in a live hardware simulation.",
    github: "https://github.com/pierceluu10/Silo-Labs",
    cardTech: ["langgraph", "fastapi", "langchain"],
    tech: ["langgraph", "fastapi", "langchain", "wokwi", "docker"],
  },
  {
    slug: "agentigram",
    title: "agentigram",
    description: "peer-to-peer coordination layer for coding agents sharing a codebase",
    longDescription:
      "agentigram is a peer-to-peer coordination layer for coding agents working on the same codebase. it watches what each agent is changing, detects conflicts before they reach git, and lets agents negotiate shared contracts across different developers' laptops. won the best sovereign tool track at hack the north, canada's largest hackathon.",
    github: "https://github.com/pierceluu10/agentigram",
    award: { title: "best sovereign tool", event: "hack the north" },
    cardTech: ["hyperswarm", "mcp", "electron", "pear"],
    tech: ["hyperswarm", "hypercore", "mcp", "qvac", "electron", "pear"],
  },
  {
    slug: "traffer",
    title: "traffer",
    description: "smart city traffic monitoring and mlops pipeline with real-time object detection",
    longDescription:
      "traffer serves a fine-tuned faster r-cnn model through a fastapi rest api for real-time vehicle and pedestrian detection. a stream processor reads video frames, publishes detection events to a redis queue, and an event consumer triggers congestion and anomaly alerts. the mlops layer handles model versioning, batch inference, and performance benchmarks. fully containerized with docker and deployed on kubernetes with ci/cd via github actions.",
    github: "https://github.com/pierceluu10/kubera",
    cardTech: ["python", "pytorch", "kubernetes"],
    tech: ["python", "pytorch", "fastapi", "docker", "kubernetes", "opencv", "redis"],
  },
  {
    slug: "haggle",
    title: "haggle",
    description: "voice-first shopping agent that calls businesses and negotiates for you",
    longDescription:
      "haggle is a voice-first shopping agent that calls businesses and negotiates on your behalf. talk through what you're looking for with a concierge, choose who to contact, and an outbound agent handles the call and brings the result back into the app. placed 2nd overall at the cursor x toronto tech week hackathon.",
    github: "https://github.com/pierceluu10/haggle",
    award: { title: "2nd overall", event: "cursor x toronto tech week" },
    cardTech: ["elevenlabs", "twilio", "typescript"],
    tech: ["elevenlabs", "twilio", "typescript", "react", "tailwindcss"],
  },
  {
    slug: "swagrams",
    title: "swagrams",
    description: "six-letter anagram game with real-time multiplayer lobbies",
    longDescription:
      "swagrams is a fast-paced six-letter anagram game built for solo and real-time multiplayer. players can create or join lobbies, race to find words, and see submissions update live throughout the round.",
    github: "https://github.com/pierceluu10/Swagrams",
    cardTech: ["supabase realtime", "postgresql", "next.js"],
    tech: ["supabase", "postgresql", "supabase realtime", "next.js", "react"],
  },
  {
    slug: "contribeau",
    title: "contribeau",
    description: "visualize your spotify listening history as a github contribution graph",
    longDescription:
      "contribeau maps your spotify listening history onto a github-style contribution heatmap. connect via spotify oauth, and your recently played tracks and listening frequency paint a shareable activity graph. built with next.js app router, supabase for auth and history storage, and motion for animations.",
    url: "https://github.com/pierceluu10/contribeau",
    github: "https://github.com/pierceluu10/contribeau",
    cardTech: ["next.js", "supabase", "spotify api"],
    tech: ["next.js", "react", "supabase", "spotify web api", "tailwindcss", "motion"],
  },
  {
    slug: "teddytalk",
    title: "teddytalk",
    description: "emotion detection pipeline generating poems via gemini and tts",
    longDescription:
      "valentine's day project built at makeuoft, canada's biggest hardware hackathon, where it won best use of elevenlabs and best use of arduino uno q. teddytalk detects emotion on the user's face via webcam and the teddy speaks out a poem in any customized voice.",
    github: "https://github.com/pierceluu10/teddytalk",
    award: { title: "best use of elevenlabs & arduino uno q", event: "makeuoft" },
    cardTech: ["arduino uno q", "elevenlabs", "python"],
    tech: ["arduino uno q", "python", "gemini api", "elevenlabs api", "html"],
  },
  {
    slug: "vertex",
    title: "vertex",
    description: "ai math tutor that brings a parent's face to life with voice and interactive math visualizations",
    longDescription:
      "vertex connects parents and kids through an ai math tutor. parents configure learning preferences and generate access codes; kids study with gpt-4o, latex rendering, and interactive diagrams. a simli avatar tutors in real time through livekit. an attention engine tracks focus via tab visibility, mouse inactivity, and webcam face detection, adjusting content difficulty and notifying parents when focus drops.",
    github: "https://github.com/pierceluu10/vertex",
    cardTech: ["next.js", "openai api", "livekit"],
    tech: ["next.js", "typescript", "tailwindcss", "supabase", "openai api", "simli", "livekit", "resend"],
  },
  {
    slug: "finco",
    title: "finco",
    description:
      "ai-agent-assisted financial flow visuals for spending analysis",
    longDescription:
      "finco uses graph theory inspired nodes to allow the user to visualize where their money comes from, and where it goes. the app is powered by 3 ai agents that monitor your finances and provide any insights needed.",
    url: "https://finco-amber.vercel.app/",
    github: "https://github.com/pierceluu10/finco",
    cardTech: ["next.js", "typescript"],
    tech: ["next.js", "typescript", "tailwindcss", "radixui", "supabase", "postgresql", "auth0", "backboard.io", "vercel"],
  },
  {
    slug: "atryn",
    title: "atryn",
    description: "ai-powered research discovery platform for university students",
    longDescription:
      "atryn helps university of toronto students discover research opportunities through a conversational ai assistant powered by amazon bedrock. students can browse labs, chat with the ai to find professors aligned with their interests, and submit video introductions. built on a serverless aws stack with lambda, dynamodb, and s3.",
    github: "https://github.com/pierceluu10/atryn",
    cardTech: ["aws", "bedrock"],
    tech: ["typescript", "tailwindcss", "amazon bedrock", "aws lambda", "dynamodb", "s3", "aws amplify"],
  },
  {
    slug: "questr",
    title: "questr",
    description: "gamified, gemini-powered task generator with sentiment-analysis",
    longDescription:
      "questr generates personalized daily tasks for users and promotes well-being through user insights and sentiment analysis.",
    github: "https://github.com/pierceluu10/Questr",
    cardTech: ["flask", "javascript"],
    tech: ["flask", "javascript", "python", "html", "css", "bootstrap 5", "render", "sqlalchemy", "sqlite", "gemini api"],
  },
];
