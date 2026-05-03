import { DddRepository } from '@libs/ddd';
import { checkInValue, checkLikeValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { Category } from '@services/category/domain/category.entity';

@Injectable()
export class CategoryRepository extends DddRepository<Category> {
  entityClass = Category;

  async find(
    conditions: { ids?: number[]; name?: string; searchKey?: string; searchValue?: string },
    options?: TypeormRelationOptions<Category>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: checkInValue(conditions.ids),
        name: conditions.name,
        ...checkLikeValue({ searchKey: conditions.searchKey, searchValue: conditions.searchValue }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { ids?: number[]; name?: string; searchKey?: string; searchValue?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: checkInValue(conditions.ids),
        name: conditions.name,
        ...checkLikeValue({ searchKey: conditions.searchKey, searchValue: conditions.searchValue }),
      }),
    });
  }

  // NOTE: name이 unique이므로 hard delete를 사용
  async remove(entities: Category[]) {
    await this.entityManager.remove(entities);
  }
}
