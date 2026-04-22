import { Controller } from '@nestjs/common';
import { AdminSeriesService } from '../applications/admin-series.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[관리자] 시리즈 API')
@Controller('admins/series')
export class AdminSeriesController {
  constructor(private readonly adminSeriesService: AdminSeriesService) {}
}
