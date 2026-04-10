import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ContractRepository } from '../repository/contract.repository';
import { PaginationOptions } from '@libs/utils';
import { AdminContractResponseDto } from '../controllers/dto';
import { Transactional } from '@libs/decorators';
import { CalendarDate, ContractType, ContractStatus } from '@theo-library/shared';
import { Contract } from '../domain/contract.entity';
import { ClientRepository } from '../../client/repository/client.repository';

@Injectable()
export class AdminContractService extends DddService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly clientRepository: ClientRepository
  ) {
    super();
  }

  @Transactional()
  async create({
    clientId,
    type,
    startOn,
    endOn,
  }: {
    clientId: number;
    type: ContractType;
    startOn: CalendarDate;
    endOn: CalendarDate;
  }) {
    const [[client, existingContract]] = await Promise.all([
      this.clientRepository.find({ id: clientId }),
      this.contractRepository.find({ clientId, status: ContractStatus.ACTIVE }),
    ]);

    if (!client) {
      throw new BadRequestException('존재하지 않는 고객사입니다.', { cause: '존재하지 않는 고객사입니다.' });
    }

    if (existingContract) {
      throw new BadRequestException('이미 활성화된 계약이 존재합니다.', { cause: '이미 활성화된 계약이 존재합니다.' });
    }

    const contract = Contract.of({ clientId, type, startOn, endOn });

    await this.contractRepository.save([contract]);
  }

  async list({ clientId }: { clientId?: number }, options?: PaginationOptions) {
    const [contracts, total] = await Promise.all([
      this.contractRepository.find({ clientId }, { options }),
      this.contractRepository.count({ clientId }),
    ]);

    return { items: contracts.map((contract) => contract.toInstance(AdminContractResponseDto)), total };
  }
}
