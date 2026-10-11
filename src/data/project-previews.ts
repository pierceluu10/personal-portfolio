import type { StaticImageData } from "next/image";
import type { Project } from "./projects";
import contribeauBackgroundImage from "@/bgs/contribeau.png";
import vertexBackgroundImage from "@/bgs/vertex.jpg";
import swagramsBackgroundImage from "@/bgs/swagrams.jpg";
import haggleBackgroundImage from "@/bgs/haggle.png";
import siloLabsBackgroundImage from "@/bgs/silo-labs.jpg";
import atrynBackgroundImage from "@/bgs/atryn.jpg";
import fincoBackgroundImage from "@/bgs/finco.jpg";
import agentigramBackgroundImage from "@/bgs/agentigram.jpg";
import questrBackgroundImage from "@/bgs/questr.jpg";

export const projectPreviewImages: Partial<Record<Project["slug"], StaticImageData>> = {
  contribeau: contribeauBackgroundImage,
  vertex: vertexBackgroundImage,
  swagrams: swagramsBackgroundImage,
  haggle: haggleBackgroundImage,
  "silo-labs": siloLabsBackgroundImage,
  atryn: atrynBackgroundImage,
  finco: fincoBackgroundImage,
  agentigram: agentigramBackgroundImage,
  questr: questrBackgroundImage,
};

