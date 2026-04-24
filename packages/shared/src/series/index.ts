import { CalendarDate } from "../common.js";

export const SeriesStatus = {
  PENDING: "pending",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  SUSPENDED: "suspended",
} as const;
export type SeriesStatus = (typeof SeriesStatus)[keyof typeof SeriesStatus];

export interface ISeriesResponse {
  id: number;
  thumbnailImageUrl: string;
  title: string;
  summary: string;
  author: string;
  illustrator: string;
  publisher: string;
  publishedOn: CalendarDate | null;
  publicationCycleDay: number;
  status: SeriesStatus;
  totalEpisodeCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ISeriesCreateBodyDto {
  thumbnailImageUrl: string;
  title: string;
  summary: string;
  author: string;
  illustrator: string;
  publisher: string;
  publicationCycleDay: number;
  categoryIds: number[];
}
