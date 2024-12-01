"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl rounded-full bg-zinc-950/25 backdrop-blur border border-white/10 shadow-[0_0_30px_-15px_rgba(0,0,0,0.3)]">
      <div className="px-4 sm:px-6">
        <div className="flex h-12 items-center justify-between">
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
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  pathname === item.href
                    ? "text-zinc-100 bg-white/10"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
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
