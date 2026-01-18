import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "SHAIDO Admin",
  description: "Internal Dashboard",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 flex">
        {/* The Sidebar stays fixed on the left */}
        <Sidebar />

        {/* The Main Content - shifted right to not hide behind the sidebar */}
        <main className="flex-1 ml-64 min-h-screen p-8">
          {children}
        </main>
      </body>
    </html>
  );
}