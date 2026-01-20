"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/" },
  { name: "Products", icon: ShoppingBag, path: "/products" },
  { name: "Orders", icon: Users, path: "/orders" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // 1. Remove the auth flag to trigger the AuthWrapper login screen
    localStorage.removeItem("shaido_admin_auth");
    
    // 2. Refresh the page to reset the app state
    window.location.reload();
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 flex flex-col border-r border-slate-800">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-black italic tracking-tighter">
          SHAIDO<span className="text-blue-500">.ADMIN</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
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
  );
}