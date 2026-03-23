import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../config/firebase";

function Navbar() {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setLog(!!user);
    });
    return () => unsub();
  }, []);

  function logout() {
    signOut(auth);
    navigate("/login");
  }

  const activeClass =
    "px-4 py-1.5 rounded-full border border-blue-600 text-blue-400 bg-blue-900/40";
  const normalClass =
    "text-gray-400 hover:text-white px-4 py-1.5 cursor-pointer";

  const links = ["home", "about", "experience", "projects", "skills", "contact"];

  return (
    <div className="fixed top-0 left-0 w-full h-16 sm:h-20 px-6 md:px-10 flex items-center justify-between bg-black/80 backdrop-blur border-b border-white/10 z-50">

      {/* Logo */}
      <h1 className="text-xl sm:text-2xl font-semibold text-blue-500 cursor-pointer">
        MA
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-2 text-sm font-medium">
        {links.map((item) => (
          <Link
            key={item}
            to={item}
            smooth
            duration={500}
            offset={-80}
            spy={true}
            activeClass={activeClass}
            className={normalClass}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </ul>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5 text-gray-400">

        {/* Social Icons */}
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <Github className="w-5 h-5 hover:text-white transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
        </a>
        <a href="mailto:test@gmail.com">
          <Mail className="w-5 h-5 hover:text-green-400 transition" />
        </a>

        {/* Auth Button (Desktop only) */}
        {log ? (
          <button
            onClick={logout}
            className="hidden md:block px-4 py-1.5 rounded-full border border-blue-500 hover:bg-blue-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block px-4 py-1.5 rounded-full border border-blue-500 hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-white/10 md:hidden">
          <ul className="flex flex-col items-center py-6 gap-4 text-gray-300">
            {links.map((item) => (
              <Link
                key={item}
                to={item}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            {/* Auth button mobile */}
            {log ? (
              <button
                onClick={logout}
                className="mt-4 px-4 py-2 border border-blue-500 rounded-full"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-4 py-2 border border-blue-500 rounded-full"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;