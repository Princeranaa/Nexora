import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Sparkles,
  Shield,
  Share2,
  Check,
} from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { handleRegister } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <div className="min-h-screen bg-[#0C0B10] text-zinc-100 font-sans flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)]">
        <div className="lg:col-span-5 relative flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-[#07060A] border-b lg:border-b-0 lg:border-r border-zinc-800/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-indigo-950/20 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            <span className="text-white font-bold text-xl tracking-tight">
              Synthetix AI
            </span>
          </div>

          <div className="relative z-10 my-12 lg:my-auto max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Next-Gen Intelligence
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
              Accelerate your team's intelligence.
            </h1>

            <p class="text-zinc-400 text-sm leading-relaxed mb-10">
              Connect your enterprise data to our specialized AI models and
              unlock unparalleled strategic insights in seconds.
            </p>

            <div className="flex items-center gap-10 pt-6 border-t border-zinc-800/80">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  99.9%
                </p>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Uptime SLA
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  ISO
                </p>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  27001 Certified
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative z-10" />
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-[#0C0B10]">
          <div className="w-full max-w-md space-y-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create your account
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#14121A] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-[#14121A] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#14121A] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition"
                  />
                </div>
                <p className="text-[11px] mt-1 text-zinc-400">
                  Strong password
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 bg-[#14121A] border-zinc-700 rounded text-purple-500 focus:ring-purple-500/20 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-xs text-zinc-400 leading-none cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="#terms" className="text-zinc-300 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-zinc-300 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-linear-to-r from-purple-400 via-purple-300 to-indigo-300 hover:opacity-95 text-zinc-950 font-semibold py-3 rounded-lg text-sm transition shadow-lg shadow-purple-900/20 active:scale-[0.99] cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="border-b border-zinc-800/80 w-full" />
              <span className="absolute bg-[#0C0B10] px-3 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#14121A] border border-zinc-800 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-700 transition active:scale-[0.99] cursor-pointer"
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
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#14121A] border border-zinc-800 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-700 transition active:scale-[0.99] cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-zinc-400" />
                SSO
              </button>
            </div>

            <p className="text-center text-xs text-zinc-400 pt-2">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-white font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
