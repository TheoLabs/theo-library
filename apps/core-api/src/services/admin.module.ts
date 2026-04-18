import { Module } from '@nestjs/common';
import { AdminMemberModule } from './admin/admin-member.module';
import { AdminClientModule } from './client/admin-client.module';
import { AdminContractModule } from './contract/admin-contract.module';
import { AdminCategoryModule } from './category/admin-category.module';

@Module({
  imports: [AdminMemberModule, AdminClientModule, AdminContractModule, AdminCategoryModule, AdminCategoryModule],
  exports: [AdminMemberModule, AdminClientModule, AdminContractModule, AdminCategoryModule, AdminCategoryModule],
})
export class AdminModule {}
