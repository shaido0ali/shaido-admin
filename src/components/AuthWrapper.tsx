"use client";
import { useState, useEffect } from "react";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user already "logged in" during this session
    const authStatus = localStorage.getItem("shaido_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("shaido_admin_auth", "true");
    setIsAuthenticated(true);
  };

  if (checking) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-blue-500/10 border border-slate-100 p-10 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/40">
            <Lock className="text-white" size={32} />
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-2">SHAIDO Admin</h1>
          <p className="text-slate-500 mb-8 font-medium">Internal Inventory & Order Management</p>
          
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex items-start gap-3 text-left">
            <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Portfolio Demo Mode:</strong> This dashboard is currently in public view. Click the button below to access the admin features.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group"
            >
              Enter Dashboard 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <p className="mt-8 text-xs text-slate-400 font-medium uppercase tracking-widest">
            Protected by Shaido Security
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}