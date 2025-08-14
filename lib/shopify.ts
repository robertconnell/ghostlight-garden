const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-07';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
      // Add cache-busting header
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({ query, variables }),
    // Next.js App Router caching hint
    next: { revalidate: 0 }, // Force fresh data every time
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Error returned from Shopify');
  }

  return json.data;
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
