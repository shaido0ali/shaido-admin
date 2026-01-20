"use client"; // Add this to the top
import { usePathname } from "next/navigation";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import AuthWrapper from "./../components/AuthWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 flex">
        <AuthWrapper>
          {!isLoginPage && <Sidebar />}
          <main className={`flex-1 bg-[#030712] min-h-screen ${!isLoginPage ? "ml-64 p-8" : ""}`}>
            {children}
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}