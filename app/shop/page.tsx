import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT_LIST } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
import GlobalFooter from "@/components/GlobalFooter";

export default async function ShopPage() {
  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(
    GET_PRODUCT_LIST, { first: 24 }
  );
  const products = data.products.edges.map(e => e.node);

  return (
    <div className="min-h-screen bg-gray flex flex-col">
      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      
      {/* Footer - Full Width */}
      <GlobalFooter />
    </div>
  );
}
