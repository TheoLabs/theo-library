import { Module } from '@nestjs/common';
import { AdminMemberModule } from './admin/admin-member.module';
import { AdminClientModule } from './client/admin-client.module';

@Module({
  imports: [AdminMemberModule, AdminClientModule],
  exports: [AdminMemberModule, AdminClientModule],
})
export class AdminModule {}
