import React from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Discuss your desired look, length, and texture with our experts."
  },
  {
    number: "02",
    title: "Customization",
    description: "We carefully construct and customize your unit or bundles to your exact specifications."
  },
  {
    number: "03",
    title: "Installation",
    description: "Experience our signature seamless melt and flawless styling in a luxury setting."
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-4">
            The TCW Experience
          </h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            A seamless journey from selection to installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-300 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <span className="font-serif text-2xl text-brand-gold">{step.number}</span>
              </div>
              <h3 className="font-serif text-xl text-brand-black mb-3">{step.title}</h3>
              <p className="text-gray-600 font-light px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
