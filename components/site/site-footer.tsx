import Link from 'next/link'
import { navLinks, profile } from '@/lib/content'
import { InstagramIcon, LinkedInIcon } from './brand-icons'

export function SiteFooter() {
  return (
    <footer className="grid-paper-ink bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-14">
        <p className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Still learning <span className="text-accent">out loud.</span>
          <span className="text-secondary-foreground/50"> See you tomorrow.</span>
        </p>
        <div className="flex flex-col justify-between gap-8 border-t border-secondary-foreground/15 pt-8 md:flex-row md:items-center">
          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5 text-sm">
            <a href={`mailto:${profile.email}`} className="text-secondary-foreground/70 hover:text-secondary-foreground">
              {profile.email}
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="hover:text-primary-foreground">
              <InstagramIcon className="size-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon className="size-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <p className="font-mono text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} {profile.fullName} · {profile.domain}
        </p>
      </div>
    </footer>
  )
}
