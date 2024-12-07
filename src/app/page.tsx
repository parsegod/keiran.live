"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandBluesky,
  IconBrandYoutube,
  IconMail
} from "@tabler/icons-react";
import TypewriterText from "@/components/TypewriterText";
import { useState, useEffect } from "react";

const quotes = [
  "Writing software, one error at a time",
  "Hyprland, the one true window manager",
  "Neovim is genuinely my favourite piece of software in the world",
  "{ text: undefined }",
  "Embracing the chaos of concurrent programming",
  "Git push --force",
  "404: Sleep not found",
  "Tabs vs. Spaces: The eternal debate",
  "I speak fluent binary... 01101010 01101111 01101011 01100101",
  "Recursion: See 'Recursion'",
  "There's no place like 127.0.0.1",
  ". . ."
];

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-16">
        <div className="flex flex-col items-center justify-center min-h-[40vh] relative space-y-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="text-zinc-100">Hey, I&apos;m </span>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent relative"
                style={{
                  textShadow: "0 0 20px rgba(99, 102, 241, 0.3), 0 0 30px rgba(168, 85, 247, 0.2), 0 0 40px rgba(236, 72, 153, 0.1)"
                }}
              >
                Keiran
              </span>
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [0, 14, -8, 14, -4, 10, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="inline-block ml-4"
              >
                👋
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Image
              src="/profile.png"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-zinc-400 max-w-2xl text-center"
          >
            <div className="mt-4">
              <TypewriterText 
                text={quotes[currentQuoteIndex]} 
                className="text-lg text-zinc-400"
                delay={40}
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="https://github.com/keirancc" 
              target="_blank"
              className="p-2 text-zinc-500 group transition-colors"
            >
              <IconBrandGithub size={24} className="transition-all duration-300 group-hover:stroke-[#ffffff] group-hover:stroke-[1.5]" />
            </Link>
            <Link 
              href="https://bsky.app/profile/keiran.cc" 
              target="_blank"
              className="p-2 text-zinc-500 group transition-colors"
            >
              <IconBrandBluesky size={24} className="transition-all duration-300 group-hover:stroke-[#0095f6] group-hover:stroke-[1.5]" />
            </Link>
            <Link 
              href="mailto:me@keiran.cc"
              className="p-2 text-zinc-500 group transition-colors"
            >
              <IconMail size={24} className="transition-all duration-300 group-hover:stroke-[#ea580c] group-hover:stroke-[1.5]" />
            </Link>
            <Link 
              href="https://youtube.com/@keiranscript" 
              target="_blank"
              className="p-2 text-zinc-500 group transition-colors"
            >
              <IconBrandYoutube size={24} className="transition-all duration-300 group-hover:stroke-[#ff0033] group-hover:stroke-[1.5]" />
            </Link>
            <Link 
              href="https://discord.com/users/1230319937155760131" 
              target="_blank"
              className="p-2 text-zinc-500 group transition-colors"
            >
              <IconBrandDiscord size={24} className="transition-all duration-300 group-hover:stroke-[#5865f2] group-hover:stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
