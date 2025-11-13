import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.metadata.featured_image?.imgix_url || collection.thumbnail

  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="card group relative h-80 overflow-hidden">
        <div className="absolute inset-0">
          {imageUrl && (
            <img
              src={`${imageUrl}?w=1200&h=640&fit=crop&auto=format,compress`}
              alt={collection.metadata.collection_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="600"
              height="320"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <h3 className="text-3xl font-bold mb-2">
            {collection.metadata.collection_name}
          </h3>
          
          {collection.metadata.description && (
            <p className="text-lg opacity-90">
              {collection.metadata.description}
            </p>
          )}

          <div className="mt-4">
            <span className="inline-block bg-primary hover:bg-primary-dark px-6 py-2 rounded-lg font-medium transition-colors">
              Explore Collection
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}