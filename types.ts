export interface Product {
  id: string
  title: string
  slug: string
  thumbnail: string
  metadata: {
    product_name: string
    price: number
    description: string
    sku: string
    in_stock: boolean
    collection?: {
      id: string
      title: string
      slug: string
    }
    product_images?: Array<{
      imgix_url: string
      url: string
    }>
  }
}

export interface Collection {
  id: string
  title: string
  slug: string
  thumbnail: string
  metadata: {
    collection_name: string
    description: string
    featured_image?: {
      imgix_url: string
      url: string
    }
  }
}

// Changed: Added missing properties for customer_name and verified_purchase
export interface Review {
  id: string
  title: string
  slug: string
  metadata: {
    reviewer_name: string
    customer_name: string // Changed: Added customer_name property
    review_text: string
    rating: {
      key: string
      value: string
    }
    verified_purchase?: boolean // Changed: Added verified_purchase property
    product: {
      id: string
      title: string
      slug: string
    }
  }
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  image: string
  sku: string
}

// Changed: Added Cart interface for shopping cart state
export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// Changed: Added AboutPage interface for Cosmic-powered content
export interface AboutPage {
  id: string
  title: string
  slug: string
  thumbnail: string
  metadata: {
    hero_title: string
    hero_subtitle: string
    hero_image: {
      imgix_url: string
      url: string
    }
    story_title: string
    story_content: string
    values: Array<{
      icon: string
      title: string
      description: string
    }>
    offerings: Array<{
      icon: string
      title: string
      description: string
    }>
    visit_title: string
    visit_description: string
    store_address: string
    store_hours: string
  }
}