import { cn } from '@/lib/utils'

export function SectionHeading({
  label,
  title,
  mark,
  description,
  invert = false,
}: {
  label: string
  title: string
  /** word in the title to mark with the highlighter */
  mark?: string
  description?: string
  invert?: boolean
}) {
  const parts = mark ? title.split(mark) : [title]

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <p
        className={cn(
          'flex items-center gap-2 font-mono text-xs uppercase tracking-widest',
          invert ? 'text-secondary-foreground/60' : 'text-primary',
        )}
      >
        <span className={cn('size-2', invert ? 'bg-accent' : 'bg-primary')} aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {mark && parts.length === 2 ? (
          <>
            {parts[0]}
            <span className={invert ? 'text-accent' : 'highlight'}>{mark}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            'text-pretty text-lg leading-relaxed',
            invert ? 'text-secondary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
