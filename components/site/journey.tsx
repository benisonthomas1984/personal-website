import { journey } from '@/lib/content'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const WIDTH = 1000
const HEIGHT = 260
const PAD_Y = 30

function point(index: number, level: number) {
  const x = (index / (journey.length - 1)) * WIDTH
  const y = HEIGHT - PAD_Y - (level / 100) * (HEIGHT - PAD_Y * 2)
  return { x, y }
}

export function Journey() {
  const points = journey.map((m, i) => point(i, m.level))
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

  return (
    <section id="journey" className="scroll-mt-20 border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="The journey so far"
            title="You lose things. You gain things. You keep going."
            description="The real shape of building companies. I'm not sharing it to look good, I'm sharing it so you know the dips are normal."
          />
          <ul className="flex gap-5 font-mono text-xs text-muted-foreground" aria-label="Legend">
            <li className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
              Gained
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
              Lost
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2.5 rounded-full border-2 border-foreground bg-background" aria-hidden="true" />
              Turning point
            </li>
          </ul>
        </div>

        <div className="no-scrollbar -mx-5 overflow-x-auto px-5">
          <div className="relative min-w-[760px]">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="none"
              className="h-64 w-full overflow-visible"
              role="img"
              aria-label="A line chart of Ben's journey with rises and falls over time"
            >
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={f}
                  x1="0"
                  x2={WIDTH}
                  y1={HEIGHT * f}
                  y2={HEIGHT * f}
                  className="stroke-border"
                  strokeDasharray="2 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path
                d={path}
                pathLength={1}
                fill="none"
                className="journey-path stroke-foreground"
                strokeWidth="2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {journey.map((moment, i) => {
              const p = points[i]
              const labelAbove = moment.kind !== 'lost'
              return (
                <div
                  key={moment.year}
                  className="absolute"
                  style={{ left: `${(p.x / WIDTH) * 100}%`, top: `${(p.y / HEIGHT) * 100}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background',
                      moment.kind === 'gained' && 'bg-primary',
                      moment.kind === 'lost' && 'bg-accent',
                      moment.kind === 'turn' && 'border-2 border-foreground bg-background',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute flex w-28 flex-col gap-0.5 text-xs',
                      i === 0 ? 'left-0' : i === journey.length - 1 ? 'right-0 items-end text-right' : '-translate-x-1/2 items-center text-center',
                      labelAbove ? 'bottom-4' : 'top-4',
                    )}
                  >
                    <span className="font-mono text-muted-foreground">{moment.year}</span>
                    <span className="font-medium leading-tight">{moment.title}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {journey.slice(-4).map((moment) => (
            <li key={moment.year} className="flex flex-col gap-3 bg-card p-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">{moment.year}</span>
                <span
                  className={cn(
                    'uppercase tracking-wider',
                    moment.kind === 'gained' && 'text-primary',
                    moment.kind === 'lost' && 'text-accent',
                    moment.kind === 'turn' && 'text-foreground',
                  )}
                >
                  {moment.kind === 'turn' ? 'Turning point' : moment.kind}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{moment.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{moment.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
