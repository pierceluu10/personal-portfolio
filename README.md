# personal-portfolio

my personal portfolio
it's still a wip
https://pierceluu.vercel.app/

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
