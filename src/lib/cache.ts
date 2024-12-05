import fs from 'fs';
import path from 'path';

interface CacheEntry {
    data: any;
    timestamp: number;
}

interface CacheData {
    [key: string]: CacheEntry;
}

class LocalCache {
    private static instance: LocalCache;
    private cacheFile: string;
    private cache: CacheData = {};
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    private readonly MAX_CACHE_SIZE = 100; // Maximum number of entries

    private constructor() {
        this.cacheFile = path.join(process.cwd(), 'src', 'app', 'api', 'e-z', '.cache.json');
        this.loadCache();
    }

    public static getInstance(): LocalCache {
        if (!LocalCache.instance) {
            LocalCache.instance = new LocalCache();
        }
        return LocalCache.instance;
    }

    private loadCache(): void {
        try {
            if (fs.existsSync(this.cacheFile)) {
                const data = fs.readFileSync(this.cacheFile, 'utf-8');
                this.cache = JSON.parse(data);
                this.cleanExpiredEntries();
            }
        } catch (error) {
            console.error('Failed to load cache:', error);
            this.cache = {};
        }
    }

    private saveCache(): void {
        try {
            fs.writeFileSync(this.cacheFile, JSON.stringify(this.cache), 'utf-8');
        } catch (error) {
            console.error('Failed to save cache:', error);
        }
    }

    private cleanExpiredEntries(): void {
        const now = Date.now();
        let modified = false;
        
        Object.keys(this.cache).forEach(key => {
            if (now - this.cache[key].timestamp > this.CACHE_DURATION) {
                delete this.cache[key];
                modified = true;
            }
        });

        if (modified) {
            this.saveCache();
        }
    }

    private enforceMaxSize(): void {
        const entries = Object.entries(this.cache);
        if (entries.length > this.MAX_CACHE_SIZE) {
            // Sort by timestamp (oldest first) and remove excess entries
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            const entriesToRemove = entries.slice(0, entries.length - this.MAX_CACHE_SIZE);
            entriesToRemove.forEach(([key]) => delete this.cache[key]);
            this.saveCache();
        }
    }

    public get(key: string): any | null {
        this.cleanExpiredEntries();
        const entry = this.cache[key];
        if (entry && Date.now() - entry.timestamp <= this.CACHE_DURATION) {
            return entry.data;
        }
        return null;
    }

    public set(key: string, data: any): void {
        this.cache[key] = {
            data,
            timestamp: Date.now()
        };
        this.enforceMaxSize();
        this.saveCache();
    }

    public clear(): void {
        this.cache = {};
        this.saveCache();
    }
}

export default LocalCache;
