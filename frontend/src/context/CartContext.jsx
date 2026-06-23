import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart as addToCartAPI, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI, clearCart as clearCartAPI } from "../services/cartService";
import { toast } from "sonner";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart from backend on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setItems(cartData.items);
      setSubtotal(cartData.subtotal);
      setTotalItems(cartData.totalItems);
    } catch (error) {
      console.error('Failed to load cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const cartData = await addToCartAPI(product, quantity);
      setItems(cartData.items);
      setSubtotal(cartData.subtotal);
      setTotalItems(cartData.totalItems);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const cartData = await removeFromCartAPI(productId);
      setItems(cartData.items);
      setSubtotal(cartData.subtotal);
      setTotalItems(cartData.totalItems);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error(error.message || 'Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const cartData = await updateCartItemAPI(productId, quantity);
      setItems(cartData.items);
      setSubtotal(cartData.subtotal);
      setTotalItems(cartData.totalItems);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error(error.message || 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      const cartData = await clearCartAPI();
      setItems(cartData.items);
      setSubtotal(cartData.subtotal);
      setTotalItems(cartData.totalItems);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error(error.message || 'Failed to clear cart');
    }
  };

  const getTotal = () => subtotal;

  const getItemCount = () => totalItems;

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        subtotal,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        refreshCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
