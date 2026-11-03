import { Hero } from '@/components/site/hero'
import { JournalPreview } from '@/components/site/journal-preview'
import { InstagramSection } from '@/components/site/instagram-section'
import { LinkedInSection } from '@/components/site/linkedin-section'
import { LibraryPreview } from '@/components/site/library-preview'
import { Founders } from '@/components/site/founders'

export default function Home() {
  return (
    <main>
      <Hero />
      <JournalPreview />
      <InstagramSection />
      <LinkedInSection />
      <LibraryPreview />
      <Founders />
    </main>
  )
}
