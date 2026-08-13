"use client";

import React, { useState, useEffect } from "react";
import { CustomWigOptionsResponse, calculateCustomWigPrice, createCustomWig, Product } from "@/services/api";
import LaceSystemSelector from "./LaceSystemSelector";
import BundleSelector from "./BundleSelector";
import SizeAndStyleSelector from "./SizeAndStyleSelector";
import SummaryPanel from "./SummaryPanel";
import { useCart } from "@/context/CartContext";

interface WigBuilderProps {
  options: CustomWigOptionsResponse;
}

export type SelectedLaceSystem = {
  product: Product;
  variantSku: string;
} | null;

export type SelectedBundle = {
  product: Product;
  variantSku: string;
  quantity: number;
};

interface ExtendedWigBuilderProps extends WigBuilderProps {
  onClose?: () => void;
}

export default function WigBuilder({ options, onClose }: ExtendedWigBuilderProps) {
  const { addToCart } = useCart();

  // State
  const [laceSystem, setLaceSystem] = useState<SelectedLaceSystem>(null);
  const [bundles, setBundles] = useState<SelectedBundle[]>([]);
  const [headSize, setHeadSize] = useState<string>("");
  const [wigStyle, setWigStyle] = useState<string>("");
  
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Derive hair length from the longest bundle
  const computedHairLength = React.useMemo(() => {
    let max = 0;
    bundles.forEach(b => {
      const variant = b.product.variants.find(v => v.sku === b.variantSku);
      if (variant && variant.length) {
        const match = variant.length.match(/\d+/);
        if (match) {
          const num = parseInt(match[0], 10);
          if (num > max) max = num;
        }
      }
    });
    return max > 0 ? `${max}` : "Auto";
  }, [bundles]);

  // Debounced price calculation
  useEffect(() => {
    const calculatePrice = async () => {
      // Need at least one bundle or a lace system to calculate > 0 price (or handle empty state)
      if (!laceSystem && bundles.length === 0) {
        setTotalPrice(0);
        return;
      }

      setIsCalculatingPrice(true);
      
      const payload = {
        laceSystem: laceSystem ? { product: laceSystem.product._id, variantSku: laceSystem.variantSku } : null,
        bundles: bundles.map(b => ({ product: b.product._id, variantSku: b.variantSku, quantity: b.quantity }))
      };

      const price = await calculateCustomWigPrice(payload);
      if (price !== null) {
        setTotalPrice(price);
      }
      
      setIsCalculatingPrice(false);
    };

    const timer = setTimeout(() => {
      calculatePrice();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [laceSystem, bundles]);

  const isValid = !!laceSystem && bundles.length > 0 && !!headSize && !!wigStyle;

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    setError(null);

    const payload = {
      laceSystem: laceSystem ? { product: laceSystem.product._id, variantSku: laceSystem.variantSku } : null,
      bundles: bundles.map(b => ({ product: b.product._id, variantSku: b.variantSku, quantity: b.quantity })),
      headSize,
      hairLength: computedHairLength,
      wigStyle
    };

    const wigId = await createCustomWig(payload);
    
    if (wigId) {
      const added = await addToCart({
        itemType: "CUSTOM_WIG",
        customWig: wigId,
        quantity: 1
      });
      
      setIsSubmitting(false);
      
      if (added) {
        if (onClose) {
          onClose();
        }
      } else {
        setError("Failed to add your custom wig to the cart. Please try again.");
      }
    } else {
      setIsSubmitting(false);
      setError("Failed to save your custom wig configuration. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full relative h-full">
      {/* Left Column: Interactive Selectors */}
      <div className="flex-grow w-full lg:w-2/3 border-r border-[#a89d7e]/30 pb-16">
        <LaceSystemSelector 
          options={options.laceSystems} 
          selected={laceSystem} 
          onChange={setLaceSystem} 
        />
        <BundleSelector 
          options={options.bundles} 
          selected={bundles} 
          onChange={setBundles} 
        />
        <SizeAndStyleSelector 
          headSizes={options.headSizes} 
          wigStyles={options.wigStyles}
          headSize={headSize} 
          onChangeHeadSize={setHeadSize}
          wigStyle={wigStyle} 
          onChangeWigStyle={setWigStyle}
        />
      </div>

      {/* Right Column: Summary Panel */}
      <div className="w-full lg:w-1/3 bg-gray-50 border-t lg:border-t-0 border-[#a89d7e]/30">
        <div className="sticky top-0 max-h-[100dvh] overflow-y-auto">
          <SummaryPanel 
            laceSystem={laceSystem}
            bundles={bundles}
            headSize={headSize}
            hairLength={computedHairLength}
            wigStyle={wigStyle}
            totalPrice={totalPrice}
            isCalculating={isCalculatingPrice}
            isSubmitting={isSubmitting}
            isValid={isValid}
            error={error}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
