import { ArrowRight } from 'lucide-react'
import { learningPaths } from '@/lib/content'
import { SectionHeading } from './section-heading'

export function LearningPaths() {
  return (
    <section id="learn" className="border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:py-28">
        <SectionHeading
          label="Learning paths"
          title="Pick where you are. Follow the path."
          description="Three free tracks that take you from understanding AI to deploying agents inside a real business."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {learningPaths.map((path) => (
            <li
              key={path.title}
              className="group flex flex-col gap-5 rounded-xl border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {path.step}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {path.lessons} lessons
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold tracking-tight">{path.title}</h3>
                <p className="text-sm text-muted-foreground">{path.audience}</p>
              </div>
              <p className="leading-relaxed text-muted-foreground">{path.description}</p>
              <ul className="flex flex-wrap gap-2">
                {path.topics.map((topic) => (
                  <li key={topic} className="rounded-md bg-muted px-2 py-1 text-xs">
                    {topic}
                  </li>
                ))}
              </ul>
              <a
                href="#library"
                className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary"
              >
                Start this path
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
