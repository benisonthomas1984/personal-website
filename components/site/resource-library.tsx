'use client'

import { useState } from 'react'
import { BookOpen, Download, FileText, Play, Sparkles, Wrench } from 'lucide-react'
import { resources, resourceTypes, type ResourceType } from '@/lib/content'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const typeIcons: Record<ResourceType, typeof BookOpen> = {
  Guide: BookOpen,
  'Prompt Pack': Sparkles,
  Template: FileText,
  Video: Play,
  Toolkit: Wrench,
}

export function ResourceLibrary() {
  const [active, setActive] = useState<ResourceType | 'All'>('All')
  const filtered = active === 'All' ? resources : resources.filter((r) => r.type === active)
  const filters: (ResourceType | 'All')[] = ['All', ...resourceTypes]

  return (
    <section id="library" className="border-b bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Free library"
            title="The AI resource library"
            description="Guides, prompt packs, templates and toolkits. No paywall, no course upsell. Download and use them."
          />
          <p className="font-mono text-sm text-muted-foreground">
            {resources.length} resources · updated weekly
          </p>
        </div>

        <div role="group" aria-label="Filter resources by type" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                active === filter
                  ? 'border-secondary bg-secondary text-secondary-foreground'
                  : 'bg-card hover:border-foreground',
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((resource) => {
            const Icon = typeIcons[resource.type]
            return (
              <li
                key={resource.title}
                className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                    {resource.type}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {resource.level}
                  </span>
                </div>
                <h3 className="text-pretty text-lg font-semibold leading-snug tracking-tight">
                  {resource.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {resource.description}
                </p>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="font-mono text-xs text-muted-foreground">{resource.meta}</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground"
                  >
                    <Download className="size-3.5" aria-hidden="true" />
                    Free
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
