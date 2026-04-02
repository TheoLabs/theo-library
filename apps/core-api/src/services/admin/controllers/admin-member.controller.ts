import { Controller, Get, Query } from '@nestjs/common';
import { AdminMemberService } from '../applications/admin-member.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminMemberQueryDto } from './dto';

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
    const { ...options } = query;
    // 2. Get context
    // 3. Get result
    const data = await this.adminMemberService.list({}, options);

    // 4. Send response
    return { data };
  }
}
