import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { AdminSeriesService } from '../applications/admin-series.service';
import { ApiTags } from '@nestjs/swagger';
import { SeriesCreateDto } from '@services/series/controllers/dto';

@ApiTags('[관리자] 시리즈 API')
@Controller('admins/series')
export class AdminSeriesController {
  constructor(private readonly adminSeriesService: AdminSeriesService) {}

  /**
   * 시리즈 등록
   */
  @Post()
  async create(@Body() body: SeriesCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminSeriesService.create(body);

    // 4. Send response
    return { data: {} };
  }

  /**
   * 시리즈 목록 조회
   */
  @Get()
  async list() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminSeriesService.list();

    // 4. Send response
    return { data };
  }

  /**
   * 시리즈 상세 조회
   */
  @Get(':id')
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminSeriesService.retrieve({ id });

    // 4. Send response
    return { data };
  }
}
