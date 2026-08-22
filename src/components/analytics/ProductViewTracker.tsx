"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { Product } from "@/services/api";

interface ProductViewTrackerProps {
  product: Product;
}

export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  const hasTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!product || hasTrackedRef.current === product._id) {
      return;
    }

    // Calculate minimum price for the view_item event as a fallback
    const minPrice = product.variants?.length > 0 
      ? Math.min(...product.variants.map((v) => v.price)) 
      : 0;

    // Fire the GA4 view_item event
    sendGAEvent("event", "view_item", {
      currency: "USD",
      value: minPrice,
      items: [
        {
          item_id: product._id,
          item_name: product.name,
          item_category: product.category?.name || "Uncategorized",
          price: minPrice,
        },
      ],
    });

    hasTrackedRef.current = product._id;
  }, [product]);

  return null;
}
