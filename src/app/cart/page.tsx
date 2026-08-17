"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartRedirectPage() {
  const router = useRouter();
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    setIsCartOpen(true);
    router.replace("/");
  }, [router, setIsCartOpen]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-pure-white">
      <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin text-obsidian-black"></div>
    </div>
  );
}
