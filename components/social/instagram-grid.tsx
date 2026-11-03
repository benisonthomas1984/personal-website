'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clapperboard, Grid3x3, Heart, Layers, Play } from 'lucide-react'
import { instagramPosts, profile, type InstagramPost } from '@/lib/content'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All', icon: Grid3x3 },
  { id: 'reel', label: 'Reels', icon: Clapperboard },
  { id: 'post', label: 'Posts', icon: Layers },
] as const

type FilterId = (typeof filters)[number]['id']

function matches(post: InstagramPost, filter: FilterId) {
  if (filter === 'all') return true
  if (filter === 'reel') return post.type === 'reel'
  return post.type !== 'reel'
}

export function InstagramGrid({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [filter, setFilter] = useState<FilterId>('all')
  const posts = instagramPosts.filter((post) => matches(post, filter)).slice(0, limit)

  return (
    <div className="flex flex-col gap-6">
      {showFilters && (
        <div role="tablist" aria-label="Filter Instagram content" className="flex border-t">
          {filters.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  '-mt-px flex items-center gap-2 border-t-2 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors',
                  active
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <f.icon className="size-4" aria-hidden="true" />
                {f.label}
              </button>
            )
          })}
        </div>
      )}

      <ul className="grid grid-cols-3 gap-1 md:gap-2">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden bg-muted"
            >
              <Image
                src={post.image}
                alt={post.alt}
                width={600}
                height={800}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 text-primary-foreground drop-shadow">
                {post.type === 'reel' && <Clapperboard className="size-4 md:size-5" aria-label="Reel" />}
                {post.type === 'carousel' && <Layers className="size-4 md:size-5" aria-label="Carousel" />}
              </span>
              {post.type === 'reel' && (
                <span className="absolute bottom-2 left-2 flex items-center gap-1 font-mono text-xs font-medium text-primary-foreground drop-shadow">
                  <Play className="size-3 fill-current" aria-hidden="true" />
                  {post.stat}
                </span>
              )}
              <span className="absolute inset-0 flex flex-col justify-end gap-2 bg-secondary/80 p-3 text-secondary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-4">
                <span className="line-clamp-4 text-pretty text-xs leading-relaxed md:text-sm">{post.caption}</span>
                <span className="flex items-center gap-3 font-mono text-xs text-secondary-foreground/70">
                  <span className="flex items-center gap-1">
                    {post.type === 'reel' ? (
                      <Play className="size-3 fill-current" aria-hidden="true" />
                    ) : (
                      <Heart className="size-3 fill-current" aria-hidden="true" />
                    )}
                    {post.stat}
                  </span>
                  <span>{post.date}</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
