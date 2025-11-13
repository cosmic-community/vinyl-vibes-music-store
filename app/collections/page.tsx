import { getAllCollections } from '@/lib/cosmic'
import { Collection } from '@/types'
import CollectionCard from '@/components/CollectionCard'

export const revalidate = 60

export const metadata = {
  title: 'Collections | Vinyl & Vibes',
  description: 'Browse our curated collections of vinyl records and music merchandise',
}

export default async function CollectionsPage() {
  const collections = await getAllCollections() as Collection[]

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Collections
          </h1>
          <p className="text-lg text-gray-600">
            Explore our curated selections of music and merchandise
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No collections available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}