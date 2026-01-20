"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/" },
  { name: "Products", icon: ShoppingBag, path: "/products" },
  { name: "Orders", icon: Users, path: "/orders" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("shaido_admin_auth");
    window.location.reload();
  };

  // Helper to close sidebar when a link is clicked on mobile
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* --- MOBILE TOP BAR & TOGGLE --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <h1 className="text-xl font-black italic tracking-tighter text-white">
          SHAIDO<span className="text-blue-500">.A</span>
        </h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY (Backdrop) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* --- SIDEBAR ASIDE --- */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800 z-[60] transition-transform duration-300 ease-in-out
        w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-800 hidden md:block">
          <h1 className="text-2xl font-black italic tracking-tighter">
            SHAIDO<span className="text-blue-500">.ADMIN</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl w-full transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
