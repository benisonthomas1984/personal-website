import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LibraryItem } from '@/lib/content'

export function LibraryCard({ item }: { item: LibraryItem }) {
  return (
    <Link
      href={`/library/${item.slug}`}
      className="group flex h-full flex-col gap-5 rounded-xl border bg-card p-6 transition-colors hover:border-foreground"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">{item.kind}</span>
        <ArrowUpRight
          className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-pretty text-xl font-semibold leading-snug tracking-tight">{item.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <span className="font-mono text-xs text-muted-foreground">{item.meta}</span>
        <ul className="flex flex-wrap gap-1.5" aria-label="Formats">
          {item.formats.map((format) => (
            <li key={format} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px]">
              {format}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
