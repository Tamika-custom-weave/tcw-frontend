import React from "react";

const testimonials = [
  {
    name: "Sarah J.",
    review: "The quality is absolutely unmatched. I've had my bundles for over a year and they still look and feel brand new.",
  },
  {
    name: "Michelle T.",
    review: "Tamika's installation service is a game changer. The melt is so seamless, no one believes it's a wig!",
  },
  {
    name: "Chloe R.",
    review: "From the packaging to the hair itself, everything about TCW screams luxury. A customer for life.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-gold mb-4">
            Client Love
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex text-brand-gold mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 font-light italic mb-8 leading-relaxed">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
              <p className="font-sans text-xs tracking-[0.1em] uppercase text-gray-400">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
