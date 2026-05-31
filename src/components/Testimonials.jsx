import React from "react";

function Testimonials() {
  const testimonials = [
    {
      text: "Choosing Sri Siva Sakthi Builders was the best decision for our home. Attention to detail gave us peace of mind.",
      name: "R. Meenakshi",
      role: "Homeowner",
    },
    {
      text: "The commercial complex exceeded expectations in quality and timely delivery. Highly professional team.",
      name: "S. Vignesh",
      role: "Developer",
    },
    {
      text: "From approval to final design, everything was smooth and transparent. Highly recommended.",
      name: "Dr. Anbarasan",
      role: "Client",
    },
  ];

  return (
    <section id="testimonials" className="py-28 bg-black px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-20">
          <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Client Voices
          </span>
          <h2 className="text-white font-headline text-3xl sm:text-4xl md:text-5xl font-bold">
            Built on Trust
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                bg-gradient-to-b from-[#0b1f3a] to-[#050b18]
                p-8 sm:p-10 rounded-xl
                border-t-4 border-yellow-500
                shadow-lg shadow-yellow-500/10
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-yellow-500/30
                flex flex-col justify-between
              "
            >
              {/* QUOTE ICON */}
              <div className="mb-4">
                <span className="material-symbols-outlined text-yellow-500 text-5xl">
                  format_quote
                </span>
              </div>

              {/* TEXT */}
              <p className="text-gray-300 italic text-base sm:text-lg mb-6 leading-relaxed">
                "{item.text}"
              </p>

              {/* USER */}
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.role}</p>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/maps/place/Sri+siva+sakthi+Builder's/@10.9713575,79.4019307,17z/data=!4m8!3m7!1s0x3a55334c4e97bff1:0x5956f70ffd562ad9!8m2!3d10.9713575!4d79.4045056!9m1!1b1!16s%2Fg%2F11rd9w3g4b!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
          >
            View Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;