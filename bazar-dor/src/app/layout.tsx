import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindShiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর - আজকের মূল্য",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${hindShiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f0f5f0]">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <Footer />

        <ToastContainer
          autoClose={2000}
          position="bottom-right"
          closeOnClick
          
        />
      </body>
    </html>
  );
}
