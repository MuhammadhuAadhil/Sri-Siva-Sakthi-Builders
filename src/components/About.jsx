import React from "react";
import FounderImage from "../assets/Founder.jpeg";

function About() {
  return (
    <section id="about" className="bg-white text-black py-20 sm:py-28 px-6 md:px-20 font-body">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Image */}
        <div className="relative w-full">
          <div className="absolute -inset-3 border border-gray-200 rounded-lg"></div>

          <img
            src={FounderImage}
            alt="Founder"
            className="relative z-10 w-full aspect-[4/5] object-cover grayscale rounded-lg shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">

          {/* Tag */}
          <span className="text-yellow-600 text-xs sm:text-sm tracking-widest uppercase">
            About Us
          </span>

          {/* Title */}
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
            Er. Karthick <br /> Gopalakrishnan
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg md:text-lg leading-relaxed max-w-xl">
            At Sri Siva Sakthi Builders, we don’t just build structures; we manifest dreams.
            Under expert leadership, we deliver precision-engineered excellence across projects.
          </p>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="material-symbols-outlined text-yellow-600 text-2xl">rocket_launch</span>
              <div>
                <h4 className="text-yellow-600 font-semibold mb-2">Mission</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Deliver high-quality construction with trust, durability, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="material-symbols-outlined text-yellow-600 text-2xl">visibility</span>
              <div>
                <h4 className="text-yellow-600 font-semibold mb-2">Vision</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Become a leading brand known for innovation, quality, and reliability.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="pt-6 border-t border-gray-200">
            <h5 className="text-gray-500 text-xs sm:text-sm tracking-widest mb-6 uppercase">
              Why Choose Us
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 sm:gap-3 hover:text-yellow-600 transition">
                <span className="material-symbols-outlined text-yellow-600 text-lg sm:text-xl">engineering</span>
                EXPERIENCED ENGINEERS
              </div>

              <div className="flex items-center gap-2 sm:gap-3 hover:text-yellow-600 transition">
                <span className="material-symbols-outlined text-yellow-600 text-lg sm:text-xl">schedule</span>
                ON-TIME DELIVERY
              </div>

              <div className="flex items-center gap-2 sm:gap-3 hover:text-yellow-600 transition">
                <span className="material-symbols-outlined text-yellow-600 text-lg sm:text-xl">payments</span>
                TRANSPARENT PRICING
              </div>

              <div className="flex items-center gap-2 sm:gap-3 hover:text-yellow-600 transition">
                <span className="material-symbols-outlined text-yellow-600 text-lg sm:text-xl">verified</span>
                QUALITY MATERIALS
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;