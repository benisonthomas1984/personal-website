'use client'

import { useState } from 'react'
import { journalCategories, journalPosts, type JournalCategory } from '@/lib/content'
import { cn } from '@/lib/utils'
import { PostRow } from './post-row'

export function JournalIndex() {
  const [active, setActive] = useState<JournalCategory | 'All'>('All')
  const posts = active === 'All' ? journalPosts : journalPosts.filter((p) => p.category === active)
  const filters: (JournalCategory | 'All')[] = ['All', ...journalCategories]

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter by topic" className="no-scrollbar flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm transition-colors',
              active === filter
                ? 'border-secondary bg-secondary text-secondary-foreground'
                : 'bg-card hover:border-foreground',
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <ul className="flex flex-col divide-y border-y">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostRow post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
