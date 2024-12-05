"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconSearch, IconAlertCircle, IconBrandDiscord, IconLink } from "@tabler/icons-react";
import { FaCrown, FaCode, FaShieldAlt, FaHeadset, FaStar, FaRocket, FaGem } from "react-icons/fa";
import type { IconType } from 'react-icons';
import Link from "next/link";
import Image from "next/image";

interface CustomStatus {
  name: string;
  createdTimestamp: number;
  emoji?: string;
}

interface Activity {
  applicationId: string | null;
  assets?: {
    smallImage: string | null;
    largeImage: string | null;
    smallText: string | null;
    largeText: string | null;
  };
  details?: string;
  emoji?: string | null;
  name: string;
  title?: string;
  state?: string;
  type: string;
  timestamps?: {
    start: string;
    end: string;
  };
}

interface BadgeData {
  name: string;
}

interface UserData {
  username: string;
  name: string;
  views: number;
  description: string;
  title: string;
  ranks: string[];
  presence: {
    status: string;
    customStatus: CustomStatus;
    platform: Record<string, string>;
    badges: (string | BadgeData)[];
    activities: Activity[];
    pfp: string;
    tag: string;
    _id: string;
  };
  profile: {
    pfp: {
      discord: boolean;
      url: string;
      decorated: boolean;
      decoration: string;
    };
    banner: {
      enabled: boolean;
      type: string;
      url: string;
    };
    background: {
      url: string;
      type: string;
    };
  };
  socials: Array<{
    _id?: string;
    name: string;
    url: string;
  }>;
  songs: Array<{
    _id?: string;
    name: string;
    url: string;
  }>;
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    text_color: string;
    background_color: string;
    icon_color: string;
    font: string;
  };
  features: {
    animated_title: boolean;
    presence_enabled: boolean;
    show_views: boolean;
    show_badges: boolean;
    typewriter: boolean;
    glow: boolean;
  };
  cursor?: {
    enabled: boolean;
    type: string;
    center: boolean;
  };
  sparkles?: {
    enabled: boolean;
    type: string;
  };
}

