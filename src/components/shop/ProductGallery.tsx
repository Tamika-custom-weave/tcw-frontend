"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/services/api";

interface ProductGalleryProps {
  productName: string;
  images: ProductImage[];
  thumbnail?: ProductImage;
}

export default function ProductGallery({ productName, images, thumbnail }: ProductGalleryProps) {
  // Prefer the explicitly set thumbnail image, then fallback to first gallery image
  const defaultImage = thumbnail?.url || images?.[0]?.url || "/products.jpg";
  const [mainImage, setMainImage] = useState(defaultImage);

  // Combine thumbnail and images for the gallery strip
  const allImages = [];
  if (thumbnail) allImages.push(thumbnail);
  if (images && images.length > 0) allImages.push(...images);

  return (
    <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#a89d7e]/30 flex flex-col">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/5] bg-mist-gray">
        <Image
          src={mainImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>
      
      {/* Thumbnails (if multiple images) */}
      {allImages.length > 1 && (
        <div className="flex border-t border-[#a89d7e]/30 overflow-x-auto snap-x scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={img.publicId || idx}
              onClick={() => setMainImage(img.url)}
              className={`relative w-24 sm:w-32 aspect-square flex-shrink-0 border-r border-[#a89d7e]/30 snap-start cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-champagne-gold ${
                mainImage === img.url ? "opacity-100 ring-2 ring-inset ring-champagne-gold" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`${productName} view ${idx + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
