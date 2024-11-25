import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { GridBackground } from "@/components/GridBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://keiran.live'),
  title: "Keiran",
  description: "My personal bio and portfolio",
  icons: {
    icon: "/profile.gif",
  },
  openGraph: {
    images: "/profile.gif",
    title: "Keiran",
    description: "My personal bio and portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keiran",
    description: "My personal bio and portfolio",
    images: "/profile.gif",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen`}>
        <GridBackground />
        <Navbar />
        <main className="relative pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
