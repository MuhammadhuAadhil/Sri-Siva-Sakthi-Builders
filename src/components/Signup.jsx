import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Please login to continue." },
      });
    } catch (err) {
      setLoading(false);

      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      setLoading(false);
      setError("Google signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-24 pb-10 flex flex-col items-center justify-center">

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-14">
          <h2 className="text-4xl font-bold mb-2 text-black">Register</h2>

          <p className="text-gray-600 text-sm mb-8">
            Create your account first, then login to continue.
          </p>

          <form onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-black placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 cursor-pointer text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg mb-5 px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400 relative">
              <Lock className="text-yellow-600 mr-3" size={20} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-black placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 cursor-pointer text-gray-600"
                aria-label={
                  showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? "Creating account..." : "Register"}
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
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
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
              onClick={() => navigate("/login")}
              className="text-sm text-gray-700 mt-5 cursor-pointer hover:text-yellow-600"
            >
              Already have an account? Login
            </p>
          </form>
        </div>

        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="luxury villa"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute bottom-10 left-8 right-8 text-white">
            <div className="bg-black/40 backdrop-blur-sm p-5 rounded-lg">
              <p className="text-base font-medium">
                Join us and start building your future with trust and quality.
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

export default Signup;
