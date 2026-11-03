import { ArrowUpRight } from 'lucide-react'
import { navLinks, profile } from '@/lib/content'

const socials = [
  { label: 'Instagram', handle: profile.instagramHandle, href: profile.instagram },
  { label: 'LinkedIn', handle: profile.linkedinHandle, href: profile.linkedin },
  { label: 'Email', handle: profile.email, href: `mailto:${profile.email}` },
]

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.label === 'Email' ? undefined : '_blank'}
              rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex items-center justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary"
            >
              <span className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {social.label}
                </span>
                <span className="font-medium">{social.handle}</span>
              </span>
              <ArrowUpRight
                className="size-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Ben Thomas. Free to learn, free to share.</p>
          <nav aria-label="Footer" className="flex gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
