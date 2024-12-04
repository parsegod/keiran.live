"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

interface CustomStatus {
  name: string;
  createdTimestamp: number;
  emoji: string;
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
    customStatus: CustomStatus | null;
    platform: Record<string, string>;
    badges: (string | { name: string })[];
    discord_tag: string | null;
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
    name: string;
    url: string;
    _id?: string;
  }>;
  custom_links: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  songs: Array<{
    name: string;
    url: string;
    _id?: string;
  }>;
  theme: {
    primarycolor: string;
    secondarycolor: string;
    accentcolor: string;
    textcolor: string;
    backgroundcolor: string;
    iconcolor: string;
    font: string;
  };
  features: {
    animatedTitle: boolean;
    presence: boolean;
    showViews: boolean;
    showBadges: boolean;
    typewriter: boolean;
    glow: boolean;
  };
  cursor?: {
    enabled: boolean;
    type: string;
    url: string;
    center: boolean;
  };
  sparkles?: {
    enabled: boolean;
    type: string;
  };
}

export default function EZStats() {
  const [url, setUrl] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch("/api/e-z", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
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

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/tools"
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">E-Z Stats Fetcher</h1>
            <p className="text-zinc-400 mt-1">Get detailed information about any e-z.bio profile</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-zinc-400 mb-2">
                Enter e-z.bio URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://e-z.bio/username"
                pattern="https:\/\/e-z\.bio\/[^\/]+"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-100"
                required
              />
              <p className="mt-1 text-xs text-zinc-500">
                Format: https://e-z.bio/username
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Fetching data..." : "Get Stats"}
            </motion.button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-800 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {userData && (
            <div className="mt-6 space-y-6">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-zinc-400">Username:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.username}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-400">Display Name:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-400">Views:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-zinc-400">Title:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.title || "None"}</p>
                  </div>
                  {userData.ranks && userData.ranks.length > 0 && (
                    <div className="col-span-2">
                      <span className="text-sm text-zinc-400">Ranks:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userData.ranks.map((rank, index) => (
                          <span key={index} className="px-2 py-1 bg-zinc-700 rounded-md text-sm">
                            {rank}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {userData.description && (
                  <div className="mt-4">
                    <span className="text-sm text-zinc-400">Description:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.description}</p>
                  </div>
                )}
              </div>

              {userData.presence && (
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Discord Presence</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-zinc-400">Status:</span>
                      <p className="text-lg font-medium text-zinc-100">{userData.presence.status}</p>
                    </div>
                    {userData.presence.customStatus && (
                      <div>
                        <span className="text-sm text-zinc-400">Custom Status:</span>
                        <div className="flex items-center gap-2">
                          {userData.presence.customStatus.emoji && (
                            <Image
                              src={userData.presence.customStatus.emoji}
                              alt="emoji"
                              width={20}
                              height={20}
                              className="inline-block"
                            />
                          )}
                          <p className="text-lg font-medium text-zinc-100">
                            {userData.presence.customStatus.name}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-500">
                          Set {formatTimestamp(userData.presence.customStatus.createdTimestamp)}
                        </p>
                      </div>
                    )}
                  </div>
                  {userData.presence.badges && userData.presence.badges.length > 0 && (
                    <div className="mt-4">
                      <span className="text-sm text-zinc-400">Discord Badges:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.presence.badges.map((badge, index) => {
                          const badgeName = typeof badge === 'object' && badge !== null 
                            ? badge.name 
                            : String(badge);
                          return (
                            <span key={index} className="px-2 py-1 bg-zinc-700 rounded-md text-sm">
                              {badgeName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {userData.socials && userData.socials.length > 0 && (
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.socials.map((social, index) => (
                      <a
                        key={social._id || index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
                      >
                        <span className="text-zinc-100">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {userData.songs && userData.songs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-zinc-800 rounded-lg"
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

              <div className="p-4 bg-zinc-800 rounded-lg">
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
              </div>

              <div className="p-4 bg-zinc-800 rounded-lg">
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
              </div>

              {userData.cursor?.enabled && (
                <div className="p-4 bg-zinc-800 rounded-lg">
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
                </div>
              )}

              {userData.sparkles?.enabled && (
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Sparkles</h2>
                  <div>
                    <span className="text-sm text-zinc-400">Type:</span>
                    <p className="text-lg font-medium text-zinc-100">{userData.sparkles.type}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
