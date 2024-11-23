"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Wrench, Cog, Layers, MemoryStick, HardDrive, Monitor, Keyboard, Mouse } from "lucide-react";

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

const systemInfo = {
  cpu: {
    name: "Intel Celeron N4120",
    cores: "4 Cores, 4 Threads",
    speed: "2.60 GHz Clock Speed"
  },
  gpu: {
    name: "Intel UHD Graphics 600",
    vram: "8GB VRAM",
    resolution: "1366x768 @ 60Hz"
  },
  ram: {
    total: "8GB DDR4",
    speed: "2400 MT/s",
    config: "2x4GB Dual Channel"
  },
  storage: {
    primary: "120GB SSD",
    secondary: "1TB HDD 2.5\"",
    backup: "2TB HDD 3.5\""
  },
  peripherals: {
    keyboard: "MX Mechanical Mini",
    mouse: "Logitech G Pro X Superlight"
  }
};

const systems = [
  {
    title: "Development Environment",
    description: "My primary development setup includes Arch Linux, the Fish shell, kitty terminal emulator and Neovim with the lazyvim plugin manager. I use Windows Terminal with Oh My Zsh for a customized shell experience.",
    icon: Terminal,
    color: "text-green-500"
  },
  {
    title: "Languages & Frameworks",
    description: "Proficient in TypeScript, Python, Go, Java, C, Rust and more. Experienced with React, Next.js, and various backend frameworks. Currently exploring systems programming.",
    icon: Code2,
    color: "text-blue-500"
  },
  {
    title: "Hardware Setup",
    description: "Custom-built PC with AMD Ryzen 9 5950X, 64GB RAM, and NVIDIA RTX 4090. Multiple monitors for enhanced productivity and development workflow.",
    icon: Cpu,
    color: "text-red-500"
  },
  {
    title: "Tools & Utilities",
    description: "Git for version control, Docker for containerization, and various CLI tools like ripgrep and fd. Extensive use of shell scripts for automation.",
    icon: Wrench,
    color: "text-yellow-500"
  },
  {
    title: "Build & Deploy",
    description: "CI/CD with GitHub Actions, containerization with Docker, and deployment on various cloud platforms including AWS and Vercel.",
    icon: Cog,
    color: "text-purple-500"
  },
  {
    title: "Tech Stack",
    description: "Full-stack development with Next.js, TypeScript, and Tailwind CSS. Database experience with PostgreSQL, MongoDB, and Redis.",
    icon: Layers,
    color: "text-indigo-500"
  }
];

export default function System() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">My System</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          An overview of my development environment, tools, and technologies I work with
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {systems.map((system) => (
          <motion.div
            key={system.title}
            variants={item}
            whileHover={{ 
              y: -8,
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
            className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800"
          >
            <div className="flex items-center gap-3">
              <system.icon className={`w-6 h-6 ${system.color}`} />
              <h2 className="text-lg font-semibold text-zinc-100">{system.title}</h2>
            </div>
            <p className="text-zinc-400">{system.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {Object.entries(systemInfo).map(([key, info], index) => (
          <motion.div 
            key={key}
            variants={item} 
            className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 group"
            whileHover={{ 
              y: -8,
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
          >
            <div className="flex items-center gap-3">
              {key === 'cpu' && <Cpu className="w-6 h-6 text-indigo-500" />}
              {key === 'gpu' && <Monitor className="w-6 h-6 text-purple-500" />}
              {key === 'ram' && <MemoryStick className="w-6 h-6 text-pink-500" />}
              {key === 'storage' && <HardDrive className="w-6 h-6 text-blue-500" />}
              {key === 'peripherals' && <Keyboard className="w-6 h-6 text-green-500" />}
              <h2 className="text-lg font-semibold text-zinc-100">{Object.values(info)[0]}</h2>
            </div>
            <div className="space-y-2">
              {Object.values(info).map((value, i) => (
                <p key={i} className={i === 0 ? "text-zinc-300" : "text-zinc-400 text-sm"}>
                  {value}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
