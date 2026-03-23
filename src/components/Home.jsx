import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-scroll";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen bg-black flex items-center justify-center px-6 md:px-20"
    >
      <div className="max-w-5xl w-full mx-auto text-center md:text-left">

        {/* Top small text */}
        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
          <span className="w-10 md:w-14 h-1 rounded bg-gradient-to-r from-cyan-400 to-green-400"></span>
          <p className="text-xs md:text-sm tracking-widest text-blue-500 font-semibold">
            WELCOME TO MY PORTFOLIO
          </p>
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200 mb-6">
          Muhammadhu Aadhil
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto md:mx-0">
          A passionate B.E CSE student crafting innovative web experiences
          with React, JavaScript, and creative problem-solving.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6">

          {/* Explore Work */}
          <Link
            to="projects"
            smooth
            duration={500}
            offset={-80}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-black
              bg-gradient-to-r from-blue-600 to-green-400 hover:scale-105 transition cursor-pointer w-full sm:w-auto"
          >
            Explore My Work
            <ArrowRight size={18} />
          </Link>

          {/* Contact */}
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-80}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium
              text-green-400 border border-green-400 hover:bg-green-400 hover:text-black transition cursor-pointer w-full sm:w-auto"
          >
            Get in Touch
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Home;