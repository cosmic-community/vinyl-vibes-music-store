import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | Vinyl & Vibes Music Store',
  description: 'Get in touch with us for any questions about vinyl records, merchandise, or audio equipment.',
}

export default function ContactPage() {
  return (
    <div className="py-16 bg-cream">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl">📧</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600">info@vinylandvibes.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏪</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  123 Music Street<br />
                  Portland, OR 97201
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-4">Store Hours</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">10am - 8pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">10am - 6pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">12pm - 5pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}