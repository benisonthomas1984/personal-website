import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { journalPosts } from '@/lib/content'
import { SectionHeading } from './section-heading'
import { PostRow } from '@/components/journal/post-row'

export function JournalPreview() {
  const [featured, ...rest] = journalPosts

  return (
    <section className="border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="The journal"
            title="Written most days."
            description="What I discover about AI, about building companies, and about the geopolitics that quietly shapes both. Including how to use certain moments to your advantage."
          />
          <Link
            href="/journal"
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            All entries
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <Link
            href={`/journal/${featured.slug}`}
            className="group flex flex-col justify-between gap-10 rounded-2xl bg-secondary p-8 text-secondary-foreground md:p-10 lg:col-span-5"
          >
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-secondary-foreground/60">
              <span>{featured.category}</span>
              <span>{featured.date}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight">
                {featured.title}
              </h3>
              <p className="leading-relaxed text-secondary-foreground/70">{featured.excerpt}</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-medium">
              Read · {featured.readTime}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <ul className="flex flex-col divide-y border-y lg:col-span-7">
            {rest.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
