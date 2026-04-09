import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminClientService } from '../applications/admin-client.service';

@ApiTags('[관리자] 도서관 API')
@Controller('admins/clients')
export class AdminClientController {
  constructor(private readonly adminClientService: AdminClientService) {}
}
