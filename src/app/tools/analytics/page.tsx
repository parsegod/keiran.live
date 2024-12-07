"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconClick, IconLink, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { AnalyticsData } from "@/types/analytics";

const REFRESH_INTERVAL = 5000; // 5 seconds

const formatDate = (date: Date | string | undefined) => {
  if (!date) return "Never";
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
};

const calculateTimeAgo = (date: Date | string) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

function AnalyticsContent() {
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchAnalytics = useCallback(async (codeToFetch: string) => {
    if (!codeToFetch || codeToFetch.length !== 6) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analytics/${codeToFetch}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch analytics");
      }

      setAnalytics(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const initialCode = searchParams.get("code") || "";
    setCode(initialCode);
    if (initialCode.length === 6) {
      fetchAnalytics(initialCode);
    }
  }, [searchParams, fetchAnalytics]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedCode = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    if (sanitizedCode.length > 6) {
      setError("Code cannot be longer than 6 characters");
      return;
    }

    setCode(sanitizedCode);
    setError(null);

    if (sanitizedCode.length === 6) {
      router.push(`/tools/analytics?code=${sanitizedCode}`);
      fetchAnalytics(sanitizedCode);
    } else if (analytics) {
      setAnalytics(null);
    }
  };

  useEffect(() => {
    if (!mounted || !code || code.length !== 6) return;

    const timer = setInterval(() => {
      fetchAnalytics(code);
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [code, mounted, fetchAnalytics]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
          <Link
            href="/tools"
            className="flex items-center gap-2 text-neutral-400 transition-colors hover:text-neutral-200"
          >
            <IconArrowLeft size={20} />
            <span>Back to Tools</span>
          </Link>
        </div>

        <h1 className="mb-2 text-4xl font-bold">Analytics</h1>
        <p className="mb-8 text-neutral-400">
          View analytics for your shortened links.
        </p>

        <div className="mb-8">
          <label
            htmlFor="code"
            className="mb-2 block text-sm font-medium text-neutral-400"
          >
            Enter your 6-character code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={handleCodeChange}
            placeholder="e.g., abc123"
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 text-sm text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-400"
            >
              Loading...
            </motion.div>
          ) : analytics ? (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <h2 className="mb-4 text-2xl font-bold">Link Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-400">Original URL</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={analytics.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {analytics.url}
                      </a>
                      <IconExternalLink
                        size={16}
                        className="text-neutral-400"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Shortened URL</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://keiran.live/l/${analytics.code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        keiran.live/l/{analytics.code}
                      </a>
                      <IconExternalLink
                        size={16}
                        className="text-neutral-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-neutral-400">Created</p>
                      <p>{formatDate(analytics.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Last Click</p>
                      <p>{formatDate(analytics.lastClickedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Statistics</h2>
                  <p className="text-sm text-neutral-400">
                    Last updated: {lastUpdated ? calculateTimeAgo(lastUpdated) : "Never"}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <IconClick size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analytics.clicks}</p>
                      <p className="text-sm text-neutral-400">Total Clicks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                    <div className="rounded-full bg-green-500/20 p-3">
                      <IconLink size={24} className="text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : code.length === 6 ? (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-400"
            >
              No analytics data found for code: {code}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 text-neutral-200 p-8">Loading analytics...</div>}>
      <AnalyticsContent />
    </Suspense>
  );
}
