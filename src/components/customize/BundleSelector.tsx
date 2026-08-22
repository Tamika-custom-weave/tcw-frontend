"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Product } from "@/services/api";
import { SelectedBundle } from "./WigBuilder";
import SearchableCombobox, { ComboboxOption } from "../ui/SearchableCombobox";
import { FiTrash2 } from "react-icons/fi";

interface BundleSelectorProps {
  options: Product[];
  selected: SelectedBundle[];
  onChange: (bundles: SelectedBundle[]) => void;
}

export default function BundleSelector({ options, selected, onChange }: BundleSelectorProps) {
  const comboboxOptions: ComboboxOption[] = useMemo(() => {
    const list: ComboboxOption[] = [];
    options.forEach(product => {
      product.variants.forEach(variant => {
        if (!variant.isActive) return;
        
        const variantName = [variant.length, variant.texture].filter(Boolean).join(' - ') || "Standard";
        
        list.push({
          id: `${product._id}_${variant.sku}`,
          label: `${product.name} - ${variantName}`,
          subLabel: product.shortDescription,
          price: variant.price,
          image: product.thumbnail?.url || product.images?.[0]?.url || "/products.jpg",
          data: { product, variantSku: variant.sku }
        });
      });
    });
    return list;
  }, [options]);

  const handleSelect = (option: ComboboxOption) => {
    const { product, variantSku } = option.data;
    
    const existingIndex = selected.findIndex(b => b.product._id === product._id && b.variantSku === variantSku);
    
    const newSelected = [...selected];
    
    if (existingIndex >= 0) {
      newSelected[existingIndex] = { ...newSelected[existingIndex], quantity: newSelected[existingIndex].quantity + 1 };
    } else {
      newSelected.push({ product, variantSku, quantity: 1 });
    }
    
    onChange(newSelected);
  };

  const handleUpdateQuantity = (product: Product, variantSku: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    const existingIndex = selected.findIndex(b => b.product._id === product._id && b.variantSku === variantSku);
    const newSelected = [...selected];
    
    if (existingIndex >= 0) {
      if (newQuantity === 0) {
        newSelected.splice(existingIndex, 1);
      } else {
        newSelected[existingIndex] = { ...newSelected[existingIndex], quantity: newQuantity };
      }
    }
    
    onChange(newSelected);
  };

  if (!options || options.length === 0) {
    return (
      <div className="p-8 md:p-12 border-b border-[#a89d7e]/30">
        <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black mb-2">2. Bundles</h2>
        <p className="text-iron-gray text-[12px] uppercase tracking-widest font-mono mt-4">No bundles available.</p>
      </div>
    );
  }

  const totalBundlesCount = selected.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="p-8 md:p-12 border-b border-[#a89d7e]/30">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black mb-2">
            2. Bundles <span className="text-champagne-gold">*</span>
          </h2>
          <p className="text-iron-gray text-[14px] font-sans">Search and add 2-4 bundles for your wig.</p>
        </div>
        {totalBundlesCount > 0 && (
          <button 
            onClick={() => onChange([])}
            className="text-[10px] font-mono uppercase tracking-widest text-iron-gray hover:text-obsidian-black transition-colors"
          >
            Clear All ({totalBundlesCount})
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-xl">
        <SearchableCombobox 
          options={comboboxOptions}
          placeholder="Search for bundles by length or texture..."
          onSelect={handleSelect}
        />

        {selected.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-2">Selected Bundles:</h3>
            {selected.map((bundle) => {
              const variant = bundle.product.variants.find(v => v.sku === bundle.variantSku);
              const variantName = [variant?.length, variant?.texture].filter(Boolean).join(' - ') || "Standard";
              const imageSrc = bundle.product.thumbnail?.url || bundle.product.images?.[0]?.url || "/products.jpg";
              const price = variant?.price || 0;

              return (
                <div key={`${bundle.product._id}_${bundle.variantSku}`} className="flex items-center gap-4 p-3 bg-[#F8F5ED] border border-champagne-gold rounded-[4px]">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-[2px] overflow-hidden">
                    <Image src={imageSrc} alt={bundle.product.name} fill sizes="48px" className="object-cover" />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-obsidian-black text-[12px] font-mono font-bold tracking-widest uppercase leading-tight line-clamp-1">
                      {bundle.product.name}
                    </h4>
                    <p className="text-iron-gray text-[11px] font-mono mt-0.5">
                      {variantName} &bull; ${(price * bundle.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 bg-pure-white border border-concrete-gray rounded-full px-2 py-1">
                    <button 
                      onClick={() => handleUpdateQuantity(bundle.product, bundle.variantSku, bundle.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-iron-gray hover:text-obsidian-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold rounded-sm"
                      aria-label="Decrease quantity"
                    >
                      <span className="text-[14px] leading-none">-</span>
                    </button>
                    <span className="text-[11px] font-mono font-bold w-4 text-center select-none">
                      {bundle.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(bundle.product, bundle.variantSku, bundle.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-iron-gray hover:text-obsidian-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold rounded-sm"
                      aria-label="Increase quantity"
                    >
                      <span className="text-[12px] leading-none">+</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => handleUpdateQuantity(bundle.product, bundle.variantSku, 0)}
                    className="ml-2 text-iron-gray hover:text-red-600 transition-colors p-1"
                    aria-label="Remove bundle"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
