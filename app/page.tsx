import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { LearningPaths } from '@/components/site/learning-paths'
import { ResourceLibrary } from '@/components/site/resource-library'
import { Watch } from '@/components/site/watch'
import { About } from '@/components/site/about'
import { Newsletter } from '@/components/site/newsletter'
import { SiteFooter } from '@/components/site/site-footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LearningPaths />
        <ResourceLibrary />
        <Watch />
        <About />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
