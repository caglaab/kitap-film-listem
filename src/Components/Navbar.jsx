function Navbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">📚 Kitap/Film Listem</h1>
        <p className="hidden sm:block text-sm text-indigo-100">
          Okuduklarını ve izlediklerini takip et
        </p>
      </div>
    </header>
  )
}

export default Navbar