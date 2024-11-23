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
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const projects = [
  {
    title: "AnonHost",
    description: "A beautiful (and free) image host built with Next.js and TypeScript.",
    image: "/anonhost.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/KeiranScript/keiran.cc",
    demo: "https://keiran.cc"
  },
  {
    title: "uwurs",
    description: "A rust library dedicated to providing text transformation for weebs",
    image: "/uwurs.png",
    tags: ["Rust", "Cargo", "Git", ],
    github: "https://github.com/KeiranScript/uwurs",
    demo: "https://crates.io/crates/uwurs"
  },
  {
    title: "Archium",
    description: "A fork of the Archie project, aiming to provide \"Fast & Easy Package Management for Arch Linux\"",
    image: "/archium.png",
    tags: ["C", "Make", "Git", "Pacman"],
    github: "https://github.com/KeiranScript/Archium",
    demo: "https://github.com/KeiranScript/Archium"
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
            className="relative bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-800/50 group hover:z-10"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-300 rounded-t-lg"
              />
            </div>
            <div className="flex flex-col h-[calc(100%-12rem)]">
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold group-hover:text-white transition-colors mb-4">{project.title}</h3>
                <p className="text-zinc-400">{project.description}</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm hover:bg-zinc-700 transition-colors"
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
