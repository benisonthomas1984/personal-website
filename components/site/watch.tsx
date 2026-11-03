import Image from 'next/image'
import { Play } from 'lucide-react'
import { profile, videos } from '@/lib/content'
import { SectionHeading } from './section-heading'

export function Watch() {
  return (
    <section id="watch" className="border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:py-28">
        <SectionHeading
          label="Watch & learn"
          title="Short lessons, every week"
          description="Bite-size reels on Instagram and deep-dive walkthroughs on YouTube."
        />
        <div className="grid gap-6 md:grid-cols-12">
          <a
            href={profile.instagram}
            className="group relative overflow-hidden rounded-xl border md:col-span-7"
          >
            <Image
              src="/images/ben-workshop.png"
              alt="Ben Thomas teaching an AI agents workshop"
              width={1200}
              height={750}
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-secondary/90 p-5 text-secondary-foreground">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest opacity-70">
                  Featured workshop
                </span>
                <span className="text-lg font-semibold">
                  From idea to agent: a live build session
                </span>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Play className="size-5" aria-hidden="true" />
                <span className="sr-only">Play</span>
              </span>
            </div>
          </a>

          <ul className="flex flex-col divide-y rounded-xl border bg-card md:col-span-5">
            {videos.map((video) => (
              <li key={video.title}>
                <a
                  href={profile.instagram}
                  className="flex items-center gap-4 p-5 transition-colors hover:bg-muted"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                    <Play className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="font-medium leading-snug">{video.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {video.platform} · {video.duration}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
