import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { profile } from '@/lib/content'
import { InstagramGrid } from '@/components/social/instagram-grid'
import { InstagramIcon } from './brand-icons'
import { SectionHeading } from './section-heading'

export function InstagramSection() {
  return (
    <section id="instagram" className="scroll-mt-20 border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Instagram"
            title="Every reel, free to watch."
            mark="free"
            description="Quick lessons on AI, founder stories and what I'm seeing on the road. Not ads. The whole feed, right here."
          />
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <InstagramIcon className="size-4" />
              Follow {profile.instagramHandle}
            </a>
            <Link href="/instagram" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              See the full feed
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <InstagramGrid limit={6} />
      </div>
    </section>
  )
}
