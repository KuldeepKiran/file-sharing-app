import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Normal Login
  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }, 500);
  };

  // ✅ Google Login (dummy)
  const handleGoogleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100">

      {/* Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Sign in to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email address"
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-600 cursor-pointer">
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;