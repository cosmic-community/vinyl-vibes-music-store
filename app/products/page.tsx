import { getAllProducts } from '@/lib/cosmic'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export const metadata = {
  title: 'All Products | Vinyl & Vibes',
  description: 'Browse our complete catalog of vinyl records, merchandise, and audio equipment',
}

export default async function ProductsPage() {
  const products = await getAllProducts() as Product[]

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse our complete catalog of {products.length} products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products available at the moment.</p>
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
  )
}