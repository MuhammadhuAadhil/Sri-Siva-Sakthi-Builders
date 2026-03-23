import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <p className="text-sm sm:text-base text-gray-400">
          © {new Date().getFullYear()} Muhammadhu Aadhil. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;