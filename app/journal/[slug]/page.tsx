import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPost, journalPosts, profile } from '@/lib/content'
import { PostRow } from '@/components/journal/post-row'
import { InstagramIcon, LinkedInIcon } from '@/components/site/brand-icons'

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <main>
      <article className="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-14 md:py-20">
        <Link href="/journal" className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Journal
        </Link>

        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="uppercase tracking-wider text-primary">{post.category}</span>
            <span aria-hidden="true">/</span>
            <time>{post.date}</time>
            <span aria-hidden="true">/</span>
            <span>{post.readTime} read</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="text-pretty text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-3 border-y py-4">
            <Image src="/images/ben-thomas.png" alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{profile.name}</span>
              <span className="text-xs text-muted-foreground">{profile.role}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8 text-lg leading-relaxed">
          {post.body.map((block, i) => (
            <section key={i} className="flex flex-col gap-3">
              {block.heading && <h2 className="text-2xl font-semibold tracking-tight">{block.heading}</h2>}
              <p className="text-pretty">{block.text}</p>
            </section>
          ))}
        </div>

        <aside className="flex flex-col justify-between gap-4 rounded-xl bg-muted p-6 sm:flex-row sm:items-center">
          <p className="text-pretty font-medium">Talk about it with me on</p>
          <div className="flex gap-3">
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <InstagramIcon className="size-4" /> Instagram
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <LinkedInIcon className="size-4" /> LinkedIn
            </a>
          </div>
        </aside>
      </article>

      <section className="border-t">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Keep reading</h2>
          <ul className="flex flex-col divide-y">
            {more.map((p) => (
              <li key={p.slug}>
                <PostRow post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
