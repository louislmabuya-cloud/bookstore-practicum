import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#171717]">
      <Header />

      <main>
        <Hero />
      </main>
    </div>
  )
}