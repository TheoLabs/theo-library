import { Module } from '@nestjs/common';
import { AdminRepository } from './repository/admin.repository';
import { AdminMemberController } from './controllers/admin-member.controller';
import { AdminMemberService } from './applications/admin-member.service';

@Module({
  controllers: [AdminMemberController],
  providers: [AdminRepository, AdminMemberService],
  exports: [AdminRepository],
})
export class AdminMemberModule {}
