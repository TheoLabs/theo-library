import { Module } from '@nestjs/common';
import { AdminMemberModule } from './admin/admin-member.module';
import { AdminClientModule } from './client/admin-client.module';
import { AdminContractModule } from './contract/admin-contract.module';
import { AdminCategoryModule } from './category/admin-category.module';
import { AdminSeriesModule } from '@services/series/admin-series.module';
import { AdminFileModule } from './file/admin-file.module';
import { AdminLicenseModule } from '@services/license/admin-license.module';

@Module({
  imports: [
    AdminMemberModule,
    AdminClientModule,
    AdminContractModule,
    AdminCategoryModule,
    AdminCategoryModule,
    AdminSeriesModule,
    AdminFileModule,
    AdminLicenseModule,
  ],
  exports: [
    AdminMemberModule,
    AdminClientModule,
    AdminContractModule,
    AdminCategoryModule,
    AdminCategoryModule,
    AdminSeriesModule,
    AdminFileModule,
    AdminLicenseModule,
  ],
})
export class AdminModule {}
