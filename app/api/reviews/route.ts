import { NextRequest, NextResponse } from 'next/server'
import { getReviewsByProduct } from '@/lib/cosmic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const reviews = await getReviewsByProduct(productId)
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}