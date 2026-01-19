"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we simulate a login success
    if (email && password) {
      router.push("/");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex">
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-black italic tracking-tighter mb-2">
              SHAIDO<span className="text-blue-600">.ADMIN</span>
            </h1>
            <p className="text-slate-500">Please enter your credentials to access the command center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 transition-all"
                  placeholder="admin@shaido.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group">
              Sign In to Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Forgot password? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Contact Support</span>
          </p>
        </div>
      </div>

      {/* Right Side: Visual decoration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* Simple abstract grid pattern */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',  backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="relative z-10 text-center p-12">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl rotate-12 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                <Lock className="text-white -rotate-12" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Secure Infrastructure</h2>
            <p className="text-slate-400 max-w-sm mx-auto">Accessing the SHAIDO global distribution and inventory management network.</p>
        </div>
      </div>
    </div>
  );
}