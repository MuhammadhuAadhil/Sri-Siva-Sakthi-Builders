import React from "react";
import { Link } from "react-scroll";
import logo from "../assets/logo.png";
import home from "../assets/Home.jpeg";

function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={home}
          alt="Building"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/60 md:bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 sm:px-8 md:px-12 flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="SSS Builders Logo"
          className="w-24 h-auto mb-6 sm:w-28 md:w-32"
        />

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-4 drop-shadow-lg leading-tight">
          Sri Siva Sakthi Builders
        </h1>

        {/* Tagline */}
        <p className="text-white italic text-lg sm:text-xl md:text-2xl mb-6 drop-shadow-md">
          "Building Homes, Crafting Memories"
        </p>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
          We specialize in high-quality residential and commercial construction,
          delivering excellence, durability, and modern design.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="contact"
            smooth
            duration={500}
            offset={0}
            className="bg-yellow-400 text-black px-8 py-4 font-semibold tracking-widest rounded-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transform transition"
          >
            REQUEST A QUOTE
          </Link>

          <Link
            to="projects"
            smooth
            duration={500}
            offset={0}
            className="border border-yellow-400 text-yellow-400 px-8 py-4 font-semibold tracking-widest rounded-lg shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transform transition"
          >
            VIEW PROJECTS
          </Link>
        </div>
      </div>

      {/* Optional: subtle bottom gradient */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
    </section>
  );
}

export default Home;