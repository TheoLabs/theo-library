import { Module } from '@nestjs/common';
import { AdminRepository } from './repository/admin.repository';
import { AdminMemberController } from './controllers/admin-member.controller';
import { AdminMemberService } from './applications/admin-member.service';
import { AdminMemberConsumer } from './applications/admin-member.consumer';

@Module({
  controllers: [AdminMemberController],
  providers: [AdminRepository, AdminMemberService, AdminMemberConsumer],
  exports: [AdminRepository],
})
export class AdminMemberModule {}
