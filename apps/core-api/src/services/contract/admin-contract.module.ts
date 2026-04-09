import { Module } from '@nestjs/common';
import { ContractRepository } from './repository/contract.repository';
import { AdminContractController } from './controllers/admin-contract.controller';
import { AdminContractService } from './applications/admin-contract.service';

@Module({
  controllers: [AdminContractController],
  providers: [ContractRepository, AdminContractService],
  exports: [ContractRepository],
})
export class AdminContractModule {}
