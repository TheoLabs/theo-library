import { Module } from '@nestjs/common';
import { ContractRepository } from './repository/contract.repository';
import { AdminContractController } from './controllers/admin-contract.controller';
import { AdminContractService } from './applications/admin-contract.service';
import { AdminClientModule } from '../client/admin-client.module';

@Module({
  imports: [AdminClientModule],
  controllers: [AdminContractController],
  providers: [ContractRepository, AdminContractService],
  exports: [ContractRepository],
})
export class AdminContractModule {}
