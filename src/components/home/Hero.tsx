"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDES = [
  {
    id: 1,
    image: "/hero.jpg",
    objectPosition: "center 20%",
    tag: "The Collection",
    title: "Luxury,\nRedefined",
    subtitle: "Experience the pinnacle of raw extensions and custom craftsmanship.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 2,
    image: "/customization.jpg",
    objectPosition: "center center",
    tag: "Bespoke Wigs",
    title: "Made\nFor You",
    subtitle: "Tailored wig creation built to your exact specifications.",
    buttonText: "Customize Yours",
    buttonLink: "/customize",
  },
  {
    id: 3,
    image: "/products.jpg",
    objectPosition: "center center",
    tag: "Raw Extensions",
    title: "Luxury In\nEvery Strand",
    subtitle: "Unprocessed 100% human hair extensions sourced directly.",
    buttonText: "Shop Hair",
    buttonLink: "/shop",
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="w-full max-w-[1440px] lg:max-w-none mx-auto px-4 md:px-6 lg:px-0 py-4 md:py-6 lg:py-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slider Container */}
      <div className="relative w-full h-[65vh] md:h-[70vh] lg:h-[calc(100vh-84px)] min-h-[480px] lg:min-h-[650px] overflow-hidden lg:rounded-none bg-obsidian-black border border-[#a89d7e]/30 lg:border-x-0 lg:border-t-0">

        {/* Top Segment Progress Bars (Hidden on Big Screens - lg:hidden) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex lg:hidden gap-2 max-w-md mx-auto md:max-w-xl">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden transition-all focus:outline-none cursor-pointer"
            >
              <div
                className={`h-full bg-pure-white transition-all duration-300 ${idx === currentIndex
                    ? "w-full bg-champagne-gold"
                    : idx < currentIndex
                      ? "w-full bg-white/70"
                      : "w-0"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Slides Carousel Wrapper */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative bg-obsidian-black"
            >
              {/* Slide Background Image with custom focal point position */}
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                sizes="100vw"
                priority={idx === 0}
                style={{ objectPosition: slide.objectPosition }}
                className="object-cover opacity-85"
              />

              {/* Dark Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 xl:p-20 z-20 text-pure-white max-w-[1440px] mx-auto w-full">
                <div className="max-w-xl lg:max-w-2xl">
                  <span className="text-champagne-gold text-[11px] lg:text-[12px] leading-none tracking-[0.2em] uppercase font-sans mb-3 lg:mb-4 block">
                    {slide.tag}
                  </span>
                  <h1 className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[64px] xl:text-[72px] leading-[0.97] tracking-[-0.48px] text-pure-white uppercase font-sans mb-4 lg:mb-6 whitespace-pre-line font-medium">
                    {slide.title}
                  </h1>
                  <p className="text-[13px] sm:text-[14px] lg:text-[16px] leading-relaxed text-concrete-gray font-sans max-w-md lg:max-w-lg mb-6 lg:mb-8 font-normal">
                    {slide.subtitle}
                  </p>
                  <div>
                    <Link
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center bg-pure-white text-obsidian-black hover:bg-champagne-gold hover:text-pure-white px-[24px] lg:px-[28px] py-[12px] lg:py-[14px] rounded-full text-[10px] sm:text-[11px] lg:text-[12px] leading-none tracking-[0.05em] uppercase font-sans font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      → {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] hidden lg:flex rounded-full bg-pure-white/20 hover:bg-pure-white hover:text-obsidian-black backdrop-blur-md text-pure-white items-center justify-center transition-all duration-300 focus:outline-none"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-[40px] lg:w-[48px] h-[40px] lg:h-[48px] hidden lg:flex rounded-full bg-pure-white/20 hover:bg-pure-white hover:text-obsidian-black backdrop-blur-md text-pure-white items-center justify-center transition-all duration-300 focus:outline-none"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
