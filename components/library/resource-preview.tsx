import Image from 'next/image'
import { Play } from 'lucide-react'
import type { LibraryItem } from '@/lib/content'
import { CopyButton } from './copy-button'

export function ResourcePreview({ item }: { item: LibraryItem }) {
  const { preview } = item

  if (preview.type === 'prompts') {
    return (
      <div className="flex flex-col gap-10">
        {preview.groups.map((group) => (
          <section key={group.name} className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{group.name}</h3>
            <ul className="flex flex-col gap-3">
              {group.prompts.map((prompt) => (
                <li key={prompt} className="flex items-start justify-between gap-4 rounded-xl border bg-card p-5">
                  <p className="text-pretty font-mono text-sm leading-relaxed">{prompt}</p>
                  <CopyButton text={prompt} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="font-mono text-xs text-muted-foreground">
          Showing a sample. The full set lives in the PDF and Notion versions.
        </p>
      </div>
    )
  }

  if (preview.type === 'tools') {
    return (
      <div className="flex flex-col gap-10">
        {preview.groups.map((group) => (
          <section key={group.name} className="flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{group.name}</h3>
            <ul className="flex flex-col divide-y rounded-xl border bg-card">
              {group.tools.map((tool) => (
                <li key={tool.name} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-semibold">{tool.name}</span>
                  <span className="text-sm text-muted-foreground">{tool.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )
  }

  if (preview.type === 'video') {
    return (
      <div className="flex flex-col gap-6">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/images/ben-workshop.png"
            alt="Video thumbnail for the session"
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
            <span className="flex size-16 items-center justify-center rounded-full bg-background text-foreground">
              <Play className="size-6 fill-current" aria-hidden="true" />
              <span className="sr-only">Play on YouTube</span>
            </span>
          </div>
        </div>
        <ol className="flex flex-col divide-y rounded-xl border bg-card">
          {preview.chapters.map((chapter) => (
            <li key={chapter.time} className="flex items-baseline gap-5 p-4">
              <span className="font-mono text-xs text-primary">{chapter.time}</span>
              <span>{chapter.title}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
      {preview.chapters.map((chapter, i) => (
        <li key={chapter.title} className="flex flex-col gap-2 bg-card p-6">
          <span className="font-mono text-xs text-muted-foreground">
            {item.kind === 'Canvas' ? 'Block' : 'Chapter'} {i + 1}
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{chapter.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{chapter.detail}</p>
        </li>
      ))}
    </ol>
  )
}
