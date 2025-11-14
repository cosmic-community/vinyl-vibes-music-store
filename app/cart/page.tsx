'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart.items }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setIsCheckingOut(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="py-16 bg-cream min-h-screen">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some vinyl records to get started!</p>
            <Link href="/products" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {cart.items.map((item) => (
                <div key={item.productId} className="border-b last:border-b-0 p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    {item.image && (
                      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                        <img
                          src={`${item.image}?w=200&h=200&fit=crop&auto=format,compress`}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                          width="96"
                          height="96"
                        />
                      </Link>
                    )}

                    {/* Product Details */}
                    <div className="flex-grow">
                      <Link 
                        href={`/products/${item.slug}`}
                        className="text-xl font-bold text-gray-900 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.sku && (
                        <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                      )}
                      <p className="text-lg font-bold text-primary mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary">${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary w-full text-center"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <Link 
                href="/products" 
                className="block text-center text-primary hover:text-primary-dark font-medium mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}