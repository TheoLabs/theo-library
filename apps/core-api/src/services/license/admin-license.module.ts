import { Module } from '@nestjs/common';
import { AdminLicenseService } from '@services/license/applications/admin-license.service';
import { LicenseRepository } from '@services/license/repository/license.repository';
import { AdminLicenseController } from '@services/license/controllers/admin-license.controller';
import { AdminSeriesModule } from '@services/series/admin-series.module';
import { AdminClientModule } from '@services/client/admin-client.module';

@Module({
  imports: [AdminSeriesModule, AdminClientModule],
  controllers: [AdminLicenseController],
  providers: [AdminLicenseService, LicenseRepository],
  exports: [LicenseRepository],
})
export class AdminLicenseModule {}
