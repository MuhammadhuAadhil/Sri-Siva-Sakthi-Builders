import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const successMessage = location.state?.message || "";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) navigate("/", { replace: true });
    });

    return () => unsub();
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch(() => {
        setLoading(false);
        setErr("Invalid email or password");
      });
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErr("");
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (error) {
      setLoading(false);
      setErr("Google login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-24 pb-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-14">
          <h2 className="text-4xl font-bold mb-2 text-black">Login</h2>

          <p className="text-gray-600 text-sm mb-8">
            Login to continue with Sri Siva Sakthi Builders.
          </p>

          <form onSubmit={handleLogin}>
            {successMessage && (
              <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm mb-5">
                {successMessage}
              </p>
            )}

            <div className="flex items-center border border-gray-300 rounded-lg mb-5 px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400">
              <Mail className="text-yellow-600 mr-3" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-black placeholder-gray-400"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg mb-5 px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400 relative">
              <Lock className="text-yellow-600 mr-3" size={20} />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-black placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 cursor-pointer text-gray-600"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {err && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
                {err}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-xs uppercase tracking-widest text-gray-500">
                Or
              </span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              {/* Google Logo */}
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />

              <span className="text-sm md:text-base">
                {loading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>

            <p
              onClick={() => navigate("/signup")}
              className="text-sm text-gray-700 mt-5 cursor-pointer hover:text-yellow-600"
            >
              Don&apos;t have an account? Create one
            </p>
          </form>
        </div>

        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6"
            alt="modern house"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute bottom-10 left-8 right-8 text-white">
            <div className="bg-black/40 backdrop-blur-sm p-5 rounded-lg">
              <p className="text-base font-medium">
                We build strong foundations for your dream projects with quality and trust.
              </p>
              <p className="mt-3 text-sm text-yellow-400 font-semibold">
                Sri Siva Sakthi Builders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
