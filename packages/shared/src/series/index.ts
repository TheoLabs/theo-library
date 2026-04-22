export const SeriesStatus = {
  PENDING: "pending",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  SUSPENDED: "suspended",
} as const;
export type SeriesStatus = (typeof SeriesStatus)[keyof typeof SeriesStatus];
