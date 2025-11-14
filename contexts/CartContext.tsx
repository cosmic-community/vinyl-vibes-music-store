'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Cart } from '@/types'

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
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

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart: Cart) => { // Changed: Added explicit type
      const existingItem = prevCart.items.find((i: CartItem) => i.productId === item.productId) // Changed: Added explicit type
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = prevCart.items.map((i: CartItem) => // Changed: Added explicit type
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        newItems = [...prevCart.items, { ...item, quantity: 1 }]
      }

      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) // Changed: Added explicit types
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) // Changed: Added explicit types

      return { items: newItems, total, itemCount }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart: Cart) => { // Changed: Added explicit type
      const newItems = prevCart.items.filter((item: CartItem) => item.productId !== productId) // Changed: Added explicit type
      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) // Changed: Added explicit types
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) // Changed: Added explicit types

      return { items: newItems, total, itemCount }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart: Cart) => { // Changed: Added explicit type
      const newItems = prevCart.items.map((item: CartItem) => // Changed: Added explicit type
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
      const total = newItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) // Changed: Added explicit types
      const itemCount = newItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) // Changed: Added explicit types

      return { items: newItems, total, itemCount }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
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