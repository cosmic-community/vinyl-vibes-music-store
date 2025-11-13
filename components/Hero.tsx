export default function Hero() {
  return (
    <div 
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=1920&h=1200&fit=crop&auto=format)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      
      <div className="relative container-custom h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-6xl font-bold mb-6">
            Discover the Sound of Vinyl
          </h1>
          <p className="text-xl mb-8">
            Premium vinyl records, vintage equipment, and authentic band merchandise.
            Explore our curated collections and experience music the way it was meant to be heard.
          </p>
          <div className="flex gap-4">
            <a href="/products" className="btn-primary">
              Shop Now
            </a>
            <a href="/collections" className="btn-secondary">
              Browse Collections
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}