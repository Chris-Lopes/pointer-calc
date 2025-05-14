import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Github } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculate Your Pointer",
  description: "Calculate your pointer before college",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Analytics />
        <SpeedInsights />
        {children}
        <div className="flex justify-center items-center text-center py-4 border-t border-t-slate-200 dark:border-t-slate-700">
          Made with 🤍 |{" "}
          <a
            href="https://github.com/Chris-Lopes/pointer-calc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </body>
    </html>
  );
}
