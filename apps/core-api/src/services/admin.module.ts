import { Module } from '@nestjs/common';
import { AdminMemberModule } from './admin/admin-member.module';

@Module({
  imports: [AdminMemberModule],
  exports: [AdminMemberModule],
})
export class AdminModule {}
