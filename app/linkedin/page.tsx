import type { Metadata } from 'next'
import { linkedinPosts, profile } from '@/lib/content'
import { LinkedInPostCard } from '@/components/social/linkedin-post-card'
import { LinkedInIcon } from '@/components/site/brand-icons'

export const metadata: Metadata = {
  title: 'LinkedIn',
  description: 'Every LinkedIn post from Ben Thomas on AI, leadership, entrepreneurship and geopolitics.',
}

export default function LinkedInPage() {
  return (
    <main className="grid-paper">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-5 py-16 md:py-24">
        <header className="flex flex-col gap-5">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="size-2 bg-primary" aria-hidden="true" />
            LinkedIn · {profile.linkedinHandle}
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter md:text-6xl">
            Every post, <span className="highlight">in full.</span>
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            The longer thinking on AI, leadership and the geopolitics of doing business. No scrolling past ads to find it.
          </p>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <LinkedInIcon className="size-4" />
            Connect on LinkedIn
          </a>
        </header>
        <ul className="flex flex-col gap-4">
          {linkedinPosts.map((post) => (
            <li key={post.id}>
              <LinkedInPostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
