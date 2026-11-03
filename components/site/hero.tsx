import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { credentials } from '@/lib/content'

export function Hero() {
  return (
    <section id="top" className="grid-paper border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:items-center md:py-24">
        <div className="flex flex-col gap-7 md:col-span-7">
          <p className="w-fit rounded-full border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Free AI school by Ben Thomas
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-[1.05]">
            Learn to build <span className="highlight">AI agents</span>. Everything you need, free.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {"I'm Ben — a CEO who helps companies build AI agents. I share the exact guides, prompts, templates and playbooks I use with clients, so you can learn AI without paying for a course."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#learn"
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start learning
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#library"
              className="rounded-md border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Browse the library
            </a>
          </div>
        </div>

        <figure className="relative md:col-span-5">
          <div className="overflow-hidden rounded-xl border bg-card p-2 shadow-sm">
            <Image
              src="/images/ben-thomas.png"
              alt="Portrait of Ben Thomas"
              width={800}
              height={1000}
              priority
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>
          <figcaption className="absolute -bottom-6 left-4 right-4 rounded-lg border bg-card p-4 shadow-sm md:-left-8 md:right-auto">
            <dl className="flex flex-col gap-2">
              {credentials.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
