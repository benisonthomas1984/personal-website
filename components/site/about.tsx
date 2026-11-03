import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '@/lib/content'

const services = [
  'AI agent strategy & use-case discovery',
  'Custom agent design and build',
  'Team training & AI adoption programs',
  'Keynotes and workshops',
]

export function About() {
  return (
    <section id="about" className="border-b bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">About Ben</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            CEO by day. AI teacher always.
          </h2>
          <div className="flex flex-col gap-4 text-lg leading-relaxed opacity-80">
            <p>
              {
                "I'm Benison Thomas — most people call me Ben. As a CEO and AI entrepreneur, I help companies design and deploy AI agents that take real work off their teams' plates."
              }
            </p>
            <p>
              {
                "Along the way I realised the best AI knowledge is locked behind expensive courses. So I share everything I learn here, for free — the frameworks, the prompts, the mistakes and what actually works."
              }
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-xl border border-secondary-foreground/15 p-6 md:col-span-5">
          <h3 className="text-lg font-semibold">For companies: work with me</h3>
          <ul className="flex flex-col gap-3">
            {services.map((service) => (
              <li key={service} className="flex items-start gap-3 leading-relaxed opacity-85">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {service}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="mt-auto flex items-center justify-between gap-3 rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" />
              {profile.email}
            </span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