const TypewriterText = ({ text }: { text: string }) => {
  const characters = text.split("");
  
  return (
    <span className="inline-flex">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          transition={{
            duration: 0.15,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formatTimeRemaining = (start: string, end: string) => {
  const now = new Date();
  const endTime = new Date(end);
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return "Finished";
  
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')} left`;
};

// Badge mapping with order priority
const BADGE_MAP: Record<string, { icon: IconType; priority: number }> = {
  'Owner': { icon: FaCrown, priority: 1 },
  'Developer': { icon: FaCode, priority: 2 },
  'Admin': { icon: FaShieldAlt, priority: 3 },
  'Staff': { icon: FaHeadset, priority: 4 },
  'Featured': { icon: FaStar, priority: 5 },
  'Beta': { icon: FaRocket, priority: 6 },
  'Premium': { icon: FaGem, priority: 7 }
};

export default function EZStats() {
  const [url, setUrl] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    // Clear input error when user starts typing
    setInputError(null);
  }, [url]);

  const validateInput = (input: string): boolean => {
    if (!input.trim()) {
      setInputError("Please enter a username or URL");
      return false;
    }

    if (input.includes('https://e-z.bio/')) {
      if (!input.match(/^https:\/\/e-z\.bio\/[\w\-.]+$/)) {
        setInputError("Invalid e-z.bio URL format");
        return false;
      }
    } else {
      if (!input.match(/^[\w\-.]+$/)) {
        setInputError("Username can only contain letters, numbers, dots, and hyphens");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInputError(null);

    if (!validateInput(url)) {
      return;
    }

    setIsLoading(true);
    setUserData(null);

    try {
      const response = await fetch("/api/e-z", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: url }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to get user data");
      }

      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="space-y-8">
        <motion.div 
          className="flex items-center gap-4"
          variants={fadeInUp}
        >
          <Link 
            href="/tools"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors group"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <IconArrowLeft className="w-5 h-5 transition-colors group-hover:text-zinc-300" />
            </motion.div>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">E-Z Stats</h1>
            <p className="text-zinc-400 mt-1">Get detailed information about any e-z.bio profile</p>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-zinc-400 mb-2">
                Enter e-z.bio Username or URL
              </label>
              <div className="relative">
                <div className={`w-full px-4 py-2 bg-zinc-800 border rounded-lg focus-within:ring-2 focus-within:ring-zinc-600 transition-colors ${
                  inputError ? 'border-red-500' : 'border-zinc-700'
                }`}>
                  <AnimatePresence mode="wait">
                    {!url.includes('https://e-z.bio/') && url.trim() !== '' ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 top-0 px-4 py-2 text-zinc-400 pointer-events-none"
                      >
                        <TypewriterText text="e-z.bio/" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <input
                    type="text"
                    id="input"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="username or https://e-z.bio/username"
                    className={`w-full bg-transparent focus:outline-none text-zinc-100 ${
                      !url.includes('https://e-z.bio/') && url.trim() !== '' ? 'pl-[72px]' : ''
                    }`}
                    required
                  />
                </div>
              </div>
              <AnimatePresence>
                {inputError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                  >
                    <IconAlertCircle className="w-4 h-4" />
                    {inputError}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-2 flex flex-wrap gap-2">
                <motion.button
                  type="button"
                  onClick={() => setUrl('aiden')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors text-zinc-400 hover:text-zinc-300"
                >
                  Try @aiden
                </motion.button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-100 rounded-full"
                    />
                    <span>Fetching data...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <IconSearch className="w-5 h-5" />
                    <span>Get Stats</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-900/50 border border-red-800 rounded-lg flex items-start gap-2"
              >
                <IconAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {userData && (
              <motion.div
                key="userData"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={stagger}
                className="mt-6 space-y-6"
              >
                <motion.div 
                  className="p-4 bg-zinc-800 rounded-lg"
                  variants={fadeInUp}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {userData.profile?.pfp?.url && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <Image
                            src={userData.profile.pfp.url}
                            alt="Profile Picture"
                            width={48}
                            height={48}
                            className="rounded-full border-2 border-zinc-700"
                            unoptimized
                          />
                        </motion.div>
                      )}
                      <div className="flex-grow min-w-0">
                        <motion.h2
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-2xl font-bold text-zinc-100 truncate"
                        >
                          {userData.name}
                        </motion.h2>
                        {userData.title && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 truncate"
                          >
                            {userData.title}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Display badges */}
                    {userData.ranks && userData.ranks.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 flex-wrap"
                      >
                        {userData.ranks
                          .filter(rank => rank in BADGE_MAP)
                          .sort((a, b) => BADGE_MAP[a as keyof typeof BADGE_MAP].priority - BADGE_MAP[b as keyof typeof BADGE_MAP].priority)
                          .map((rank, index) => {
                            const badge = BADGE_MAP[rank as keyof typeof BADGE_MAP];
                            const Icon = badge.icon;
                            return (
                              <motion.div
                                key={rank}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                              >
                                <div className="relative">
                                  <Icon 
                                    size={20}
                                    className="text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
                                  />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {rank}
                                </div>
                              </motion.div>
                            );
                          })}
                      </motion.div>
                    )}

                    {userData.description && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-300"
                      >
                        {userData.description}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {userData.presence && (
                  <motion.div 
                    className="p-4 bg-zinc-800 rounded-lg"
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <IconBrandDiscord className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Discord Presence</h2>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      {userData.presence.pfp && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative flex-shrink-0"
                        >
                          <Image
                            src={userData.presence.pfp}
                            alt="Discord avatar"
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-zinc-700"
                            unoptimized
                          />
                          <div className={`absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full p-1`}>
                            <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                          </div>
                        </motion.div>
                      )}
                      
                      <div className="flex-grow min-w-0">
                        {userData.presence.tag && (
                          <div className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                            {userData.presence.tag}
                            <span className="text-sm text-zinc-400">#{userData.presence._id}</span>
                          </div>
                        )}
                        
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              userData.presence.status === 'online' ? 'bg-green-500' :
                              userData.presence.status === 'idle' ? 'bg-yellow-500' :
                              userData.presence.status === 'dnd' ? 'bg-red-500' :
                              'bg-zinc-500'
                            }`} />
                            <span className="text-zinc-300 capitalize">
                              {userData.presence.status === 'dnd' ? 'Do Not Disturb' : userData.presence.status}
                            </span>
                            {userData.presence.platform && Object.entries(userData.presence.platform)[0] && (
                              <span className="text-zinc-400 text-sm">
                                on {Object.keys(userData.presence.platform)[0]}
                              </span>
                            )}
                          </div>

                          {userData.presence.customStatus && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-zinc-300"
                            >
                              {userData.presence.customStatus.emoji && (
                                <Image
                                  src={userData.presence.customStatus.emoji}
                                  alt="Custom status emoji"
                                  width={16}
                                  height={16}
                                  className="inline-block"
                                  unoptimized
                                />
                              )}
                              <span>{userData.presence.customStatus.name}</span>
                              <span className="text-xs text-zinc-400">
                                • {new Date(userData.presence.customStatus.createdTimestamp).toLocaleString()}
                              </span>
                            </motion.div>
                          )}

                          {userData.presence.activities && userData.presence.activities.length > 0 && (
                            <div className="space-y-3 mt-4">
                              {userData.presence.activities.map((activity, index) => {
                                const isSpotify = activity.name === "Spotify";
                                
                                return (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 bg-zinc-900/50 rounded-lg p-3"
                                  >
                                    {activity.assets?.largeImage && (
                                      <div className="relative flex-shrink-0">
                                        <Image
                                          src={activity.assets.largeImage}
                                          alt={activity.assets.largeText || activity.name}
                                          width={60}
                                          height={60}
                                          className="rounded"
                                          unoptimized
                                        />
                                        {isSpotify && (
                                          <div className="absolute -bottom-1 -right-1 bg-[#1DB954] rounded-full p-1">
                                            <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    <div className="flex-grow min-w-0">
                                      {isSpotify ? (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-zinc-300 truncate">
                                              {activity.details}
                                            </span>
                                          </div>
                                          {activity.state && (
                                            <div className="text-sm text-zinc-400 mt-1 truncate">
                                              by {activity.state.split(';').map(artist => artist.trim()).join(', ')}
                                            </div>
                                          )}
                                          {activity.assets?.largeText && (
                                            <div className="text-xs text-zinc-500 mt-0.5 truncate">
                                              on {activity.assets.largeText}
                                            </div>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-zinc-300 truncate">
                                              {activity.name}
                                            </span>
                                          </div>
                                          {activity.details && (
                                            <div className="text-sm text-zinc-400 mt-1 truncate">
                                              {activity.details}
                                            </div>
                                          )}
                                          {activity.state && (
                                            <div className="text-sm text-zinc-400 mt-1 truncate">
                                              {activity.state}
                                            </div>
                                          )}
                                        </>
                                      )}

                                      {activity.timestamps && (
                                        <div className="text-xs text-zinc-500 mt-1">
                                          {formatTimeRemaining(activity.timestamps.start, activity.timestamps.end)}
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {userData.socials && userData.socials.length > 0 && (
                  <motion.div 
                    className="p-4 bg-zinc-800 rounded-lg"
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <IconLink className="w-6 h-6" />
                      <h2 className="text-xl font-semibold">Social Links</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {userData.socials.map((social, index) => (
                        <motion.a
                          key={social._id || index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors group"
                        >
                          <span className="text-zinc-100 group-hover:text-zinc-200 transition-colors">
                            {social.name}
                          </span>
                          <IconLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {userData.songs && userData.songs.length > 0 && (
                  <motion.div 
                    className="p-4 bg-zinc-800 rounded-lg"
                    variants={fadeInUp}
                  >
                    <h2 className="text-xl font-semibold mb-4">Tracks</h2>
                    <div className="grid gap-6">
                      {userData.songs.map((song, index) => (
                        <motion.div
                          key={song._id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-zinc-100 font-medium truncate pr-4">
                                {song.name.replace(/\.mp3$/, '')}
                              </h3>
                            </div>
                            <div className="w-full">
                              <audio
                                controls
                                className="w-full h-12 audio-player"
                                src={song.url}
                              >
                                <source src={song.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <style jsx global>{`
                  .audio-player {
                    filter: grayscale(1) contrast(1.2);
                    transition: all 0.2s ease-in-out;
                  }
                  
                  .audio-player:hover,
                  .audio-player:focus {
                    filter: grayscale(0) contrast(1);
                  }

                  .audio-player::-webkit-media-controls-panel {
                    background-color: rgba(39, 39, 42, 0.8);
                  }

                  .audio-player::-webkit-media-controls-current-time-display,
                  .audio-player::-webkit-media-controls-time-remaining-display {
                    color: #fff;
                  }

                  .audio-player::-webkit-media-controls-play-button,
                  .audio-player::-webkit-media-controls-mute-button {
                    filter: invert(1);
                  }

                  .audio-player::-webkit-media-controls-volume-slider,
                  .audio-player::-webkit-media-controls-timeline {
                    filter: invert(1);
                  }

                  @media (max-width: 640px) {
                    .audio-player {
                      height: 48px;
                    }
                  }
                `}</style>

                <motion.div 
                  className="p-4 bg-zinc-800 rounded-lg"
                  variants={fadeInUp}
                >
                  <h2 className="text-xl font-semibold mb-4">Theme</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(userData.theme).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm text-zinc-400">
                          {key.split(/(?=[A-Z])/).map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}:
                        </span>
                        <div className="flex items-center gap-2">
                          {key.includes('color') && value && (
                            <div
                              className="w-6 h-6 rounded-full border border-zinc-600"
                              style={{ backgroundColor: value }}
                            />
                          )}
                          <span className="text-zinc-100">{value || "None"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="p-4 bg-zinc-800 rounded-lg"
                  variants={fadeInUp}
                >
                  <h2 className="text-xl font-semibold mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(userData.features).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm text-zinc-400">
                          {key.split(/(?=[A-Z])/).map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}:
                        </span>
                        <p className="text-lg font-medium text-zinc-100">{value ? "Yes" : "No"}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {userData.cursor?.enabled && (
                  <motion.div 
                    className="p-4 bg-zinc-800 rounded-lg"
                    variants={fadeInUp}
                  >
                    <h2 className="text-xl font-semibold mb-4">Cursor</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-zinc-400">Type:</span>
                        <p className="text-lg font-medium text-zinc-100">{userData.cursor.type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-zinc-400">Centered:</span>
                        <p className="text-lg font-medium text-zinc-100">{userData.cursor.center ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {userData.sparkles?.enabled && (
                  <motion.div 
                    className="p-4 bg-zinc-800 rounded-lg"
                    variants={fadeInUp}
                  >
                    <h2 className="text-xl font-semibold mb-4">Sparkles</h2>
                    <div>
                      <span className="text-sm text-zinc-400">Type:</span>
                      <p className="text-lg font-medium text-zinc-100">{userData.sparkles.type}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
