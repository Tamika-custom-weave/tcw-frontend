import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { fetchProductBySlug } from "@/services/api";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductSelectors from "@/components/shop/ProductSelectors";
import ProductViewTracker from "@/components/analytics/ProductViewTracker";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product || !product.isActive) {
    return {
      title: "Product Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const productImage = product.thumbnail?.url || product.images?.[0]?.url;

  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at Tamika Custom Weave.`,
    openGraph: {
      title: product.name,
      description: product.description || `Buy ${product.name} at Tamika Custom Weave.`,
      url: `https://www.tamikascustomweaves.com/product/${product.slug}`,
      images: productImage ? [{ url: productImage }] : previousImages,
    },
    alternates: {
      canonical: `https://www.tamikascustomweaves.com/product/${product.slug}`,
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const defaultImage = product.thumbnail?.url || product.images?.[0]?.url || "https://www.tamikascustomweaves.com/products.jpg";
  const minPrice = product.variants?.length > 0 
    ? Math.min(...product.variants.map(v => v.price)) 
    : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: defaultImage,
    description: product.description || `Buy ${product.name} at Tamika Custom Weave.`,
    sku: product._id,
    offers: {
      "@type": "AggregateOffer",
      url: `https://www.tamikascustomweaves.com/product/${product.slug}`,
      priceCurrency: "USD",
      lowPrice: minPrice,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Tamika Custom Weave",
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-pure-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb / Top Bar */}
      <div className="w-full border-b border-[#a89d7e]/30 py-4 px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono font-medium text-iron-gray">
          <Link href="/" className="hover:text-obsidian-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-obsidian-black transition-colors">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-obsidian-black transition-colors">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-obsidian-black">{product.name}</span>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto">
        
        {/* Left Column: Image Gallery (Client Component) */}
        <ProductGallery 
          productName={product.name} 
          images={product.images} 
          thumbnail={product.thumbnail} 
        />

        {/* Right Column: Product Details */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[0.95] tracking-[-0.02em] text-obsidian-black uppercase font-sans font-bold mb-4 break-words">
            {product.name}
          </h1>
          
          <ProductSelectors product={product} />

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm max-w-none text-iron-gray">
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-4">
                Description
              </h3>
              <p className="whitespace-pre-line text-[14px] leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Invisible analytics tracker */}
      <ProductViewTracker product={product} />
    </div>
  );
}
