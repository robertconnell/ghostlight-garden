// components/VariantPicker.tsx
"use client";
import { useMemo, useState } from "react";
import { findVariantId, VariantNode } from "@/lib/variant";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

type ProductForPicker = {
  options?: { name: string; values: string[] }[];   // make optional
  variants: { edges: { node: VariantNode }[] };
  title?: string;
  featuredImage?: { url: string; altText: string };
};

export default function VariantPicker({ product }: { product: ProductForPicker }) {
  const options = product.options ?? [];

  // If no options, just render qty + Add to Cart + Buy Now for the first variant
  if (options.length === 0) {
    const first = product.variants.edges[0]?.node;
    return (
      <div className="space-y-4">
        <QtyAndButtons 
          merchandiseId={first?.id} 
          title={product.title}
          price={first?.price?.amount}
          image={product.featuredImage?.url}
        />
      </div>
    );
  }

  const defaultSelected = useMemo(() => {
    const s: Record<string, string> = {};
    for (const opt of options) s[opt.name] = opt.values[0];
    return s;
  }, [options]);

  const [selected, setSelected] = useState<Record<string, string>>(defaultSelected);
  const [qty, setQty] = useState(1);
  const variant = findVariantId(product.variants, selected);

  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <div key={opt.name}>
          <div className="mb-2 text-sm font-medium">{opt.name}</div>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((val) => {
              const active = selected[opt.name] === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [opt.name]: val }))}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    active ? "border-black bg-black text-white" : "border-gray-300"
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <QtyAndButtons 
        merchandiseId={variant?.id} 
        unavailable={!variant?.availableForSale} 
        qty={qty} 
        setQty={setQty}
        title={product.title}
        price={variant?.price?.amount}
        image={product.featuredImage?.url}
      />
    </div>
  );
}

function QtyAndButtons({
  merchandiseId,
  qty = 1,
  setQty,
  unavailable,
  title = "",
  price = "",
  image = "",
}: {
  merchandiseId?: string;
  qty?: number;
  setQty?: (n: number) => void;
  unavailable?: boolean;
  title?: string;
  price?: string;
  image?: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty?.(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 rounded-lg border border-gray-300 px-3 py-1.5"
        />
      </div>

      <div className="flex gap-3">
        <AddToCartButton
          merchandiseId={merchandiseId || ""}
          quantity={qty}
          title={title}
          price={price}
          image={image}
          className="flex-1 rounded-lg px-4 py-3 bg-black text-white disabled:opacity-50"
        />
        
        <BuyNowButton
          merchandiseId={merchandiseId || ""}
          quantity={qty}
          className="flex-1 rounded-lg px-4 py-3 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
        />
      </div>
      
      {unavailable === true && (
        <div className="text-sm text-red-600">This variant is currently unavailable.</div>
      )}
    </>
  );
}
