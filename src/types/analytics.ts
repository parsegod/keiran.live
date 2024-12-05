export interface AnalyticsData {
  id: string;
  url: string;
  code: string;
  clicks: number;
  createdAt: Date;
  lastClickedAt?: Date;
  averageClicksPerDay: number;
}

export interface RateLimitData {
  remaining: number;
  resetAt: Date;
}
