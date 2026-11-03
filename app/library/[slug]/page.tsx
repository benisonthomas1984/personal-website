import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, FileDown, PenTool, Play } from 'lucide-react'
import { getLibraryItem, library, type ResourceFormat } from '@/lib/content'
import { ResourcePreview } from '@/components/library/resource-preview'
import { LibraryCard } from '@/components/library/library-card'

const formatActions: Record<ResourceFormat, { label: string; icon: typeof FileDown }[]> = {
  PDF: [{ label: 'Download PDF', icon: FileDown }],
  'Figma + PDF': [
    { label: 'Open in Figma', icon: PenTool },
    { label: 'Download PDF', icon: FileDown },
  ],
  YouTube: [{ label: 'Watch on YouTube', icon: Play }],
  Notion: [{ label: 'Open in Notion', icon: BookOpen }],
}

export function generateStaticParams() {
  return library.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getLibraryItem(slug)
  return item ? { title: item.title, description: item.summary } : {}
}

export default async function LibraryItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getLibraryItem(slug)
  if (!item) notFound()

  const actions = item.formats.flatMap((f) => formatActions[f])
  const related = library.filter((i) => i.slug !== item.slug).slice(0, 3)

  return (
    <main>
      <section className="border-b bg-muted">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:py-20">
          <Link href="/library" className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Library
          </Link>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="flex flex-col gap-5 md:col-span-8">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                {item.kind} · {item.updated}
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {item.title}
              </h1>
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{item.summary}</p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-4">
              {actions.map((action, i) => (
                <a
                  key={action.label}
                  href="#"
                  className={
                    i === 0
                      ? 'flex items-center justify-between rounded-full bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90'
                      : 'flex items-center justify-between rounded-full border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-foreground'
                  }
                >
                  {action.label}
                  <action.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
              <p className="text-center font-mono text-xs text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:py-20">
        <aside className="flex flex-col gap-8 md:col-span-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Why I made this</h2>
            <p className="text-pretty text-lg leading-relaxed">{item.why}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{"What's inside"}</h2>
            <ul className="flex flex-col divide-y border-y">
              {item.inside.map((line) => (
                <li key={line} className="py-3 text-sm">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="flex flex-col gap-6 md:col-span-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">A look inside</h2>
          <ResourcePreview item={item} />
        </div>
      </section>

      <section className="border-t bg-muted">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Also on my desk</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <LibraryCard item={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
