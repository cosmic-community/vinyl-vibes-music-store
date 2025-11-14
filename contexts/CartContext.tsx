'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Cart } from '@/types'

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  })

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vinyl-vibes-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as Cart
        setCart(parsedCart)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vinyl-vibes-cart', JSON.stringify(cart))
  }, [cart])

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.visible])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, visible: true })
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart: Cart) => {
      const existingItem = prevCart.items.find((i: CartItem) => i.productId === item.productId)
      
      let newItems: CartItem[]
      let wasUpdated = false
      
      if (existingItem) {
        newItems = prevCart.items.map((i: CartItem) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
        wasUpdated = true
      } else {
        newItems = [...prevCart.items, { ...item, quantity: 1 }]
      }

      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

      // Show success toast
      if (wasUpdated) {
        showToast(`Updated quantity for ${item.name}`, 'success')
      } else {
        showToast(`${item.name} added to cart!`, 'success')
      }

      return { items: newItems, total, itemCount }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart: Cart) => {
      const removedItem = prevCart.items.find((item: CartItem) => item.productId === productId)
      const newItems = prevCart.items.filter((item: CartItem) => item.productId !== productId)
      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

      if (removedItem) {
        showToast(`${removedItem.name} removed from cart`, 'info')
      }

      return { items: newItems, total, itemCount }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart: Cart) => {
      const newItems = prevCart.items.map((item: CartItem) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 })
    showToast('Cart cleared', 'info')
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, showToast }}>
      {children}
      
      {/* Toast Notification - Fixed positioning and z-index */}
      {toast.visible && (
        <div 
          className="fixed bottom-8 right-8 animate-slide-up pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          <div 
            className={`
              px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md pointer-events-auto
              ${toast.type === 'success' ? 'bg-green-600 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
              ${toast.type === 'info' ? 'bg-blue-600 text-white' : ''}
            `}
            style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}
          >
            {toast.type === 'success' && (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className="ml-2 text-white hover:text-gray-200 transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}