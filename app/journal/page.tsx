import type { Metadata } from 'next'
import { JournalIndex } from '@/components/journal/journal-index'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Daily notes from Ben Thomas on AI, entrepreneurship and geopolitics.',
}

export default function JournalPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-5 py-16 md:py-24">
      <header className="flex flex-col gap-5">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">The journal</p>
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter md:text-7xl">
          Notes from the middle of it.
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {
            "AI I'm testing, lessons from building, and how world events open doors for founders who are paying attention. Written most days, unpolished on purpose."
          }
        </p>
      </header>
      <JournalIndex />
    </main>
  )
}
