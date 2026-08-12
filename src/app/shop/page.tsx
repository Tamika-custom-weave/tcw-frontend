import React from "react";
import Link from "next/link";
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "@/services/api";
import ProductCard from "@/components/shop/ProductCard";
import ShopControls from "@/components/shop/ShopControls";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;

  // Fetch all categories for navigation
  const categories = await fetchCategories();
  
  // Find the selected category object if a slug is provided
  const selectedCategory = categorySlug 
    ? categories.find((c) => c.slug === categorySlug) 
    : undefined;

  // Fetch products based on selected category or fetch all
  const products = selectedCategory 
    ? await fetchProductsByCategory(selectedCategory._id)
    : await fetchProducts();

  // Filter out inactive products just in case
  const activeProducts = products.filter(p => p.isActive);

  return (
    <div className="w-full min-h-screen bg-pure-white flex flex-col">
      {/* Top Divider */}
      <div className="w-full border-b border-[#a89d7e]/30" />

      <div className="flex-grow flex w-full">
        {/* Left Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0" />

        <div className="flex-grow flex flex-col w-full mx-auto max-w-[1600px]">
          {/* Main Content: Product Grid */}
          <main className="flex-grow">
            {/* Header Section */}
            <div className="mb-8 px-6 sm:px-8 md:px-12 lg:px-16 pt-12 md:pt-12">
              <h1 className="text-[20px] sm:text-[26px] md:text-[32px] leading-[0.95] tracking-[-0.02em] text-obsidian-black uppercase font-sans font-bold mb-4">
                {selectedCategory ? selectedCategory.name : "All Products"}
              </h1>
         
              {/* Functional Filter and Sort Bar */}
              <ShopControls categories={categories} totalProducts={activeProducts.length} />
            </div>

            <div className="pb-16 w-full">
              {activeProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border-t border-[#e5e7eb] w-full">
                  {activeProducts.map((product) => (
                    <ProductCard key={product._id} product={product} quickViewType="modal" />
                  ))}
                </div>
              ) : (
                <div className="mx-6 sm:mx-8 md:mx-12 lg:mx-16 py-20 border border-[#a89d7e]/30 rounded-[16px] text-center bg-mist-gray/30">
                  <p className="text-obsidian-black font-medium text-[15px] mb-2">No products found</p>
                  <p className="text-iron-gray text-[13px]">
                    We currently don&apos;t have any active products in this category.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Right Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0" />
      </div>
    </div>
  );
}
