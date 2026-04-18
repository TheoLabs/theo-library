import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '@services/category/repository/category.repository';
import { Category } from '@services/category/domain/category.entity';
import { PaginationOptions } from '@libs/utils';
import { CategoryResponseDto } from '@services/category/controllers/dto';

@Injectable()
export class AdminCategoryService extends DddService {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super();
  }

  @Transactional()
  async create({ name }: { name: string }) {
    const [existingCategory] = await this.categoryRepository.find({ name });

    if (existingCategory) {
      throw new BadRequestException('이미 존재하는 카테고리입니다.', { cause: '이미 존재하는 카테고리입니다.' });
    }

    const category = Category.of({ name });
    await this.categoryRepository.save([category]);
  }

  async list({ searchKey, searchValue }: { searchKey?: string; searchValue?: string }, options?: PaginationOptions) {
    const [categories, total] = await Promise.all([
      this.categoryRepository.find({ searchKey, searchValue }, { options }),
      this.categoryRepository.count({ searchKey, searchValue }),
    ]);

    return { items: categories.map((category) => category.toInstance(CategoryResponseDto)), total };
  }

  @Transactional()
  async update({ id, name }: { id: number; name: string }) {
    const [[category, duplicatedCategory]] = await Promise.all([
      this.categoryRepository.find({ id }),
      this.categoryRepository.find({ name }),
    ]);

    if (!category) {
      throw new BadRequestException('존재하지 않는 카테고리입니다.', { cause: '존재하지 않는 카테고리입니다.' });
    }

    if (duplicatedCategory) {
      throw new BadRequestException('이미 존재하는 카테고리입니다.', { cause: '이미 존재하는 카테고리입니다.' });
    }

    category.update({ name });
    await this.categoryRepository.save([category]);
  }

  @Transactional()
  async remove({ id }: { id: number }) {
    const [category] = await this.categoryRepository.find({ id });

    if (!category) {
      throw new BadRequestException('존재하지 않는 카테고리입니다.', { cause: '존재하지 않는 카테고리입니다.' });
    }

    await this.categoryRepository.remove([category]);
  }
}
