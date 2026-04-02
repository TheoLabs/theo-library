import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Admin } from '../domain/admin.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class AdminRepository extends DddRepository<Admin> {
  entityClass = Admin;

  async find(conditions: { id?: string; name?: string; email?: string }, options?: TypeormRelationOptions<Admin>) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        email: conditions.email,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: string; name?: string; email?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        email: conditions.email,
      }),
    });
  }
}
