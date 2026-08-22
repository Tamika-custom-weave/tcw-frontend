"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { 
  Cart, 
  fetchCart, 
  addToCart as apiAddToCart, 
  updateCartItem as apiUpdateCartItem, 
  removeCartItem as apiRemoveCartItem, 
  clearCart as apiClearCart,
  AddToCartPayload
} from "@/services/api";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  refreshCart: () => Promise<void>;
  addToCart: (payload: AddToCartPayload) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchCart();
    setCart(data);
    setIsLoading(false);
  }, []);

  // Fetch initial cart on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (payload: AddToCartPayload) => {
    const updatedCart = await apiAddToCart(payload);
    if (updatedCart) {
      setCart(updatedCart);
      setIsCartOpen(true); // Auto-open cart drawer on add
      return true;
    }
    return false;
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    const updatedCart = await apiUpdateCartItem(itemId, quantity);
    if (updatedCart) {
      setCart(updatedCart);
      return true;
    }
    return false;
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const updatedCart = await apiRemoveCartItem(itemId);
    if (updatedCart) {
      setCart(updatedCart);
      return true;
    }
    return false;
  }, []);

  const clearCart = useCallback(async () => {
    const updatedCart = await apiClearCart();
    if (updatedCart) {
      setCart(updatedCart);
      return true;
    }
    return false;
  }, []);

  const contextValue = useMemo(() => ({
    cart, 
    isLoading, 
    isCartOpen, 
    setIsCartOpen, 
    refreshCart, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    clearCart 
  }), [cart, isLoading, isCartOpen, refreshCart, addToCart, updateQuantity, removeItem, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
