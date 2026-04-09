import { Module } from '@nestjs/common';
import { AdminMemberModule } from './admin/admin-member.module';
import { AdminClientModule } from './client/admin-client.module';
import { AdminContractModule } from './contract/admin-contract.module';

@Module({
  imports: [AdminMemberModule, AdminClientModule, AdminContractModule],
  exports: [AdminMemberModule, AdminClientModule, AdminContractModule],
})
export class AdminModule {}
