import Header from './components/Header.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#29251f]">
      <Header />

      <main className="p-6">
        <h1 className="text-4xl font-bold text-[#254d3e]">
          Boox Store
        </h1>

        <p className="mt-4">
          Find your next favourite book.
        </p>
      </main>
    </div>
  )
}