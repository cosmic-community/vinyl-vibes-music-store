export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}