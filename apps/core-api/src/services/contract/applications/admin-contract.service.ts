import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ContractRepository } from '../repository/contract.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminContractResponseDto } from '../controllers/dto';

@Injectable()
export class AdminContractService extends DddService {
  constructor(private readonly contractRepository: ContractRepository) {
    super();
  }

  async list({ clientId }: { clientId?: number }, options?: PaginationOptions) {
    const [contracts, total] = await Promise.all([
      this.contractRepository.find({ clientId }, { options }),
      this.contractRepository.count({ clientId }),
    ]);

    return { items: contracts.map((contract) => contract.toInstance(AdminContractResponseDto)), total };
  }
}
