'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { cart } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🎵</span>
            <span className="text-2xl font-bold text-primary">Vinyl Vibes</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/collections" className="nav-link">
              Collections
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
              <span className="text-xl">🛒</span>
              <span className="font-medium">Cart</span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4 mt-4">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/collections" className="nav-link">
            Collections
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}