export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎵</span>
              <span className="text-xl font-bold">Vinyl & Vibes</span>
            </div>
            <p className="text-gray-400">
              Your destination for vinyl records, band merchandise, and audio equipment.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/collections" className="hover:text-white transition-colors">
                  Collections
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Email: info@vinylandvibes.com
            </p>
            <p className="text-gray-400">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Vinyl & Vibes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}