import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [log, setLog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo;

    if (location.pathname === "/" && scrollTarget) {
      setTimeout(() => {
        scroller.scrollTo(scrollTarget, {
          smooth: true,
          duration: 500,
          offset: 0,
        });
      }, 100);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.pathname, location.state]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLog(!!user);
    });
    return () => unsub();
  }, []);

  const logout = () => {
    signOut(auth);
    setMenuOpen(false);
    navigate("/login");
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const goToSection = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: 0,
    });
  };

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[9999] bg-black backdrop-blur-lg border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => goToSection("home")}
          >
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <h1 className="text-yellow-400 text-sm md:text-lg font-bold text-left">
              Sri Siva Sakthi Builders
            </h1>
          </button>

          <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {links.map((item) => (
              <li key={item.id} className="relative group">
                <button
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className="cursor-pointer pb-2 hover:text-yellow-400 transition bg-transparent"
                >
                  {item.label}
                </button>
                <span className="absolute left-0 top-6 h-[2px] w-0 bg-yellow-400 group-hover:w-full transition-all duration-500"></span>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Get a Quote
            </button>

            {log ? (
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={goToLogin}
                className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-black transition"
              >
                Login
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-yellow-400"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-black/95 backdrop-blur-lg z-[9999] transform transition-all duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-yellow-500">
          <h2 className="text-yellow-400 font-bold">Menu</h2>
          <button
            type="button"
            className="text-yellow-400"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <ul className="flex flex-col gap-3 p-6">
          {links.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToSection(item.id)}
                className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="px-6 mt-4 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="block text-center py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Get a Quote
          </button>

          {log ? (
            <button
              type="button"
              onClick={logout}
              className="border border-yellow-500 text-yellow-400 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={goToLogin}
              className="border border-yellow-500 text-yellow-400 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
