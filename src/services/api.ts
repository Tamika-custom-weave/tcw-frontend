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
    console.error("Error fetching categories:", error);
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
    console.error("Error fetching products:", error);
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
    console.error("Error fetching products by category:", error);
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
    console.error("Error fetching product by slug:", error);
    return null;
  }
};
