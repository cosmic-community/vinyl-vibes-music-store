'use client'

import { Product } from '@/types'
import { useState } from 'react'

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.metadata.product_images || []
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-400 text-xl">No image available</span>
      </div>
    )
  }

  // Get the current image safely with fallback to first image
  const currentImage = images[selectedIndex] || images[0]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
        <img
          src={`${currentImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={product.metadata.product_name}
          className="w-full h-full object-cover"
          width="600"
          height="600"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary shadow-md'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={`${product.metadata.product_name} ${index + 1}`}
                className="w-full h-full object-cover"
                width="100"
                height="100"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}