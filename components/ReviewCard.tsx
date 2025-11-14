import { Review } from '@/types'

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = parseInt(review.metadata?.rating?.key || '0')

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg text-gray-900">
            {review.metadata.customer_name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= rating ? 'star-filled' : 'star-empty'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {review.metadata.verified_purchase && (
              <span className="text-sm text-green-600 font-medium">
                ✓ Verified Purchase
              </span>
            )}
          </div>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 mb-2">{review.title}</h3>

      {review.metadata.review_text && (
        <p className="text-gray-700 leading-relaxed">
          {review.metadata.review_text}
        </p>
      )}
    </div>
  )
}