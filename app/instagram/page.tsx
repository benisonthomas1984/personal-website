import type { Metadata } from 'next'
import Image from 'next/image'
import { instagramPosts, profile } from '@/lib/content'
import { InstagramGrid } from '@/components/social/instagram-grid'
import { InstagramIcon } from '@/components/site/brand-icons'

export const metadata: Metadata = {
  title: 'Instagram',
  description: 'Every reel and post from Ben Thomas on AI, entrepreneurship and life on the road.',
}

export default function InstagramPage() {
  const reelCount = instagramPosts.filter((p) => p.type === 'reel').length

  return (
    <main>
      <section className="grid-paper border-b">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-5 py-14 md:flex-row md:items-center md:gap-12 md:py-20">
          <Image
            src="/images/ben-thomas.png"
            alt="Ben Thomas"
            width={320}
            height={320}
            priority
            className="size-28 shrink-0 rounded-full border-4 border-card object-cover md:size-40"
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{profile.instagramHandle}</h1>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90"
              >
                <InstagramIcon className="size-4" />
                Follow
              </a>
            </div>
            <p className="flex gap-6 font-mono text-sm">
              <span>
                <strong className="font-semibold">{instagramPosts.length}</strong> posts here
              </span>
              <span>
                <strong className="font-semibold">{reelCount}</strong> reels
              </span>
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{profile.name}</p>
              <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
                {
                  "CEO building AI agents with companies. Lost two businesses, built a few more. Sharing every lesson for free, one reel at a time."
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <InstagramGrid />
      </section>
    </main>
  )
}
