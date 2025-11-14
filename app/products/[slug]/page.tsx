// app/products/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Product, Review } from '@/types'
import ProductGallery from '@/components/ProductGallery'
import ReviewsList from '@/components/ReviewsList'
import { useCart } from '@/contexts/CartContext'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product
        const productRes = await fetch(`/api/products/${slug}`)
        if (!productRes.ok) {
          setProduct(null)
          return
        }
        const productData = await productRes.json()
        setProduct(productData)

        // Fetch reviews
        if (productData?.id) {
          const reviewsRes = await fetch(`/api/reviews?productId=${productData.id}`)
          if (reviewsRes.ok) {
            const reviewsData = await reviewsRes.json()
            setReviews(reviewsData)
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="py-16 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-16 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    )
  }

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => {
        const rating = parseInt(review.metadata?.rating?.key || '0')
        return sum + rating
      }, 0) / reviews.length
    : 0

  const handleAddToCart = () => {
    if (!product.metadata.in_stock) return

    const imageUrl = product.metadata.product_images?.[0]?.imgix_url || product.thumbnail

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.metadata.product_name,
      price: product.metadata.price,
      image: imageUrl,
      sku: product.metadata.sku
    })
  }

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.metadata.product_name}
            </h1>

            {product.metadata.collection && (
              <a 
                href={`/collections/${product.metadata.collection.slug}`}
                className="inline-block text-primary hover:text-primary-dark font-medium mb-4"
              >
                {product.metadata.collection.title}
              </a>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-primary">
                ${product.metadata.price.toFixed(2)}
              </div>
              
              {product.metadata.in_stock ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating ? 'star-filled' : 'star-empty'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            {product.metadata.description && (
              <div 
                className="prose prose-lg mb-8"
                dangerouslySetInnerHTML={{ __html: product.metadata.description }}
              />
            )}

            {product.metadata.sku && (
              <p className="text-sm text-gray-600 mb-8">
                SKU: {product.metadata.sku}
              </p>
            )}

            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full lg:w-auto"
              disabled={!product.metadata.in_stock}
            >
              {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews
            </h2>
            <ReviewsList reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  )
}