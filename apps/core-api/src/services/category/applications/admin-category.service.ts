import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '@services/category/repository/category.repository';
import { Category } from '@services/category/domain/category.entity';

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

  async list() {}

  @Transactional()
  async update() {}

  @Transactional()
  async remove({ id }: { id: number }) {
    const [category] = await this.categoryRepository.find({ id });

    if (!category) {
      throw new BadRequestException('존재하지 않는 카테고리입니다.', { cause: '존재하지 않는 카테고리입니다.' });
    }

    await this.categoryRepository.remove([category]);
  }
}
