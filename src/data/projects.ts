export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  github?: string;
  date?: string;
  /** Shown on project cards (original/preview only) */
  cardTech?: string[];
  /** Full list shown in modal when project is clicked */
  tech?: string[];
}

export const projects: Project[] = [
  {
    slug: "kubera",
    title: "kubera",
    description: "smart city traffic monitoring and mlops pipeline with real-time object detection",
    longDescription:
      "kubera serves a fine-tuned faster r-cnn model through a fastapi rest api for real-time vehicle and pedestrian detection. a stream processor reads video frames, publishes detection events to a redis queue, and an event consumer triggers congestion and anomaly alerts. the mlops layer handles model versioning, batch inference, and performance benchmarks. fully containerized with docker and deployed on kubernetes with ci/cd via github actions.",
    url: "https://github.com/pierceluu10/kubera",
    github: "https://github.com/pierceluu10/kubera",
    date: "2026-03-01",
    cardTech: ["python", "pytorch", "kubernetes"],
    tech: ["python", "pytorch", "fastapi", "docker", "kubernetes", "opencv", "redis", "github actions"],
  },
  {
    slug: "contribeau",
    title: "contribeau",
    description: "visualize your spotify listening history as a github contribution graph",
    longDescription:
      "contribeau maps your spotify listening history onto a github-style contribution heatmap. connect via spotify oauth, and your recently played tracks and listening frequency paint a shareable activity graph. built with next.js app router, supabase for auth and history storage, and motion for animations.",
    url: "https://github.com/pierceluu10/contribeau",
    github: "https://github.com/pierceluu10/contribeau",
    date: "2026-03-01",
    cardTech: ["nextjs", "supabase", "spotify api"],
    tech: ["nextjs", "react", "supabase", "spotify web api", "tailwindcss", "motion"],
  },
  {
    slug: "vertex",
    title: "vertex",
    description: "ai math tutoring app with real-time voice, adaptive quizzes, and attention tracking",
    longDescription:
      "vertex connects parents and kids through an ai math tutor. parents configure learning preferences and generate access codes; kids study with gpt-4o, latex rendering, and interactive diagrams. a simli avatar tutors in real time through livekit. an attention engine tracks focus via tab visibility, mouse inactivity, and webcam face detection, adjusting content difficulty and notifying parents when focus drops.",
    url: "https://github.com/pierceluu10/vertex",
    github: "https://github.com/pierceluu10/vertex",
    date: "2026-03-01",
    cardTech: ["nextjs", "openai api", "livekit"],
    tech: ["nextjs", "typescript", "tailwindcss", "supabase", "openai api", "simli", "livekit", "resend", "mediapipe"],
  },
  {
    slug: "atryn",
    title: "atryn",
    description: "ai-powered research discovery platform for university students",
    longDescription:
      "atryn helps university of toronto students discover research opportunities through a conversational ai assistant powered by amazon bedrock. students can browse labs, chat with the ai to find professors aligned with their interests, and submit video introductions. built on a serverless aws stack with lambda, dynamodb, and s3.",
    url: "https://devpost.com/software/atryn",
    github: "https://github.com/pierceluu10/atryn",
    date: "2026-03-01",
    cardTech: ["nextjs", "aws", "bedrock"],
    tech: ["nextjs", "typescript", "tailwindcss", "amazon bedrock", "aws lambda", "dynamodb", "s3", "aws amplify"],
  },
  {
    slug: "questr",
    title: "questr",
    description: "gamified, gemini-powered task generator with sentiment-analysis",
    longDescription:
      "questr generates personalized daily tasks for users and promotes well-being through user insights and sentiment analysis.",
    url: "https://github.com/pierceluu10/Questr",
    github: "https://github.com/pierceluu10/Questr",
    date: "2025-10-01",
    cardTech: ["flask", "javascript"],
    tech: ["flask", "javascript", "python", "html", "css", "bootstrap 5", "render", "sqlalchemy", "sqlite", "gemini api"],
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
    date: "2026-03-01",
    cardTech: ["nextjs", "typescript"],
    tech: ["nextjs", "typescript", "tailwindcss", "radixui", "supabase", "postgresql", "auth0", "backboard.io", "vercel"],
  },
  {
    slug: "teddytalk",
    title: "teddytalk",
    description: "emotion detection pipeline generating poems via gemini and tts",
    longDescription:
      "valentine's day project built at canada's biggest hardware hackathon; won 1st place best use of arduino uno q. teddytalk detects emotion on the user's face via webcam and the teddy speaks out a poem in any customized voice.",
    url: "https://github.com/pierceluu10/teddytalk",
    github: "https://github.com/pierceluu10/teddytalk",
    date: "2026-02-01",
    cardTech: ["arduino uno q", "python"],
    tech: ["arduino uno q", "python", "gemini api", "elevenlabs api", "html"],
  },
];
