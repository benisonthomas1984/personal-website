import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/content'

const ways = [
  {
    title: 'Share your idea',
    text: "Early, half-formed, or already running. I read every note and reply when I can add something.",
  },
  {
    title: 'Think it through together',
    text: 'Sometimes a founder just needs someone who has been through the dip to say what they see.',
  },
  {
    title: 'Get connected',
    text: "If I know someone who can help you more than I can, I'll make the introduction.",
  },
]

export function Founders() {
  return (
    <section id="founders" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
        <div className="flex flex-col gap-8 md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Founder to founder</p>
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Building something? I&apos;d like to hear about it.
          </h2>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {
              "No program, no pitch. I spend part of every week talking with new founders, because someone did that for me when I needed it most."
            }
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group flex w-fit items-center gap-3 border-b-2 border-foreground pb-1 text-2xl font-semibold tracking-tight transition-colors hover:border-primary hover:text-primary md:text-4xl"
          >
            {profile.email}
            <ArrowUpRight
              className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="flex flex-col gap-6 md:col-span-5">
          <Image
            src="/images/ben-workshop.png"
            alt="Ben Thomas in conversation with founders"
            width={800}
            height={600}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <ul className="flex flex-col divide-y border-y">
            {ways.map((way) => (
              <li key={way.title} className="flex flex-col gap-1 py-4">
                <h3 className="font-semibold tracking-tight">{way.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{way.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
