# personal-portfolio

A dark-themed personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx          # Root layout, Header
  page.tsx            # Home (horizontal scroll)
  globals.css
  projects/
    page.tsx          # All projects
  resume/
    page.tsx          # Resume placeholder

src/
  components/
    Header.tsx
    IntroSection.tsx
    AboutSection.tsx
    CurrentWorkSection.tsx
    FeaturedProjectsSection.tsx
    ProjectCard.tsx
    ProjectScroller.tsx   # Horizontal scroller (slows when holding)
    PageContainer.tsx
    Section.tsx
    ui/
      button.tsx
      card.tsx
  data/
    projects.ts       # Placeholder projects array
```

## Customization

Search for these placeholders and replace with your content:

- `Your Name Here` – name, site title
- `https://github.com/yourusername` – GitHub URL
- `https://linkedin.com/in/yourusername` – LinkedIn URL
- `src/data/projects.ts` – project titles, descriptions, URLs, tech
- Intro/About/CurrentWork sections – placeholder text

## Resume

Add `resume.pdf` to `public/` and link to `/resume.pdf`, or edit `app/resume/page.tsx` to embed it.
