import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Share2, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const Payload = {
      email,
      password,
    };

    const success = await handleLogin(Payload);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0B10] text-zinc-100 font-sans flex flex-col selection:bg-purple-500 selection:text-white">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-[#07060A] border-r border-zinc-800/60">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1200&auto=format&fit=crop"
              alt="Abstract AI visualization"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B10] via-transparent to-[#0C0B10]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0B10]/50 to-[#0C0B10]" />
          </div>

          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-0" />

          <div className="relative z-10">
            <span className="text-white font-bold text-2xl tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600" />
              Synthetix AI
            </span>
          </div>

          <div className="relative z-10 mt-auto max-w-md pb-12">
            <h1 className="text-4xl font-bold text-white leading-tight tracking-tight mb-4">
              Welcome back to the future of data.
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              Pick up right where you left off. Access your enterprise models
              and continue generating strategic insights.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
          {/* Mobile Brand Logo (Visible only on mobile/tablet) */}
          <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600" />
            <span className="text-white font-bold text-lg tracking-tight">
              Synthetix AI
            </span>
          </div>

          <div className="w-full max-w-[420px] space-y-8 mt-12 lg:mt-0">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Log In
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                Enter your credentials to access your account.
              </p>

              {/* {error && (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )} */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-[#14121A] border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-zinc-300">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors pointer-events-none" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#14121A] border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-semibold py-3 rounded-lg text-sm transition-all shadow-lg shadow-purple-900/20 active:scale-[0.99] cursor-pointer"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative my-8 flex items-center justify-center">
              <div className="border-b border-zinc-800 w-full" />
              <span className="absolute bg-[#0C0B10] px-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#14121A] border border-zinc-800 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-600 transition active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#14121A] border border-zinc-800 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-600 transition active:scale-[0.99] cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-zinc-400" />
                SSO
              </button>
            </div>

            <p className="text-center text-sm text-zinc-400 pt-4">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                href="#register"
                className="text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
