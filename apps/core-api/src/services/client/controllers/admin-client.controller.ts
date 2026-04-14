import { Controller, Get, Query, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminClientService } from '../applications/admin-client.service';
import { AdminClientQueryDto, ClientCreateDto } from './dto';

@ApiTags('[관리자] 도서관 API')
@Controller('admins/clients')
export class AdminClientController {
  constructor(private readonly adminClientService: AdminClientService) {}

  @Post()
  async create(@Body() body: ClientCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminClientService.create(body);

    // 4. Send response
    return { data: {} };
  }

  /**
   * 도서관 목록 조회
   */
  @Get()
  async list(@Query() query: AdminClientQueryDto) {
    // 1. Destructure body, params, query
    const { searchKey, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminClientService.list({ searchKey, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 도서관 상세 조회
   */
  @Get(':clientId')
  async retrieve(@Param('clientId', ParseIntPipe) clientId: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminClientService.retrieve({ id: clientId });

    // 4. Send response
    return { data };
  }
}
