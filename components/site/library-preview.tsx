import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { library } from '@/lib/content'
import { LibraryCard } from '@/components/library/library-card'
import { SectionHeading } from './section-heading'

export function LibraryPreview() {
  return (
    <section className="border-b bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="From my desk"
            title="Things I've put together. Take what's useful."
            description="The prompts, guides and toolkits I actually use with companies. Shared because they're more useful in your hands than sitting in my drive."
          />
          <Link
            href="/library"
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Open the library
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {library.map((item) => (
            <li key={item.slug}>
              <LibraryCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
