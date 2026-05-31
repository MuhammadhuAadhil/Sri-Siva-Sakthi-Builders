
import React from "react";

function Services() {
  const services = [
    { title: "Construction Work", desc: "End-to-end execution of all types of civil construction projects.", icon: "construction" },
    { title: "Residential", desc: "Luxury villas and residential apartments.", icon: "home" },
    { title: "Commercial", desc: "Office spaces and retail complexes.", icon: "apartment" },
    { title: "Industrial", desc: "Marriage halls and factory setups.", icon: "factory" },
    { title: "DTCP Approval", desc: "Legal approvals made easy.", icon: "edit_square" },
    { title: "Elevation Design", desc: "2D & 3D design visualization.", icon: "view_in_ar" },
    { title: "Vasthu Planning", desc: "Traditional + modern balance.", icon: "compass_calibration" },
    { title: "Real Estate", desc: "Buying & selling consultation.", icon: "real_estate_agent" },
  ];

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-gray-50 text-black px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-yellow-600 tracking-widest text-xs sm:text-sm uppercase block mb-3">
            Our Expertise
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold">
            Comprehensive Solutions
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl group hover:shadow-2xl hover:-translate-y-2 transition-transform duration-500"
            >
              {/* ICON */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg bg-yellow-100 mb-5 group-hover:bg-yellow-500 transition-colors duration-300">
                <span className="material-symbols-outlined text-yellow-600 text-3xl sm:text-4xl group-hover:text-black transition-colors duration-300">
                  {service.icon}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Services;