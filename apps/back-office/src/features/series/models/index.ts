import type {
  CalendarDate,
  SeriesStatus,
  IPaginationParams,
  ISeriesCreateBodyDto,
} from "@theo-library/shared";

export interface SeriesModel {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface SeriesListParams extends IPaginationParams {
  filter?: {
    searchKey?: string;
    searchValue?: string;
  };
}

export interface SeriesCreateBody extends ISeriesCreateBodyDto {}
