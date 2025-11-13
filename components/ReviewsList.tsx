import { Review } from '@/types'
import ReviewCard from '@/components/ReviewCard'

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}