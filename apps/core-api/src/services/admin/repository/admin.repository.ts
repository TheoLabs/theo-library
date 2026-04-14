import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Admin } from '../domain/admin.entity';
import { checkInValue, checkLikeValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { AdminRoleType } from '@theo-library/shared';

@Injectable()
export class AdminRepository extends DddRepository<Admin> {
  entityClass = Admin;

  async find(
    conditions: {
      id?: string;
      name?: string;
      email?: string;
      clientId?: number;
      roles?: AdminRoleType[];
      searchKey?: string;
      searchValue?: string;
    },
    options?: TypeormRelationOptions<Admin>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        email: conditions.email,
        clientId: conditions.clientId,
        role: checkInValue(conditions.roles),
        ...checkLikeValue({ searchKey: conditions.searchKey, searchValue: conditions.searchValue }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: {
    id?: string;
    name?: string;
    email?: string;
    clientId?: number;
    roles?: AdminRoleType[];
    searchKey?: string;
    searchValue?: string;
  }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        email: conditions.email,
        clientId: conditions.clientId,
        role: checkInValue(conditions.roles),
        ...checkLikeValue({ searchKey: conditions.searchKey, searchValue: conditions.searchValue }),
      }),
    });
  }
}
