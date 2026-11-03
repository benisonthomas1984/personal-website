import Link from 'next/link'
import { navLinks, profile } from '@/lib/content'
import { InstagramIcon, LinkedInIcon } from './brand-icons'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="flex items-baseline gap-0.5 text-lg font-semibold tracking-tight">
          Ben Thomas
          <span className="font-mono text-xs font-normal text-primary">.life</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <InstagramIcon className="size-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <LinkedInIcon className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
      <nav aria-label="Main mobile" className="no-scrollbar flex gap-6 overflow-x-auto border-t px-5 py-2.5 md:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 text-sm text-muted-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
