import type { Metadata } from "next";
import { Barlow_Condensed, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Condensed face is used only for project card titles
const barlow = Barlow_Condensed({
  variable: "--font-display",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandini Pradhan · Agentic AI Engineer",
  description:
    "Chandini Pradhan builds AI agents that plan, call tools and ship as production APIs. Agentic AI, RAG and FastAPI, Bengaluru or remote.",
  openGraph: {
    title: "Chandini Pradhan · Agentic AI Engineer",
    description: "An interactive, streaming-style portfolio of agentic AI projects.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
