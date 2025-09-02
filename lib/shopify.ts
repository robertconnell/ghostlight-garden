const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-10';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

// Enhanced fetch with retry logic and better error handling
export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {},
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  // Check if we have the required credentials
  if (!domain || !token) {
    console.warn('Shopify credentials not found, skipping API call');
    throw new Error('Shopify credentials not configured');
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
        'Cache-Control': 'no-cache',
        'User-Agent': 'Ghostlight-Garden/1.0',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 0 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle different HTTP status codes
    if (res.status === 429) {
      // Rate limited - wait and retry
      if (retries > 0) {
        console.log(`Shopify rate limited, retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return shopifyFetch<T>(query, variables, retries - 1, delay * 2);
      }
      throw new Error('Shopify rate limit exceeded after retries');
    }

    if (res.status === 500 || res.status === 502 || res.status === 503) {
      // Server error - retry with exponential backoff
      if (retries > 0) {
        console.log(`Shopify server error ${res.status}, retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return shopifyFetch<T>(query, variables, retries - 1, delay * 2);
      }
      throw new Error(`Shopify server error ${res.status} after retries`);
    }

    if (!res.ok) {
      throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    
    // Check for GraphQL errors
    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
      
      // Handle specific error types
      const errorMessages = json.errors.map((e: any) => e.message).join(', ');
      
      if (errorMessages.includes('rate limit') || errorMessages.includes('too many requests')) {
        if (retries > 0) {
          console.log(`Shopify rate limit in GraphQL, retrying in ${delay}ms... (${retries} retries left)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return shopifyFetch<T>(query, variables, retries - 1, delay * 2);
        }
      }
      
      throw new Error(`Shopify GraphQL errors: ${errorMessages}`);
    }

    return json.data;

  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Handle timeout errors
    if (error.name === 'AbortError') {
      if (retries > 0) {
        console.log(`Shopify request timeout, retrying... (${retries} retries left)`);
        return shopifyFetch<T>(query, variables, retries - 1, delay);
      }
      throw new Error('Shopify request timeout after retries');
    }

    // Handle network errors
    if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.message.includes('fetch')) {
      if (retries > 0) {
        console.log(`Shopify network error, retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return shopifyFetch<T>(query, variables, retries - 1, delay * 2);
      }
      throw new Error(`Shopify network error after retries: ${error.message}`);
    }

    // Re-throw other errors
    throw error;
  }
}

// Check order status by cart ID
export async function checkOrderStatus(cartId: string): Promise<string | null> {
  try {
    // Query to get cart and its checkout status
    const query = `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await shopifyFetch<{ cart: any }>(query, { cartId });
    
    // If cart has no checkout URL, it might be completed
    if (!data.cart?.checkoutUrl) {
      return 'completed';
    }
    
    return 'pending';
  } catch (error) {
    console.error('Error checking order status:', error);
    return null;
  }
}
