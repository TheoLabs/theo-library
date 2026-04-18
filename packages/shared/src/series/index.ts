export const SeriesStatus = {
  PENDING: "pending",
  PUBLISHED: "published",
  SUSPENDED: "suspended",
} as const;
export type SeriesStatus = (typeof SeriesStatus)[keyof typeof SeriesStatus];
