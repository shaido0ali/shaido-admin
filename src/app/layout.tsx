"use client"; 
import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import AuthWrapper from "./../components/AuthWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-[#030712] text-slate-900">
        <AuthWrapper>
          <div className="flex min-h-screen">
            {/* Sidebar is hidden on mobile via its own internal logic, 
                but layout needs to stay flexible */}
            {!isLoginPage && <Sidebar />}
            
            <main className={`
              flex-1 min-h-screen transition-all duration-300
              ${!isLoginPage 
                ? "md:ml-64 p-4 md:p-8 pt-24 md:pt-8" 
                : "w-full"}
            `}>
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </AuthWrapper>
      </body>
    </html>
  );
}
