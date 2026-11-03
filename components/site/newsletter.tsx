export function Newsletter() {
  return (
    <section id="newsletter" className="grid-paper border-b">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">The weekly brief</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          One email a week. <span className="highlight">Everything new in AI</span>, explained.
        </h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          New guides, the tools worth your time, and one agent idea you can build this weekend.
          Subscribers get every library download first.
        </p>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" action="#">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-12 flex-1 rounded-md border bg-card px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="h-12 rounded-md bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Subscribe free
          </button>
        </form>
        <p className="font-mono text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
