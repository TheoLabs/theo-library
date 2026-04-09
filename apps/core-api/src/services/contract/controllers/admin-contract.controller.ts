import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminContractService } from '../applications/admin-contract.service';
import { ApiResponse } from '@libs/decorators';
import { AdminContractResponseDto } from './dto';

@ApiTags('[관리자] 계약 API')
@Controller('admins/clients')
export class AdminContractController {
  constructor(private readonly adminContractService: AdminContractService) {}

  /**
   * 해당 고객사의 계약 목록 조회
   */
  @Get(':clientId/contracts')
  @ApiResponse(AdminContractResponseDto, 'pagination')
  async list(@Param('clientId', ParseIntPipe) clientId: number, @Query() query: any) {
    // 1. Destructure body, params, query
    const { ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminContractService.list({ clientId, ...options });

    // 4. Send response
    return { data };
  }
}
