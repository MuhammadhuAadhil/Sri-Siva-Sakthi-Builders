import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });

    return () => unsub();
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);

        if (error.code === "auth/invalid-credential") {
          setErr("Invalid email or password");
        } else if (error.code === "auth/user-not-found") {
          setErr("User not found");
        } else {
          setErr("Something went wrong. Try again.");
        }
      });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-6 bg-black">
      
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 z-50 flex items-center gap-2 
                   px-4 py-2 rounded-full 
                   bg-black/70 backdrop-blur
                   border border-white/20 
                   text-white hover:text-blue-400 
                   hover:border-blue-500 transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 sm:p-10 rounded-2xl 
                   bg-black border border-blue-900 
                   shadow-[0_0_40px_rgba(30,64,175,0.25)]"
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Login
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-blue-500 mb-6 sm:mb-8"></div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-400 mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg
                       bg-black text-white
                       border border-blue-900
                       focus:outline-none focus:border-blue-500
                       focus:ring-2 focus:ring-blue-600/40"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-400 mb-2 text-sm">
            Password
          </label>

          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg
                       bg-black text-white
                       border border-blue-900
                       focus:outline-none focus:border-blue-500
                       focus:ring-2 focus:ring-blue-600/40"
          />

          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-10 cursor-pointer text-gray-400"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Error */}
        {err && (
          <p className="text-red-500 text-sm my-3 text-center">
            {err}
          </p>
        )}

        {/* Signup */}
        <p
          className="text-blue-400 text-sm cursor-pointer my-4 hover:underline text-center"
          onClick={() => navigate("/signup")}
        >
          New user? Register here
        </p>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 rounded-lg font-semibold text-white
                     bg-blue-600 hover:bg-blue-700
                     transition-all duration-300 disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;