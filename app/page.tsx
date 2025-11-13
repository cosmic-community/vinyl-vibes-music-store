import { getAllProducts, getAllCollections } from '@/lib/cosmic'
import { Product, Collection } from '@/types'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'
import Hero from '@/components/Hero'

export const revalidate = 60

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getAllCollections()
  ])

  const featuredProducts = (products as Product[]).slice(0, 6)

  return (
    <div>
      <Hero />
      
      {/* Collections Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Collection
            </h2>
            <p className="text-lg text-gray-600">
              Discover curated selections of music and merchandise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(collections as Collection[]).map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked vinyl records and music accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/products" className="btn-primary inline-block">
              View All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}