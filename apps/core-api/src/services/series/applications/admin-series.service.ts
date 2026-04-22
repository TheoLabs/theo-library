import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SeriesRepository } from '@services/series/repository/series.repository';
import { Series } from '@services/series/domain/series.entity';

@Injectable()
export class AdminSeriesService extends DddService {
  constructor(private readonly seriesRepository: SeriesRepository) {
    super();
  }

  @Transactional()
  async create({
    thumbnailImageUrl,
    title,
    summary,
    author,
    illustrator,
    publisher,
    publicationCycleDay,
  }: {
    thumbnailImageUrl: string;
    title: string;
    summary: string;
    author: string;
    illustrator: string;
    publisher: string;
    publicationCycleDay: number;
  }) {
    const [existingSeries] = await this.seriesRepository.find({ title });

    if (existingSeries) {
      throw new BadRequestException(`${title}은 이미 존재하는 시리즈입니다.`, {
        cause: `${title}은 이미 존재하는 시리즈입니다.`,
      });
    }

    const series = Series.of({
      thumbnailImageUrl,
      title,
      summary,
      author,
      illustrator,
      publisher,
      publicationCycleDay,
    });

    await this.seriesRepository.save([series]);
  }

  async list() {
    const [seriesList, total] = await Promise.all([this.seriesRepository.find({}), this.seriesRepository.count({})]);

    return { items: seriesList, total };
  }
}
