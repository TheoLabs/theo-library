import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLicenseService } from '@services/license/applications/admin-license.service';
import { LicenseCreateDto } from '@services/license/controllers/dto';

@ApiTags('[관리자] 라이센스 API')
@Controller('admins')
export class AdminLicenseController {
  constructor(private readonly adminLicenseService: AdminLicenseService) {}

  /**
   * 라이센스 생성
   */
  @Post('licenses')
  async create(@Body() body: LicenseCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminLicenseService.create(body);

    // 4. Send response
    return { data: {} };
  }

  /**
   * 특정 도서관의 라이센스 조회
   */
  @Get('clients/:clientId/licenses')
  async list() {}
}
