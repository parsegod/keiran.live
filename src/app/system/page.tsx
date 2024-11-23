"use client";

import { motion } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Monitor, Keyboard, Mouse } from "lucide-react";

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

export default function System() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">My Setup</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Here's what I use to get things done
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.cpu.name}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.cpu.name}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.cpu.cores}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.cpu.speed}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.gpu.name}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.gpu.name}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.gpu.vram}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.gpu.resolution}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <MemoryStick className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.ram.total}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.ram.total}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.ram.speed}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.ram.config}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.storage.primary}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.storage.primary}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.storage.secondary}</p>
            <p className="text-zinc-400 text-sm">{systemInfo.storage.backup}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.peripherals.keyboard}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.peripherals.keyboard}</p>
            <p className="text-zinc-400 text-sm">60% Wireless Mechanical Keyboard</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/50 group hover:-translate-y-2">
          <div className="flex items-center gap-3">
            <Mouse className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-lg font-semibold group-hover:text-white transition-colors">{systemInfo.peripherals.mouse}</h2>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-300">{systemInfo.peripherals.mouse}</p>
            <p className="text-zinc-400 text-sm">Wireless gaming mouse</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
