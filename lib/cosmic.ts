import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Product fetching functions
export async function getAllProducts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

export async function getProductsByCollection(collectionId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collection': collectionId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by collection');
  }
}

// Collection fetching functions
export async function getAllCollections() {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

export async function getCollectionBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch collection');
  }
}

// Review fetching functions
export async function getReviewsByProduct(productId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort reviews by rating (highest first)
    return response.objects.sort((a: any, b: any) => {
      const ratingA = parseInt(a.metadata?.rating?.key || '0');
      const ratingB = parseInt(b.metadata?.rating?.key || '0');
      return ratingB - ratingA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

export async function getAllReviews() {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// About page fetching function
export async function getAboutPage() {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'about-pages',
        slug: 'about-us'
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch about page');
  }
}