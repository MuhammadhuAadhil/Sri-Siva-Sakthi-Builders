import React from "react";
import { Phone, MessageCircle } from "lucide-react";

function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* Call Button */}
      <a
        href="tel:7904677393"
        className="w-12 h-12 flex items-center justify-center 
                   rounded-xl bg-yellow-400 text-black 
                   shadow-xl hover:scale-110 active:scale-95 
                   transition duration-200"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917904677393"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center 
                   rounded-xl bg-green-500 text-white 
                   shadow-xl hover:scale-110 active:scale-95 
                   transition duration-200"
      >
        <MessageCircle size={20} />
      </a>

    </div>
  );
}

export default FloatingButtons;