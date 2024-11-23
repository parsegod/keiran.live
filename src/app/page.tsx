"use client";

import { motion, useInView } from "framer-motion";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { IconBrandReact, IconBrandPython, IconBrandRust } from "@tabler/icons-react";
import TypewriterText from "@/components/TypewriterText";

const quotes = [
  "I am a software engineer from the UK and I'm learning to code",
  "Normalise writing software and web backend in Python",
  "Writing software, one error at a time",
  "Hyprland, the one true window manager",
  "Neovim is genuinely my favourite piece of software in the world",
  "{ text: undefined }",
  ". . ."
];

const skills = [
  {
    name: "Frontend Dev",
    description: "Although I have experience with frontend, I am more passionate about software development",
    icon: <IconBrandReact className="w-6 h-6 text-blue-400" />,
    delay: 0.2
  },
  {
    name: "Backend Dev",
    description: "Using frameworks like FastAPI, I am experienced in creating performant, RESTful APIs",
    icon: <IconBrandPython className="w-6 h-6 text-yellow-400" />,
    delay: 0.3
  },
  {
    name: "Systems Dev",
    description: "My current goal is to learn Rust for systems programming, which I am currently working on",
    icon: <IconBrandRust className="w-6 h-6 text-orange-400" />,
    delay: 0.4
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

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
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hey, I&apos;m Keiran
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
              src="/profile.gif"
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
            <TypewriterText
              text={quotes[Math.floor(Math.random() * quotes.length)]}
              delay={40}
            />
          </motion.div>

          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="https://github.com/KeiranScript" 
              target="_blank"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github size={24} />
            </Link>
            <Link 
              href="mailto:me@keiran.cc"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Mail size={24} />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          ref={skillsRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-800/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-zinc-800 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              <p className="text-zinc-400">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
