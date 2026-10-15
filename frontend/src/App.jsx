import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BookGrid from './components/BookGrid.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#171717]">
      <Header />

      <main>
        <Hero />
        <BookGrid />
      </main>
    </div>
  )
}