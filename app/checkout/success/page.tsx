'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()
  }, [clearCart])

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          <p className="text-gray-600 mb-8">
            You will receive a confirmation email shortly with your order details.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}