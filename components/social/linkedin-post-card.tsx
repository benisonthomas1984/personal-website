import Image from 'next/image'
import { MessageSquare, Repeat2, ThumbsUp } from 'lucide-react'
import { profile, type LinkedInPost } from '@/lib/content'
import { LinkedInIcon } from '@/components/site/brand-icons'

export function LinkedInPostCard({ post, compact = false }: { post: LinkedInPost; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-lg border bg-card p-5 md:p-6">
      <header className="flex items-center gap-3">
        <Image
          src="/images/ben-thomas.png"
          alt=""
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold">{profile.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {profile.role} · {post.date}
          </span>
        </div>
        <LinkedInIcon className="ml-auto size-4 shrink-0 text-primary" />
      </header>

      <p className="w-fit font-mono text-xs uppercase tracking-widest">
        <span className="highlight">{post.topic}</span>
      </p>

      <p className={compact ? 'line-clamp-6 whitespace-pre-line text-pretty leading-relaxed' : 'whitespace-pre-line text-pretty leading-relaxed'}>
        {post.text}
      </p>

      {post.image && !compact && (
        <Image
          src={post.image}
          alt={post.imageAlt ?? ''}
          width={1000}
          height={620}
          className="aspect-[16/10] w-full rounded-md object-cover"
        />
      )}

      <footer className="mt-auto flex items-center gap-5 border-t pt-4 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ThumbsUp className="size-3.5" aria-hidden="true" />
          {post.reactions}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="size-3.5" aria-hidden="true" />
          {post.comments}
        </span>
        <span className="flex items-center gap-1.5">
          <Repeat2 className="size-3.5" aria-hidden="true" />
          {post.reposts}
        </span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-primary hover:underline"
        >
          View<span className="sr-only"> on LinkedIn</span>
        </a>
      </footer>
    </article>
  )
}
