import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="text-3xl">🎵</div>
            <span className="text-2xl font-bold">Vinyl & Vibes</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="hover:text-cream transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="hover:text-cream transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="hover:text-cream transition-colors font-medium"
            >
              Collections
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-cream transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          <button className="md:hidden flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>
    </header>
  )
}