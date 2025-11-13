# 🎵 Vinyl & Vibes Music Store

![App Preview](https://imgix.cosmicjs.com/782bf550-c0d1-11f0-a34a-efbcf979242c-photo-1498038432885-c6f3f1b912ee-1763066634175.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce music store built with Next.js 16 and powered by Cosmic CMS. Browse vinyl records, band merchandise, and audio equipment with a vintage-inspired design and seamless shopping experience.

## ✨ Features

- 🎸 **Product Catalog** - Browse vinyl records, merchandise, and audio equipment
- 📚 **Collection Filtering** - Explore curated collections (Classic Rock, New Releases)
- ⭐ **Customer Reviews** - Authentic product reviews with star ratings
- 📱 **Responsive Design** - Optimized for mobile and desktop
- 🖼️ **High-Resolution Images** - Optimized product photography with imgix
- ⚡ **Server-Side Rendering** - Fast initial page loads with Next.js 16
- 🔄 **Dynamic Content** - Real-time updates from Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=691642b565bd4e64eaf80fd6&clone_repository=691643e965bd4e64eaf80ff7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce music store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for 'Design a content model for an e-commerce music store with products, collections, and customer reviews', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with collection data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'abbey-road-vinyl' })
  .depth(1)
```

### Fetching Collections

```typescript
// Get all collections
const { objects: collections } = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])

// Filter products by collection
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collection': collectionId 
  })
  .depth(1)
```

### Fetching Reviews

```typescript
// Get all reviews with product data
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Get reviews for specific product
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application uses the following content types from your Cosmic bucket:

### Products
- Product Name (text)
- Description (HTML textarea)
- Price (number)
- Product Images (files)
- Collection (object relationship)
- In Stock (switch)
- SKU (text)

### Collections
- Collection Name (text)
- Description (textarea)
- Featured Image (file)

### Reviews
- Customer Name (text)
- Rating (select-dropdown: 1-5 stars)
- Review Text (textarea)
- Product (object relationship)
- Verified Purchase (switch)

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vinyl-vibes-music-store)

1. Click the button above
2. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
3. Deploy!

### Environment Variables

Set these in your Vercel project settings:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

<!-- README_END -->