import type { StaticImageData } from "next/image";
import type { Project } from "./projects";
import contribeauBackgroundImage from "@/bgs/contribeau.png";
import vertexBackgroundImage from "@/bgs/vertex.jpg";
import haggleBackgroundImage from "@/bgs/haggle.png";
import siloLabsBackgroundImage from "@/bgs/silo-labs.jpg";
import atrynBackgroundImage from "@/bgs/atryn.jpg";
import fincoBackgroundImage from "@/bgs/finco.jpg";
import agentigramBackgroundImage from "@/bgs/agentigram.jpg";
import litmusBackgroundImage from "@/bgs/litmus.jpg";
import reposistoryBackgroundImage from "@/bgs/reposistory.jpg";

export const projectPreviewImages: Partial<Record<Project["slug"], StaticImageData>> = {
  contribeau: contribeauBackgroundImage,
  vertex: vertexBackgroundImage,
  haggle: haggleBackgroundImage,
  "silo-labs": siloLabsBackgroundImage,
  atryn: atrynBackgroundImage,
  finco: fincoBackgroundImage,
  agentigram: agentigramBackgroundImage,
  litmus: litmusBackgroundImage,
  reposistory: reposistoryBackgroundImage,
};

const glow = (at: string, color: string, reach: string) => `radial-gradient(circle at ${at}, ${color} 0%, transparent ${reach})`;

/** Each cover's backdrop: soft colour glows over a dark base, with film grain laid on top by the .grain class. */
export const projectCovers: Record<Project["slug"], string> = {
  "silo-labs": [glow("12% 0%", "#5b2a9e", "48%"), glow("85% 105%", "#e2541f", "55%"), glow("35% 95%", "#9c2418", "45%"), "#0e0a12"].join(", "),
  agentigram: [glow("12% 92%", "#c97a35", "58%"), glow("88% 8%", "#6b6d73", "52%"), "#151517"].join(", "),
  litmus: [glow("75% 12%", "#1f8f7a", "60%"), glow("8% 95%", "#0d5a50", "55%"), "#0e2627"].join(", "),
  reposistory: [glow("62% 38%", "#2f9e4f", "55%"), glow("0% 100%", "#0b3d1d", "60%"), "#0a2412"].join(", "),
  traffer: [glow("0% 0%", "#6c2bd9", "55%"), glow("100% 0%", "#ff7a3d", "50%"), glow("72% 100%", "#2a3bd8", "55%"), glow("15% 100%", "#e0447a", "50%"), "#3a1b8a"].join(", "),
  haggle: [glow("20% 85%", "#6f8f6a", "60%"), glow("90% 10%", "#bfb79a", "45%"), "#1c221b"].join(", "),
  contribeau: [glow("10% 95%", "#1db954", "55%"), glow("95% 5%", "#0f5a2c", "55%"), "#07140c"].join(", "),
  teddytalk: [glow("25% 90%", "#e2557a", "60%"), glow("90% 10%", "#ffb38a", "50%"), "#2a0f17"].join(", "),
  vertex: [glow("15% 10%", "#3b5bff", "58%"), glow("90% 95%", "#7ad0ff", "50%"), "#0b1230"].join(", "),
  finco: [glow("10% 90%", "#14b8a6", "55%"), glow("90% 10%", "#2563eb", "55%"), "#08161c"].join(", "),
  atryn: [glow("80% 15%", "#1e40af", "60%"), glow("10% 100%", "#f59e0b", "45%"), "#0a1024"].join(", "),
};
