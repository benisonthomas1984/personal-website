import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { JournalPost } from '@/lib/content'

export function PostRow({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group flex flex-col gap-2 py-6">
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="uppercase tracking-wider text-primary">{post.category}</span>
        <span aria-hidden="true">/</span>
        <span>{post.date}</span>
        <span aria-hidden="true">/</span>
        <span>{post.readTime}</span>
      </div>
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-pretty text-xl font-semibold leading-snug tracking-tight group-hover:text-primary">
          {post.title}
        </h3>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
    </Link>
  )
}
