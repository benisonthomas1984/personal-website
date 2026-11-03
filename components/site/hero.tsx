import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { journalPosts, profile } from '@/lib/content'
import { InstagramIcon } from './brand-icons'

export function Hero() {
  const today = journalPosts[0]

  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-12 md:items-end md:pb-20 md:pt-20">
        <div className="flex flex-col gap-8 md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {profile.role} · Building in public
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter md:text-8xl">
            Not a straight line.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {
              "I'm Ben Thomas. I build AI agents with companies, and I've built, lost and rebuilt businesses along the way. This is where I write down what I'm learning, every day, for any founder walking a similar road."
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
              className="flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <InstagramIcon className="size-4" />
              Follow the journey
            </a>
          </div>
        </div>

        <figure className="flex flex-col gap-3 md:col-span-5">
          <Image
            src="/images/ben-thomas.png"
            alt="Portrait of Ben Thomas"
            width={800}
            height={1000}
            priority
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <figcaption className="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>Benison &ldquo;Ben&rdquo; Thomas</span>
            <span>Founder & CEO</span>
          </figcaption>
        </figure>
      </div>

      <Link
        href={`/journal/${today.slug}`}
        className="group block border-t bg-card transition-colors hover:bg-muted"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 md:flex-row md:items-center md:gap-6">
          <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Today · {today.date}
          </span>
          <span className="text-pretty font-medium">{today.title}</span>
          <ArrowUpRight
            className="ml-auto hidden size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block"
            aria-hidden="true"
          />
        </div>
      </Link>
    </section>
  )
}
