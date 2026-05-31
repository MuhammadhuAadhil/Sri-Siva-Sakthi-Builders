import React from "react";
import logo from "../../assets/logo.png"; // make sure the path is correct

function Footer() {
  return (
    <footer className="w-full px-6 md:px-20 py-16 bg-black text-white">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

       {/* BRAND */}
        <div className="flex flex-col items-start gap-4">
          <img 
            src={logo} 
            alt="SSS Builders Logo" 
            className="w-20 h-20 object-contain"
          />
          <h3 className="text-2xl font-bold leading-snug">
            SRI SIVA SAKTHI <br />
            <span className="text-yellow-500">BUILDERS</span>
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Building dreams with trust, innovation, and excellence. Modern, durable, and elegant structures.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-yellow-500">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-500">About</a></li>
            <li><a href="#services" className="hover:text-yellow-500">Services</a></li>
            <li><a href="#projects" className="hover:text-yellow-500">Projects</a></li>
            <li><a href="#contact" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-yellow-500">
            Services
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Construction Work</li>
            <li>Residential Buildings</li>
            <li>Commercial Projects</li>
            <li>Vasthu Planning</li>
            <li>3D Elevation Design</li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-yellow-500">
            Connect
          </h4>
          <p className="text-gray-400 text-sm mb-6">
            Let’s build your dream project with quality and trust.
          </p>

          <a
            href="https://wa.me/917904677393"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 text-black px-6 py-2 font-bold hover:bg-yellow-400 transition"
          >
            WHATSAPP US
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Sri Siva Sakthi Builders. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;