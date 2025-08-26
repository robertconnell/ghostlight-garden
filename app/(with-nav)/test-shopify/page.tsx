import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCTS } from '@/lib/queries';

export default async function TestShopifyPage() {
  // Fetch first 3 products
  const data = await shopifyFetch<{ products: { edges: any[] } }>(GET_PRODUCTS, { first: 3 });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopify Products Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}