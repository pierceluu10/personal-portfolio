"use client";

import { useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import contribeauBackgroundImage from "@/bgs/contribeau.png";
import vertexBackgroundImage from "@/bgs/vertex.png";
import { ProjectTechBadge } from "./ProjectTechBadge";
import { ProjectAward } from "./ProjectAward";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  origin: { x: number; y: number; width: number; height: number } | null;
  onClose: () => void;
}

const PROJECT_MODAL_BACKGROUND_IMAGE_BY_SLUG: Partial<Record<Project["slug"], StaticImageData>> = {
  contribeau: contribeauBackgroundImage,
  vertex: vertexBackgroundImage,
};

const HERO_IMAGE_PROJECT_SLUGS = new Set<Project["slug"]>(["contribeau", "vertex"]);
const HERO_IMAGE_CLASS_NAME_BY_SLUG: Partial<Record<Project["slug"], string>> = {
  contribeau: "object-[12%_top] scale-[1.01]",
  vertex: "object-center scale-[1.04]",
};

const MODAL_BACKGROUND_CLASS_NAME =
  "bg-[#f8f0e3] dark:bg-[#28282B]";
const MODAL_BORDER_CLASS_NAME =
  "border-[#d3d3d3] dark:border-[#3A3A3A]";
const HERO_MODAL_SIZE_CLASS_NAME =
  "max-w-2xl p-0";
const DEFAULT_MODAL_SIZE_CLASS_NAME =
  "max-w-2xl p-6 md:p-8";
const HERO_BOTTOM_FADE_CLASS_NAME =
  "[mask-image:linear-gradient(to_bottom,black_35%,rgb(0_0_0/0.8)_55%,rgb(0_0_0/0.45)_72%,rgb(0_0_0/0.15)_87%,transparent)]";
const HERO_IMAGE_TREATMENT_CLASS_NAME =
  "object-cover transition-transform duration-500";
const HERO_SURFACE_TINT_CLASS_NAME =
  "bg-white/4 dark:bg-black/12";
const HERO_CONTENT_EASE = [0.23, 1, 0.32, 1] as const;
const MODAL_CONTENT_PADDING_CLASS_NAME =
  "px-6 pb-6 md:px-8 md:pb-8";
const PROJECT_LINK_CLASS_NAME =
  "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-[#343434] transition-colors hover:bg-[#ebe4dc] hover:text-slate-900 dark:text-gray-mid dark:hover:bg-[#363636] dark:hover:text-slate-100";
const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, 48rem";
const HERO_IMAGE_HEIGHT_CLASS_NAME =
  "h-[150px] sm:h-[180px] lg:h-[210px]";

function ProjectActionLinks({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className={PROJECT_LINK_CLASS_NAME}
        >
          <Github className="h-4 w-4" />
          github
        </a>
      )}
      {project.url && project.url !== project.github && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={PROJECT_LINK_CLASS_NAME}
        >
          <ExternalLink className="h-4 w-4" />
          live
        </a>
      )}
    </div>
  );
}

function ProjectModalBody({
  project,
  description,
}: {
  project: Project;
  description: string;
}) {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-transparent decoration-dotted decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-current"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <ProjectActionLinks project={project} />
      </div>

      {project.award && (
        <div className="mb-4">
          <ProjectAward award={project.award} size="md" />
        </div>
      )}

      <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-gray-mid">
        {description}
      </p>

      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <ProjectTechBadge
              key={technology}
              name={technology}
              className="rounded-lg border-2 border-[#d3d3d3] bg-[#f8f0e3]/80 text-slate-600 transition-colors hover:bg-[#ebe4dc]/90 dark:border-[#3A3A3A] dark:bg-white/5 dark:text-gray-mid dark:hover:bg-[#363636]/80"
            />
          ))}
        </div>
      )}
    </>
  );
}

export function ProjectModal({ project, origin, onClose: onCloseProp }: ProjectModalProps) {
  const onClose = () => {
    delete document.documentElement.dataset.projectModalOpen;
    onCloseProp();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        delete document.documentElement.dataset.projectModalOpen;
        onCloseProp();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      document.documentElement.dataset.projectModalOpen = "true";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.projectModalOpen;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onCloseProp]);

  const description = project.longDescription || project.description;
  const heroImage = PROJECT_MODAL_BACKGROUND_IMAGE_BY_SLUG[project.slug];
  const showsHeroImage = heroImage !== undefined && HERO_IMAGE_PROJECT_SLUGS.has(project.slug);
  const heroImageClassName = HERO_IMAGE_CLASS_NAME_BY_SLUG[project.slug] ?? "object-top";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden
      />
      <motion.div
        className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-[28px] border-2 shadow-2xl ${MODAL_BORDER_CLASS_NAME} ${MODAL_BACKGROUND_CLASS_NAME} ${showsHeroImage ? HERO_MODAL_SIZE_CLASS_NAME : DEFAULT_MODAL_SIZE_CLASS_NAME}`}
        onClick={(e) => e.stopPropagation()}
        initial={
          origin && typeof window !== "undefined"
            ? {
                opacity: 0,
                scale: 0.2,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
              }
            : { opacity: 0, scale: 0.2 }
        }
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={
          origin && typeof window !== "undefined"
            ? {
                opacity: 0,
                scale: 0.2,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
              }
            : { opacity: 0, scale: 0.2 }
        }
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        style={{ transformOrigin: "center center" }}
      >
        {showsHeroImage ? (
          <>
            <div className={`relative overflow-hidden rounded-t-[26px] ${HERO_IMAGE_HEIGHT_CLASS_NAME} ${HERO_BOTTOM_FADE_CLASS_NAME}`}>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0.84, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.82, scale: 1.01 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={heroImage}
                  alt={`${project.title} project preview`}
                  fill
                  priority
                  placeholder="blur"
                  sizes={HERO_IMAGE_SIZES}
                  className={`${HERO_IMAGE_TREATMENT_CLASS_NAME} ${heroImageClassName}`}
                />
              </motion.div>
              <div className={`absolute inset-0 ${HERO_SURFACE_TINT_CLASS_NAME}`} aria-hidden />
            </div>

            <div className={`relative z-10 ${MODAL_CONTENT_PADDING_CLASS_NAME}`}>
              <motion.div
                className="pt-1"
                initial={{ opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.3, delay: 0.08, ease: HERO_CONTENT_EASE }}
              >
                <ProjectModalBody project={project} description={description} />
              </motion.div>
            </div>
          </>
        ) : (
          <ProjectModalBody project={project} description={description} />
        )}
      </motion.div>
    </motion.div>
  );
}
