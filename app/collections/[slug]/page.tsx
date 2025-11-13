// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollection } from '@/lib/cosmic'
import { Collection, Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug) as Collection | null

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id) as Product[]

  return (
    <div className="min-h-screen">
      {/* Collection Hero */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: collection.metadata.featured_image
            ? `url(${collection.metadata.featured_image.imgix_url}?w=1920&h=640&fit=crop&auto=format,compress)`
            : 'linear-gradient(135deg, #8B2635 0%, #6B1D29 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              {collection.metadata.collection_name}
            </h1>
            {collection.metadata.description && (
              <p className="text-xl">
                {collection.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 bg-cream">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} in this collection
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No products in this collection yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}