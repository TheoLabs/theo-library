import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Contract } from '../domain/contract.entity';
import { ContractStatus, ContractType } from '@theo-library/shared';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class ContractRepository extends DddRepository<Contract> {
  entityClass = Contract;

  async find(
    conditions: { id?: number; clientId?: number; type?: ContractType; status?: ContractStatus },
    options?: TypeormRelationOptions<Contract>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        clientId: conditions.clientId,
        type: conditions.type,
        status: conditions.status,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; clientId?: number; type?: ContractType; status?: ContractStatus }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        clientId: conditions.clientId,
        type: conditions.type,
        status: conditions.status,
      }),
    });
  }
}
