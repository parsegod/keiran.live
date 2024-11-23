"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Github, Mail, Twitter, Youtube, Copy, Check, LucideIcon, CircleUserRound } from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";
import { IconType } from "react-icons";
import Link from "next/link";
import { useRef, useState } from "react";

type CustomIconComponent = (props: { className?: string }) => JSX.Element;

interface Social {
  name: string;
  icon: LucideIcon | IconType | CustomIconComponent;
  link: string;
  color: string;
  description: string;
}

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

const socials: Social[] = [
  {
    name: "Email",
    icon: Mail,
    link: "mailto:me@keiran.cc",
    color: "text-violet-400",
    description: "I don't check emails often but I'm guaranteed to see it eventually"
  },
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/KeiranScript",
    color: "text-purple-500",
    description: "Check out my open source contributions and projects"
  },
  {
    name: "YouTube",
    icon: Youtube,
    link: "https://www.youtube.com/@keiranscript",
    color: "text-red-500",
    description: "I will post here soon but there's nothing interesting there yet"
  },
  {
    name: "Discord",
    icon: AiOutlineDiscord,
    link: "https://discord.com/users/1230319937155760131",
    color: "text-blue-500",
    description: "Add me on discord because I almost always have it open"
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com/_keirandev",
    color: "text-sky-500",
    description: "I don't use twitter, this is just here so there's an even number of links"
  },
  {
    name: "E-Z Bio",
    icon: CircleUserRound,
    link: "https://bio.keiran.cc",
    color: "text-blue-600",
    description: "A pretty personal bio page with all my links and stuff"
  }
];

export default function Contact() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({
    publicKey: false,
    command: false
  });

  const publicKeyRef = useRef(null);
  const isInView = useInView(publicKeyRef, { once: true, margin: "-100px" });

  const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZ0DnqBYJKwYBBAHaRw8BAQdAUS3Yt0qwxXXvXJToql3CZSc4Jwv+EsPJSHoH
hzu7siO0GktlaXJhbiA8a2VpcmFuMEBwcm90b24ubWU+iJkEExYKAEEWIQS7MMxd
gLOJwjgQht7yy+db474gYgUCZ0DnqAIbAwUJBaOagAULCQgHAgIiAgYVCgkICwIE
FgIDAQIeBwIXgAAKCRDyy+db474gYoH1AP9f7iic4cwamBfKj3/xhi/DdfAmj2lJ
5ZJSxpD7YIXXCwD9EU/n0ZEkI22xkyaE4SH4+jjzJduFGNIUFJuzaJBgagu4OARn
QOeoEgorBgEEAZdVAQUBAQdAamv+EGohjOyszfDHMbMwOAxbFsOYg9YDw/Kr/8nE
UAsDAQgHiH4EGBYKACYWIQS7MMxdgLOJwjgQht7yy+db474gYgUCZ0DnqAIbDAUJ
BaOagAAKCRDyy+db474gYtrpAP9tLA/5wxJLAhinkQyGdhR5OEXgXjDHnI9Il/Zc
/AD4igEA5Bjwcg1/sFI+mzsNa5HKHe4wTnbZhpzR/pmBlB7aDgY==BRpC

-----END PGP PUBLIC KEY BLOCK-----
`;

  const copyToClipboard = async (text: string, key: 'publicKey' | 'command') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">Where to find me</h1>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {socials.map((social) => {
          return (
            <motion.div
              key={social.name}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-800/50"
            >
              <Link href={social.link} target="_blank" className="block">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800 ${social.color} transform group-hover:scale-110 transition-all`}>
                    {React.createElement(social.icon, {
                      size: 24,
                      className: "w-6 h-6"
                    })}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold group-hover:text-white transition-colors">
                      {social.name}
                    </h2>
                    <p className="text-sm text-zinc-400">{social.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        ref={publicKeyRef}
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
        className="mt-24"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Send an Encrypted Message</h2>
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-800/50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Step-by-step guide</h3>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Save my public key to a file named <code className="text-zinc-300">publickey.asc</code></li>
                <li>Create your message in a text file (e.g., <code className="text-zinc-300">message.txt</code>)</li>
                <li>Use GPG to encrypt your message with the following command:</li>
              </ol>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-sm">GPG Command:</span>
                  <button
                    onClick={() => copyToClipboard("gpg --encrypt --recipient-file publickey.asc --output encrypted_message.gpg message.txt", "command")}
                    className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 active:scale-95 transition-all cursor-pointer"
                    aria-label="Copy command"
                  >
                    {copiedStates.command ? (
                      <>
                        <Check size={16} className="text-green-400" />
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-hidden font-mono text-sm text-zinc-300">
gpg --encrypt --recipient-file publickey.asc --output encrypted_message.gpg message.txt
                </pre>
              </div>
              <p className="mt-2 text-zinc-400">This command does the following:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
                <li><code className="text-zinc-300">--encrypt</code>: Tells GPG to encrypt the file</li>
                <li><code className="text-zinc-300">--recipient-file publickey.asc</code>: Specifies the public key file to use</li>
                <li><code className="text-zinc-300">--output encrypted_message.gpg</code>: Sets the output file name</li>
                <li><code className="text-zinc-300">message.txt</code>: The input file to encrypt</li>
              </ul>
              <p className="mt-2 text-zinc-400">The resulting <code className="text-zinc-300">encrypted_message.gpg</code> file can be safely sent to me.</p>
            </div>
            
            <div className="relative">
              <h3 className="text-lg font-semibold mb-2">My Public Key</h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto font-mono text-sm text-zinc-300">
                {publicKey}
              </pre>
              <button
                onClick={() => copyToClipboard(publicKey, "publicKey")}
                className="absolute top-2 right-2 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 active:scale-95 transition-all cursor-pointer"
                aria-label="Copy public key"
              >
                {copiedStates.publicKey ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
