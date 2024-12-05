"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconLink, IconChartBar } from "@tabler/icons-react";

const tools = [
  {
    name: "URL Shortener",
    description: "Create short, memorable links for your long URLs",
    href: "/tools/shortener",
    icon: IconLink,
  },
  {
    name: "Shortener Analytics",
    description: "View detailed analytics for your shortened URLs",
    href: "/tools/analytics",
    icon: IconChartBar,
  },
  {
    name: "E-Z Stats Fetcher",
    description: "Get info regarding any e-z.bio user",
    href: "/tools/e-z",
    icon: IconLink,
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Tools() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Tools</h1>
          <p className="text-zinc-400 mt-2">A collection of useful tools I&apos;ve created</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700"
            >
              <Link href={tool.href} className="absolute inset-0" />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-300">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-zinc-100 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-zinc-400">{tool.description}</p>
                  </div>
                </div>
                <IconArrowRight 
                  className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 group-hover:translate-x-1 transition-all duration-300" 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
