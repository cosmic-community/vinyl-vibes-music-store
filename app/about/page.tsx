import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Vinyl Vibes Music Store',
  description: 'Learn about Vinyl Vibes - your destination for authentic vinyl records, vintage audio equipment, and band merchandise since 2015.',
}

export default function AboutPage() {
  return (
    <div className="py-16 bg-cream">
      <div className="container-custom max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Vinyl Vibes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            More than just a music store - we're a community of vinyl enthusiasts, 
            audiophiles, and music lovers dedicated to preserving the authentic sound of music.
          </p>
        </div>

        {/* Store Image */}
        <div className="mb-16 rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=2000&h=800&fit=crop&auto=format,compress" 
            alt="Vinyl Vibes store interior with records"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Founded in 2015 by a group of passionate music collectors, Vinyl Vibes started 
                as a small corner shop in Portland with a simple mission: to bring the authentic 
                sound of vinyl records back to music lovers everywhere.
              </p>
              <p>
                What began as a modest collection of 500 records has grown into one of the 
                Pacific Northwest's premier destinations for vinyl enthusiasts. Today, we house 
                over 10,000 carefully curated vinyl records spanning every genre from classic 
                rock and jazz to indie and electronic music.
              </p>
              <p>
                We believe that music is meant to be experienced, not just consumed. That's why 
                we've created a space where you can browse, listen, and discover new artists in 
                an atmosphere that celebrates the art of music.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Sound</h3>
              <p className="text-gray-600">
                We're committed to preserving the warm, rich sound that only vinyl can deliver. 
                Every record we sell is carefully inspected for quality.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">
                We host regular listening parties, artist meet-and-greets, and workshops to 
                bring music lovers together and share our passion.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We believe in giving records a second life. Our collection includes carefully 
                restored vintage vinyl and we use eco-friendly packaging.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">💿</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Curated Vinyl Selection</h3>
                  <p className="text-gray-600">
                    From rare first pressings to modern releases, our collection spans decades 
                    of musical history across all genres.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">🎧</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Audio Equipment</h3>
                  <p className="text-gray-600">
                    High-quality turntables, speakers, and accessories to ensure your vinyl 
                    sounds its absolute best.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">👕</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Band Merchandise</h3>
                  <p className="text-gray-600">
                    Authentic merchandise from your favorite artists, from vintage band tees 
                    to limited edition prints.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">🔍</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Record Hunting Service</h3>
                  <p className="text-gray-600">
                    Looking for something specific? Our team will help you track down that 
                    elusive album you've been searching for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Us */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
          <p className="text-lg mb-6 opacity-90">
            Experience the magic of vinyl in person. Browse our collection, listen to records 
            on our vintage equipment, and chat with fellow music lovers.
          </p>
          <div className="space-y-2 mb-8">
            <p className="text-xl font-medium">123 Music Street, Portland, OR 97201</p>
            <p>Monday - Friday: 10am - 8pm</p>
            <p>Saturday: 10am - 6pm | Sunday: 12pm - 5pm</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/products" className="btn-secondary">
              Shop Online
            </a>
            <a href="/contact" className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
              Get Directions
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}