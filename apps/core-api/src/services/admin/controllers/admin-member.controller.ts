import { Controller, Get, Put, Query, Param, Body } from '@nestjs/common';
import { AdminMemberService } from '../applications/admin-member.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminMemberQueryDto, AdminChangeStatusDto } from './dto';

@ApiTags('관리자 API')
@Controller('admins/members')
export class AdminMemberController {
  constructor(private readonly adminMemberService: AdminMemberService) {}

  /**
   * 관리자 목록 조회
   */
  @Get()
  async list(@Query() query: AdminMemberQueryDto) {
    // 1. Destructure body, params, query
    const { searchKey, searchValue, clientId, roles, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminMemberService.list({ searchKey, searchValue, clientId, roles }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 관리자 상태 변경
   */
  @Put(':id/status')
  async changeStatus(@Param('id') id: string, @Body() body: AdminChangeStatusDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminMemberService.changeStatus({ id, ...body });

    // 4. Send response
    return { data: {} };
  }
}
