import Link from "next/link";
import React from "react";

const collections = [
  {
    title: "Raw Bundles",
    description: "Silky, voluminous, and pure.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1780&auto=format&fit=crop",
    link: "/shop/bundles"
  },
  {
    title: "Lace Closures",
    description: "Flawless finish, natural part.",
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=1964&auto=format&fit=crop",
    link: "/shop/closures"
  },
  {
    title: "HD Frontals",
    description: "Undetectable hairline, ultimate versatility.",
    image: "https://images.unsplash.com/photo-1512496015851-a1cbfc33443a?q=80&w=2012&auto=format&fit=crop",
    link: "/shop/frontals"
  }
];

export default function ShopByCollection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold font-sans tracking-[0.2em] uppercase text-xs mb-2 block">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-black">
              Shop by Collection
            </h2>
          </div>
          <Link href="/shop" className="hidden md:inline-block border-b border-brand-black pb-1 text-sm tracking-wider uppercase hover:text-brand-gold hover:border-brand-gold transition-colors">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link key={index} href={collection.link} className="group relative block overflow-hidden">
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-200">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${collection.image}')` }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-serif text-2xl text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {collection.title}
                </h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {collection.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  <span className="text-white text-xs tracking-widest uppercase border-b border-brand-gold pb-1">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/shop" className="inline-block border-b border-brand-black pb-1 text-sm tracking-wider uppercase hover:text-brand-gold hover:border-brand-gold transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
