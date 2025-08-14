export type VariantNode = {
    id: string;
    availableForSale: boolean;
    selectedOptions: { name: string; value: string }[];
    price: { amount: string; currencyCode: string };
  };
  
  /**
   * Given Shopify variants and a map of selected options,
   * return the matching variant node (or null if none).
   */
  export function findVariantId(
    variants: { edges: { node: VariantNode }[] },
    selected: Record<string, string>
  ): VariantNode | null {
    for (const { node } of variants.edges) {
      const match = node.selectedOptions.every(
        (opt) => selected[opt.name] === opt.value
      );
      if (match) return node;
    }
    return null;
  }
  