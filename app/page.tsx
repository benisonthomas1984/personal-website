import { Hero } from '@/components/site/hero'
import { JournalPreview } from '@/components/site/journal-preview'
import { Journey } from '@/components/site/journey'
import { SocialFeed } from '@/components/site/social-feed'
import { LibraryPreview } from '@/components/site/library-preview'
import { Founders } from '@/components/site/founders'

export default function Home() {
  return (
    <main>
      <Hero />
      <JournalPreview />
      <Journey />
      <SocialFeed />
      <LibraryPreview />
      <Founders />
    </main>
  )
}
