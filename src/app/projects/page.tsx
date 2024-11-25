"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const projects = [
  {
    title: "AnonHost",
    description: "A beautiful (and free) image host using a custom file chunking algorithm to circumvent cloudflare's entity limit",
    image: "/anonhost.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/keirancc/keiran.cc",
    demo: "https://keiran.cc"
  },
  {
    title: "E-ZDocs",
    description: "A user-friendly documentation site built with Next.js, Tailwind CSS and a whole lot of caffeine",
    image: "/e-zdocs.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/keirancc/e-zdocs",
    demo: "https://e-z.software"
  },
  {
    title: "KeiranHost",
    description: "An intentionally simple image host developed to have as little latency as possible",
    image: "/keiranhost.png",
    tags: ["Vite", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/keirancc/keiranhost",
    demo: "https://github.com/keirancc/keiranhost"
  },
  {
    title: "Archium",
    description: "A fork of the Archie project, aiming to provide \"Fast & Easy Package Management for Arch Linux\"",
    image: "/archium.png",
    tags: ["C", "Make", "Git", "Pacman"],
    github: "https://github.com/keirancc/Archium",
    demo: "https://github.com/keirancc/Archium"
  },
  {
    title: "nekohash",
    description: "A kawaii cryptographic hashing library written in rust, making use of AES-256 and more",
    image: "/nekohash.png",
    tags: ["Rust", "Cargo", "Git"],
    github: "https://github.com/keirancc/nekohash",
    demo: "https://github.com/keirancc/nekohash"
  },
  {
    title: "uwurs",
    description: "A rust library dedicated to providing text transformation for weebs",
    image: "/uwurs.png",
    tags: ["Rust", "Cargo", "Git"],
    github: "https://github.com/keirancc/uwurs",
    demo: "https://github.com/keirancc/uwurs"
  },
  {
    title: "yalc",
    description: "Yet Another Logging Crate - a simple logging library for rust",
    image: "/yalc.png",
    tags: ["Rust", "Cargo", "Git"],
    github: "https://github.com/keirancc/yalc",
    demo: "https://github.com/keirancc/yalc"
  },
];

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: {
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "subpixel-antialiased"
            }}
            className="relative bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800"
          >
            <Link href={project.demo} target="_blank">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform-gpu transition-transform duration-200 ease-out hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="flex flex-col h-[calc(100%-12rem)]">
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold text-zinc-100 mb-4">{project.title}</h3>
                <p className="text-zinc-400">{project.description}</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
