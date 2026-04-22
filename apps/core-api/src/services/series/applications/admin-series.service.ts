import { DddService } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { SeriesRepository } from '@services/series/repository/series.repository';

@Injectable()
export class AdminSeriesService extends DddService {
  constructor(private readonly seriesRepository: SeriesRepository) {
    super();
  }
}
