import { cn } from '@/lib/utils'

export function SectionHeading({
  label,
  title,
  description,
  invert = false,
}: {
  label: string
  title: string
  description?: string
  invert?: boolean
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <p
        className={cn(
          'font-mono text-xs uppercase tracking-widest',
          invert ? 'text-secondary-foreground/60' : 'text-primary',
        )}
      >
        {label}
      </p>
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
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
