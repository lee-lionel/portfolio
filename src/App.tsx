import { Rail, TopBar } from './components/Rail'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { About, Education, Experience, Skills } from './components/Record'
import { Contact, Footer } from './components/Contact'
import { useReveal } from './lib/reveal'
import { useScrollFx } from './lib/scrollfx'

export default function App() {
  useReveal()
  useScrollFx()

  return (
    <>
      <TopBar />
      {/* Rail and content are one centred group. A viewport-fixed rail would
          pin to the left edge and open an ever-wider gutter as the monitor
          grows; sticky inside the group keeps the gutter constant. */}
      <div className="mx-auto flex w-full max-w-6xl gap-10 px-5 sm:px-8 lg:gap-16">
        <Rail />
        <main className="min-w-0 flex-1">
          <Hero />
          <Work />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  )
}
