"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Tools",
    href: "/tools",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold relative group transition-all duration-300"
          >
            <span className="text-zinc-100" style={{
              textShadow: "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2)",
              transition: "text-shadow 0.3s ease",
            }}>
              Keiran.Live
            </span>
            <style jsx>{`
              .group:hover span {
                text-shadow: 0 0 10px rgba(255,255,255,0.8), 
                            0 0 20px rgba(255,255,255,0.6),
                            0 0 30px rgba(255,255,255,0.4),
                            0 0 40px rgba(255,255,255,0.2);
              }
            `}</style>
          </Link>
          <div className="flex gap-1 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === item.href
                    ? "text-zinc-100 bg-zinc-800/50"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
