import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItem } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [`${item.image}?w=400&h=400&fit=crop&auto=format,compress`] : [],
          metadata: {
            productId: item.productId,
            sku: item.sku || '',
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      metadata: {
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0).toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}