"use client";

import { useCart } from "./CartContext";
import CartCheckoutButton from "./CartCheckoutButton";

export default function CartDisplay() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title || 'Product'} 
                className="w-16 h-16 object-cover rounded"
              />
            )}
            
            <div className="flex-1">
              <h4 className="font-medium">{item.title || 'Product'}</h4>
              {item.price && (
                <p className="text-sm text-gray-600">${parseFloat(item.price).toFixed(2)}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
                className="w-16 rounded border px-2 py-1 text-sm"
              />
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        
        <CartCheckoutButton className="w-full" />
      </div>
    </div>
  );
}
