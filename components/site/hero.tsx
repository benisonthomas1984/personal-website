import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { journalPosts, profile } from '@/lib/content'
import { InstagramIcon, LinkedInIcon } from './brand-icons'

const channels = [
  { label: 'Journal', note: 'Written most days', href: '/journal' },
  { label: 'Instagram', note: 'Reels & posts', href: '/instagram' },
  { label: 'LinkedIn', note: 'Long-form posts', href: '/linkedin' },
  { label: 'Library', note: 'Prompts, guides, tools', href: '/library' },
]

export function Hero() {
  const today = journalPosts[0]

  return (
    <section className="grid-paper border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-12 md:items-center md:pb-20 md:pt-20">
        <div className="flex flex-col gap-8 md:col-span-7">
          <p className="flex w-fit items-center gap-2 border bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="size-2 bg-primary" aria-hidden="true" />
            {profile.role}
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter md:text-7xl lg:text-8xl">
            Learning AI <span className="highlight">out loud</span>, so you don&apos;t have to alone.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {
              "I'm Ben Thomas. I build AI agents with companies and I've built, lost and rebuilt businesses along the way. Everything I learn goes here, free: the journal, every reel, every post, every prompt."
            }
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/journal/${today.slug}`}
              className="flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90"
            >
              {"Read today's entry"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <figure className="relative md:col-span-5">
          <div className="rotate-1 border bg-card p-3 shadow-sm">
            <Image
              src="/images/ben-thomas.png"
              alt="Portrait of Ben Thomas"
              width={800}
              height={1000}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-xs text-muted-foreground">
              <span>Benison &ldquo;Ben&rdquo; Thomas</span>
              <span>Founder &amp; CEO</span>
            </figcaption>
          </div>
        </figure>
      </div>

      <nav aria-label="Free content" className="border-t bg-card">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {channels.map((c, i) => (
            <li key={c.href} className={i > 0 ? 'border-l' : ''}>
              <Link
                href={c.href}
                className="group flex items-center justify-between gap-3 px-5 py-5 transition-colors hover:bg-muted"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold tracking-tight">{c.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{c.note}</span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
