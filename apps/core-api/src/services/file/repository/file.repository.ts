import { DddRepository } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { File } from '../domain/file.entity';
import { stripUndefined } from '@libs/utils';

@Injectable()
export class FileRepository extends DddRepository<File> {
  entityClass = File;

  async find(conditions: { id?: number; isCommit?: boolean }) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
      }),
    });
  }

  async count(conditions: { id?: number; isCommit?: boolean }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        isCommit: conditions.isCommit,
      }),
    });
  }
}
