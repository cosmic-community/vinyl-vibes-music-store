'use client'

import { Product } from '@/types'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const imageUrl = product.metadata.product_images?.[0]?.imgix_url || product.thumbnail
  const collectionName = product.metadata.collection?.title

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.metadata.in_stock) return

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
    <Link href={`/products/${product.slug}`}>
      <div className="card group">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageUrl && (
            <img
              src={`${imageUrl}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.metadata.product_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="400"
              height="400"
            />
          )}
          
          {!product.metadata.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          {collectionName && (
            <p className="text-sm text-primary font-medium mb-2">
              {collectionName}
            </p>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {product.metadata.product_name}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">
              ${product.metadata.price.toFixed(2)}
            </span>
            
            {product.metadata.in_stock && (
              <span className="text-sm text-green-600 font-medium">
                In Stock
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.metadata.in_stock}
            className="btn-primary w-full text-center"
          >
            {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </Link>
  )
}