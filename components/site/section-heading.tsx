export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
