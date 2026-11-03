import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { linkedinPosts, profile } from '@/lib/content'
import { LinkedInPostCard } from '@/components/social/linkedin-post-card'
import { LinkedInIcon } from './brand-icons'
import { SectionHeading } from './section-heading'

export function LinkedInSection() {
  return (
    <section id="linkedin" className="grid-paper scroll-mt-20 border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="LinkedIn"
            title="The longer thinking."
            mark="longer"
            description="Posts on AI, leadership and the geopolitics of doing business. Read them in full here, join the conversation there."
          />
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LinkedInIcon className="size-4" />
              Connect on LinkedIn
            </a>
            <Link href="/linkedin" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Read every post
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {linkedinPosts.slice(0, 3).map((post) => (
            <li key={post.id}>
              <LinkedInPostCard post={post} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
