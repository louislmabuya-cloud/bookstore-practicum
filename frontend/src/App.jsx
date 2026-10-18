import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BookGrid from './components/BookGrid.jsx'
import Events from './components/Events.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F2E6D2] text-[#30241C]">
      <Header />

      <main>
        <Hero />
        <BookGrid />
        <Events />
        <About />
      </main>

      <Footer />
    </div>
  )
}