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
    title: "Silo Labs",
    description: "Multi-agent pipeline that turns hardware requirements into simulated firmware",
    longDescription:
      "silo labs turns natural-language hardware requirements into working firmware. a multi-agent pipeline plans peripherals and pin assignments, generates and builds the firmware, then runs the result in a live hardware simulation.",
    github: "https://github.com/pierceluu10/Silo-Labs",
    cardTech: ["LangGraph", "FastAPI", "LangChain"],
    tech: ["langgraph", "fastapi", "langchain", "wokwi", "docker"],
  },
  {
    slug: "agentigram",
    title: "Agentigram",
    description: "Peer-to-peer coordination layer for coding agents sharing a codebase",
    longDescription:
      "agentigram is a peer-to-peer coordination layer for coding agents working on the same codebase. it watches what each agent is changing, detects conflicts before they reach git, and lets agents negotiate shared contracts across different developers' laptops. won the best sovereign tool track at hack the north, canada's largest hackathon.",
    github: "https://github.com/pierceluu10/agentigram",
    award: { title: "Best Sovereign Tool", event: "Hack the North" },
    cardTech: ["Hyperswarm", "Electron", "Pear"],
    tech: ["hyperswarm", "hypercore", "qvac", "electron", "pear"],
  },
  {
    slug: "litmus",
    title: "Litmus",
    description: "Parallel research agents that test the paper claims you doubt",
    longDescription:
      "litmus turns the claims you highlighted in research papers into real experiments. a langgraph orchestrator drafts each experiment and dispatches up to 4 parallel research agents, which train on cifar-10 using modal a100s and grade results with paired t-intervals across 5 seeds. openai structured outputs ground every answer in your notes, and citations to sources the model never saw are stripped. won hack the valley.",
    github: "https://github.com/pierceluu10/Litmus",
    award: { title: "Winner", event: "Hack the Valley" },
    cardTech: ["LangGraph", "FastAPI", "Modal"],
    tech: ["python", "langgraph", "fastapi", "openai api", "modal", "pytorch", "react", "three.js"],
  },
  {
    slug: "reposistory",
    title: "ReposiStory",
    description: "Offline codebase explorer that turns your repository into a pixel-art village",
    longDescription:
      "reposiStory is a native, offline codebase explorer. open a local repository and its folders become a pixel-art village you can walk around. click a building to see its source, dependencies, reverse references and symbols, take a guided tour from the entry point, or trace the shortest dependency path between two files. tree-sitter parses javascript, typescript and c/c++ to find real imports and includes.",
    github: "https://github.com/pierceluu10/reposiStory",
    cardTech: ["C++", "OpenGL", "Tree-sitter"],
    tech: ["c++", "cmake", "opengl", "tree-sitter"],
  },
  {
    slug: "traffer",
    title: "Traffer",
    description: "Smart city traffic monitoring and MLOps pipeline with real-time object detection",
    longDescription:
      "traffer serves a fine-tuned faster r-cnn model through a fastapi rest api for real-time vehicle and pedestrian detection. a stream processor reads video frames, publishes detection events to a redis queue, and an event consumer triggers congestion and anomaly alerts. the mlops layer handles model versioning, batch inference, and performance benchmarks. fully containerized with docker and deployed on kubernetes with ci/cd via github actions.",
    github: "https://github.com/pierceluu10/kubera",
    cardTech: ["Docker", "Kubernetes", "PyTorch"],
    tech: ["python", "pytorch", "fastapi", "docker", "kubernetes", "opencv", "redis"],
  },
  {
    slug: "haggle",
    title: "Haggle",
    description: "Voice-first shopping agent that calls businesses and negotiates for you",
    longDescription:
      "haggle is a voice-first shopping agent that calls businesses and negotiates on your behalf. talk through what you're looking for with a concierge, choose who to contact, and an outbound agent handles the call and brings the result back into the app. placed 2nd overall at the cursor x toronto tech week hackathon.",
    github: "https://github.com/pierceluu10/haggle",
    award: { title: "2nd Overall", event: "Cursor x Toronto Tech Week" },
    cardTech: ["ElevenLabs", "Twilio", "TypeScript"],
    tech: ["elevenlabs", "twilio", "typescript", "react", "tailwindcss"],
  },
  {
    slug: "contribeau",
    title: "Contribeau",
    description: "Visualize your Spotify listening history as a GitHub contribution graph",
    longDescription:
      "contribeau maps your spotify listening history onto a github-style contribution heatmap. connect via spotify oauth, and your recently played tracks and listening frequency paint a shareable activity graph. built with next.js app router, supabase for auth and history storage, and motion for animations.",
    url: "https://github.com/pierceluu10/contribeau",
    github: "https://github.com/pierceluu10/contribeau",
    cardTech: ["Next.js", "Supabase", "Spotify API"],
    tech: ["next.js", "react", "supabase", "spotify web api", "tailwindcss", "motion"],
  },
  {
    slug: "teddytalk",
    title: "TeddyTalk",
    description: "Emotion detection pipeline generating poems via Gemini and TTS",
    longDescription:
      "valentine's day project built at makeuoft, canada's biggest hardware hackathon, where it won best use of elevenlabs and best use of arduino uno q. teddytalk detects emotion on the user's face via webcam and the teddy speaks out a poem in any customized voice.",
    github: "https://github.com/pierceluu10/teddytalk",
    award: { title: "Best Use of ElevenLabs & Arduino UNO Q", event: "MakeUofT" },
    cardTech: ["Arduino UNO Q", "ElevenLabs", "Python"],
    tech: ["arduino uno q", "python", "gemini api", "elevenlabs api", "html"],
  },
  {
    slug: "vertex",
    title: "Vertex",
    description: "AI math tutor that brings a parent's face to life with voice and interactive math visualizations",
    longDescription:
      "vertex connects parents and kids through an ai math tutor. parents configure learning preferences and generate access codes; kids study with gpt-4o, latex rendering, and interactive diagrams. a simli avatar tutors in real time through livekit. an attention engine tracks focus via tab visibility, mouse inactivity, and webcam face detection, adjusting content difficulty and notifying parents when focus drops.",
    github: "https://github.com/pierceluu10/vertex",
    cardTech: ["Next.js", "OpenAI API", "LiveKit"],
    tech: ["next.js", "typescript", "tailwindcss", "supabase", "openai api", "simli", "livekit", "resend"],
  },
  {
    slug: "finco",
    title: "Finco",
    description:
      "AI-agent-assisted financial flow visuals for spending analysis",
    longDescription:
      "finco uses graph theory inspired nodes to allow the user to visualize where their money comes from, and where it goes. the app is powered by 3 ai agents that monitor your finances and provide any insights needed.",
    url: "https://finco-amber.vercel.app/",
    github: "https://github.com/pierceluu10/finco",
    cardTech: ["Next.js", "TypeScript"],
    tech: ["next.js", "typescript", "tailwindcss", "radixui", "supabase", "postgresql", "auth0", "backboard.io", "vercel"],
  },
  {
    slug: "atryn",
    title: "Atryn",
    description: "AI-powered research discovery platform for university students",
    longDescription:
      "atryn helps university of toronto students discover research opportunities through a conversational ai assistant powered by amazon bedrock. students can browse labs, chat with the ai to find professors aligned with their interests, and submit video introductions. built on a serverless aws stack with lambda, dynamodb, and s3.",
    github: "https://github.com/pierceluu10/atryn",
    cardTech: ["AWS", "Bedrock"],
    tech: ["typescript", "tailwindcss", "amazon bedrock", "aws lambda", "dynamodb", "s3", "aws amplify"],
  },
];
