'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { cart } = useCart()

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl">🎵</div>
            <span className="text-2xl font-bold">Vinyl Vibes</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-secondary transition-colors">
              Products
            </Link>
            <Link href="/collections" className="hover:text-secondary transition-colors">
              Collections
            </Link>
            <Link href="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
            <Link 
              href="/cart" 
              className="relative hover:text-secondary transition-colors flex items-center gap-2"
            >
              <span>🛒</span>
              <span>Cart</span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}