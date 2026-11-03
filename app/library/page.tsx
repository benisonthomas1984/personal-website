import type { Metadata } from 'next'
import { library } from '@/lib/content'
import { LibraryCard } from '@/components/library/library-card'

export const metadata: Metadata = {
  title: 'Library',
  description: 'Prompt systems, field guides and toolkits Ben Thomas uses, shared openly.',
}

export default function LibraryPage() {
  return (
    <main className="bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16 md:py-24">
        <header className="flex max-w-3xl flex-col gap-5">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">The library</p>
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter md:text-7xl">
            {"What's on my desk."}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {
              "Every piece here came out of real work with real companies. I add to it as I go. Open anything, use what helps, ignore what doesn't."
            }
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {library.map((item) => (
            <li key={item.slug}>
              <LibraryCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
