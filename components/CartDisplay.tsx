"use client";

import { useCart } from "./CartContext";
import CartCheckoutButton from "./CartCheckoutButton";
import Link from "next/link";

export default function CartDisplay() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-black">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h3>
        <button 
          onClick={() => clearCart()}
          className="text-sm text-purple-400 hover:text-purple-900"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => {          
          return item.handle ? (
            <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 hover:border-purple-300 hover:shadow-md">
              {/* Clickable Image */}
              {item.image && (
                <Link href={item.collectionHandle ? `/collections/${item.collectionHandle}/${item.handle}` : `/collections/all/${item.handle}`}>
                  <img 
                    src={item.image} 
                    alt={item.title || 'Product'} 
                    className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              )}
              
              <div className="flex-1">
                {/* Clickable Title */}
                <Link href={item.collectionHandle ? `/collections/${item.collectionHandle}/${item.handle}` : `/collections/all/${item.handle}`}>
                  <h4 className="font-medium text-black hover:text-purple-300 transition-colors cursor-pointer">
                    {item.title || 'Product Unavailable'}
                  </h4>
                </Link>
                
                {/* Individual Variant Options */}
                {item.variantOptions && Object.keys(item.variantOptions).length > 0 && (
                  <div className="text-xs text-gray-500 space-y-1 mb-1">
                    {Object.entries(item.variantOptions).map(([optionName, optionValue]) => (
                      <div key={optionName}>
                        <span className="font-medium">{optionName}:</span> {optionValue}
                      </div>
                    ))}
                  </div>
                )}
                
                {item.price ? (
                  <p className="text-sm text-black">${parseFloat(item.price).toFixed(2)}</p>
                ) : (
                  <p className="text-sm text-red-500">Price unavailable</p>
                )}
                {!item.title && (
                  <p className="text-xs text-red-500">This product may no longer be available</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(item.id, Math.max(1, Number(e.target.value) || 1));
                  }}
                  className="w-16 rounded border px-2 py-1 text-sm text-black"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-purple-400 hover:text-purple-900 text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title || 'Product'} 
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              
              <div className="flex-1">
                <h4 className="font-medium text-black">
                  {item.title || 'Product Unavailable'}
                </h4>
                
                {/* Individual Variant Options */}
                {item.variantOptions && Object.keys(item.variantOptions).length > 0 && (
                  <div className="text-xs text-gray-500 space-y-1 mb-1">
                    {Object.entries(item.variantOptions).map(([optionName, optionValue]) => (
                      <div key={optionName}>
                        <span className="font-medium">{optionName}:</span> {optionValue}
                      </div>
                    ))}
                  </div>
                )}
                
                {item.price ? (
                  <p className="text-sm text-black">${parseFloat(item.price).toFixed(2)}</p>
                ) : (
                  <p className="text-sm text-red-500">Price unavailable</p>
                )}
                {!item.title && (
                  <p className="text-xs text-red-500">This product may no longer be available</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 rounded border px-2 py-1 text-sm text-black"
                />
                

              </div>
            </div>
          );
        })}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-black">Total:</span>
          <span className="font-semibold text-black">${totalPrice.toFixed(2)}</span>
        </div>
        
        {/* Checkout Button */}
        <CartCheckoutButton />
        
      </div>
    </div>
  );
}