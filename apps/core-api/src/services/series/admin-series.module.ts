import { Module } from '@nestjs/common';
import { AdminCategoryModule } from '@services/category/admin-category.module';
import { AdminSeriesService } from '@services/series/applications/admin-series.service';
import { AdminSeriesController } from '@services/series/controllers/admin-series.controller';
import { SeriesRepository } from '@services/series/repository/series.repository';

@Module({
  imports: [AdminCategoryModule],
  controllers: [AdminSeriesController],
  providers: [SeriesRepository, AdminSeriesService],
  exports: [SeriesRepository],
})
export class AdminSeriesModule {}
