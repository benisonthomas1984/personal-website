import Image from 'next/image'
import { Play } from 'lucide-react'
import { linkedinPosts, profile, reels } from '@/lib/content'
import { InstagramIcon, LinkedInIcon } from './brand-icons'
import { SectionHeading } from './section-heading'

export function SocialFeed() {
  return (
    <section id="feed" className="scroll-mt-20 bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-5 py-20 md:py-28">
        <SectionHeading
          invert
          label="Live from the feed"
          title="Where the conversation happens."
          description="Short reels on Instagram, longer thoughts on LinkedIn. Pulled in here as I post them."
        />

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <InstagramIcon className="size-4" />
              {profile.instagramHandle}
            </a>
            <span className="font-mono text-xs text-secondary-foreground/60">Latest reels</span>
          </div>
          <ul className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {reels.map((reel) => (
              <li key={reel.title} className="w-56 shrink-0 snap-start md:w-auto">
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-xl"
                >
                  <Image
                    src={reel.image}
                    alt=""
                    width={540}
                    height={960}
                    className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-secondary via-secondary/10 to-transparent p-4">
                    <span className="flex size-9 items-center justify-center self-end rounded-full bg-secondary-foreground/20 backdrop-blur">
                      <Play className="size-4 fill-current" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-pretty font-medium leading-snug">{reel.title}</span>
                      <span className="font-mono text-xs text-secondary-foreground/70">
                        {reel.views} views
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <LinkedInIcon className="size-4" />
              {profile.linkedinHandle}
            </a>
            <span className="font-mono text-xs text-secondary-foreground/60">Recent posts</span>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {linkedinPosts.map((post) => (
              <li key={post.text}>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col gap-6 rounded-xl border border-secondary-foreground/15 p-6 transition-colors hover:border-secondary-foreground/40"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/ben-thomas.png"
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{profile.name}</span>
                      <span className="text-xs text-secondary-foreground/60">
                        {profile.role} · {post.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-pretty leading-relaxed">{post.text}</p>
                  <div className="mt-auto flex gap-4 font-mono text-xs text-secondary-foreground/60">
                    <span>{post.reactions} reactions</span>
                    <span>{post.comments} comments</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
