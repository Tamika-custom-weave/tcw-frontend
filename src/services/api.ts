export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface ProductVariant {
  _id?: string;
  length?: string;
  size?: string;
  laceType?: string;
  texture?: string;
  density?: string;
  color?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  isActive: boolean;
}

export interface Product {
  _id: string;
  category: Category;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  thumbnail?: ProductImage;
  images: ProductImage[];
  featured: boolean;
  isActive: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    // Server-side
    return process.env.INTERNAL_API_URL || "http://localhost:5000/api";
  }
  // Client-side
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${getBaseUrl()}/categories`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json.success ? (json.data as Category[]) : [];
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${getBaseUrl()}/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return json.success ? (json.data as Product[]) : [];
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const res = await fetch(`${getBaseUrl()}/products/category/${categoryId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products by category");
    const json = await res.json();
    return json.success ? (json.data as Product[]) : [];
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching products by category:", error);
    return [];
  }
};

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/products/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product by slug");
    const json = await res.json();
    return json.success ? (json.data as Product) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching product by slug:", error);
    return null;
  }
};

export interface CustomWigOptionsResponse {
  bundles: Product[];
  laceSystems: Product[];
  headSizes: string[];
  wigStyles: string[];
  stylingOptions: string[];
}

export interface PriceCalculationPayload {
  bundles: { product: string; variantSku: string; quantity: number }[];
  laceSystem: { product: string; variantSku: string } | null;
  styling?: string;
}

export interface CreateCustomWigPayload extends PriceCalculationPayload {
  headSize: string;
  hairLength: string;
  wigStyle: string;
  styling: string;
}

export const fetchCustomWigOptions = async (): Promise<CustomWigOptionsResponse | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/custom-wigs/options`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch custom wig options");
    const json = await res.json();
    return json.success ? (json.data as CustomWigOptionsResponse) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching custom wig options:", error);
    return null;
  }
};

export const calculateCustomWigPrice = async (payload: PriceCalculationPayload): Promise<number | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/custom-wigs/price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to calculate custom wig price");
    const json = await res.json();
    return json.success ? json.data.totalPrice : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error calculating custom wig price:", error);
    return null;
  }
};

export const createCustomWig = async (payload: CreateCustomWigPayload): Promise<string | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/custom-wigs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create custom wig");
    const json = await res.json();
    return json.success ? json.data._id : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error creating custom wig:", error);
    return null;
  }
};

// ==========================================
// Cart API
// ==========================================

export interface CustomWig {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  laceSystem?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bundles?: any[];
  headSize: string;
  hairLength: string;
  wigStyle: string;
  styling?: string;
  totalPrice: number;
}

export interface CartItem {
  _id: string;
  itemType: "PRODUCT" | "CUSTOM_WIG";
  product?: Product;
  variantSku?: string;
  customWig?: CustomWig; // The populated custom wig object if needed
  quantity: number;
  priceAtAddition: number;
}

export interface Cart {
  _id: string;
  cartId: string;
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
}

export interface AddToCartPayload {
  itemType: "PRODUCT" | "CUSTOM_WIG";
  product?: string;
  variantSku?: string;
  customWig?: string;
  quantity: number;
}

export const fetchCart = async (): Promise<Cart | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cart`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
        const errorText = await res.text();
        if (process.env.NODE_ENV === 'development') console.error(`Failed to fetch cart: ${res.status} ${res.statusText} - ${errorText}`);
        throw new Error("Failed to fetch cart");
      }
    const json = await res.json();
    return json.success ? (json.data as Cart) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error fetching cart:", error);
    return null;
  }
};

export const addToCart = async (payload: AddToCartPayload): Promise<Cart | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cart/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to add item to cart");
    const json = await res.json();
    return json.success ? (json.data as Cart) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error adding to cart:", error);
    return null;
  }
};

export const updateCartItem = async (itemId: string, quantity: number): Promise<Cart | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cart/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart item");
    const json = await res.json();
    return json.success ? (json.data as Cart) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error updating cart item:", error);
    return null;
  }
};

export const removeCartItem = async (itemId: string): Promise<Cart | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cart/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to remove cart item");
    const json = await res.json();
    return json.success ? (json.data as Cart) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error removing cart item:", error);
    return null;
  }
};

export const clearCart = async (): Promise<Cart | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cart`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    const json = await res.json();
    return json.success ? (json.data as Cart) : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error clearing cart:", error);
    return null;
  }
};

export const createCheckoutSession = async (cartId: string, cartItemId?: string): Promise<string | null> => {
  try {
    const res = await fetch(`${getBaseUrl()}/payments/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ cartId, cartItemId }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create checkout session");
    }
    const json = await res.json();
    return json.success ? json.url : null;
  } catch (error) {
    if ((error as Error & { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    if (process.env.NODE_ENV === 'development') console.error("Error creating checkout session:", error);
    throw error;
  }
};
