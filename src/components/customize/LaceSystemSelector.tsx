"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Product } from "@/services/api";
import { SelectedLaceSystem } from "./WigBuilder";
import SearchableCombobox, { ComboboxOption } from "../ui/SearchableCombobox";
import { FiTrash2 } from "react-icons/fi";

interface LaceSystemSelectorProps {
  options: Product[];
  selected: SelectedLaceSystem;
  onChange: (selection: SelectedLaceSystem) => void;
}

export default function LaceSystemSelector({ options, selected, onChange }: LaceSystemSelectorProps) {
  const [filterType, setFilterType] = useState<"all" | "closure" | "frontal">("all");

  const comboboxOptions: ComboboxOption[] = useMemo(() => {
    const list: ComboboxOption[] = [];
    options.forEach(product => {
      // Determine if it's a closure or frontal (naively by name for now, or assume it's just lace systems)
      const isClosure = product.name.toLowerCase().includes("closure");
      const isFrontal = product.name.toLowerCase().includes("frontal");
      
      if (filterType === "closure" && !isClosure) return;
      if (filterType === "frontal" && !isFrontal) return;

      product.variants.forEach(variant => {
        if (!variant.isActive) return;
        
        const variantName = [variant.length, variant.laceType].filter(Boolean).join(' - ') || "Standard";
        
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
  }, [options, filterType]);

  const handleSelect = (option: ComboboxOption) => {
    onChange({
      product: option.data.product,
      variantSku: option.data.variantSku
    });
  };

  if (!options || options.length === 0) {
    return (
      <div className="p-8 md:p-12 border-b border-[#a89d7e]/30">
        <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black mb-2">1. Lace System</h2>
        <p className="text-iron-gray text-[12px] uppercase tracking-widest font-mono mt-4">No lace systems available.</p>
      </div>
    );
  }

  // Display selected item if we have one
  if (selected) {
    const selectedVariant = selected.product.variants.find(v => v.sku === selected.variantSku);
    const variantName = [selectedVariant?.length, selectedVariant?.laceType].filter(Boolean).join(' - ') || "Standard";
    const imageSrc = selected.product.thumbnail?.url || selected.product.images?.[0]?.url || "/products.jpg";

    return (
      <div className="p-8 md:p-12 border-b border-[#a89d7e]/30 bg-[#F8F5ED]">
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black">
            1. Lace System <span className="text-champagne-gold ml-2">✓</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-pure-white border border-concrete-gray rounded-[4px]">
          <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-[2px] overflow-hidden">
            <Image src={imageSrc} alt={selected.product.name} fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-grow">
            <h3 className="text-obsidian-black text-[14px] font-mono font-bold tracking-widest uppercase leading-tight line-clamp-1">
              {selected.product.name}
            </h3>
            <p className="text-iron-gray text-[12px] font-mono mt-1">
              {variantName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[14px] font-sans font-bold text-obsidian-black">
              ${selectedVariant?.price.toFixed(2)}
            </span>
            <button 
              onClick={() => onChange(null)}
              className="text-[10px] font-mono uppercase tracking-widest text-iron-gray hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <FiTrash2 /> Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 border-b border-[#a89d7e]/30">
      <div className="mb-6">
        <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black mb-2">
          1. Lace System <span className="text-champagne-gold">*</span>
        </h2>
        <p className="text-iron-gray text-[14px] font-sans">Select a closure or frontal for your wig foundation.</p>
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="flex gap-2">
          {["all", "closure", "frontal"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as "all" | "closure" | "frontal")}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-full transition-colors border
                ${filterType === type 
                  ? "bg-obsidian-black text-pure-white border-obsidian-black" 
                  : "bg-pure-white text-iron-gray border-concrete-gray hover:border-obsidian-black hover:text-obsidian-black"
                }`}
            >
              {type === "all" ? "All" : type + "s"}
            </button>
          ))}
        </div>

        <SearchableCombobox 
          options={comboboxOptions}
          placeholder="Search for a lace system..."
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
