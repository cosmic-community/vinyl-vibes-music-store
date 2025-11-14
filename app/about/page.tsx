import { Metadata } from 'next'
import { getAboutPage } from '@/lib/cosmic'
import type { AboutPage } from '@/types' // Changed: Use type-only import to fix TS2865

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About Us | Vinyl Vibes Music Store',
  description: 'Learn about Vinyl Vibes - your destination for authentic vinyl records, vintage audio equipment, and band merchandise since 2015.',
}

export default async function AboutPage() {
  const aboutData = await getAboutPage() as AboutPage | null

  // Fallback content if Cosmic data is not available
  if (!aboutData) {
    return (
      <div className="py-16 bg-cream min-h-screen">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            Content is being updated. Please check back soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-cream">
      <div className="container-custom max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {aboutData.metadata.hero_title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutData.metadata.hero_subtitle}
          </p>
        </div>

        {/* Store Image */}
        {aboutData.metadata.hero_image && (
          <div className="mb-16 rounded-lg overflow-hidden shadow-xl">
            <img 
              src={`${aboutData.metadata.hero_image.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
              alt="Vinyl Vibes store interior"
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {aboutData.metadata.story_title}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: aboutData.metadata.story_content }}
            />
          </div>
        </section>

        {/* Our Values */}
        {aboutData.metadata.values && aboutData.metadata.values.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {aboutData.metadata.values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What We Offer */}
        {aboutData.metadata.offerings && aboutData.metadata.offerings.length > 0 && (
          <section className="mb-16">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Offer
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {aboutData.metadata.offerings.map((offering, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{offering.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{offering.title}</h3>
                      <p className="text-gray-600">{offering.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visit Us */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-12 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            {aboutData.metadata.visit_title}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {aboutData.metadata.visit_description}
          </p>
          <div className="space-y-2 mb-8">
            <p className="text-xl font-medium">{aboutData.metadata.store_address}</p>
            <div 
              className="text-base"
              dangerouslySetInnerHTML={{ __html: aboutData.metadata.store_hours }}
            />
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