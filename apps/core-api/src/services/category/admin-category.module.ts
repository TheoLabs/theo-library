import { Module } from '@nestjs/common';
import { AdminCategoryController } from '@services/category/controllers/admin-category.controller';
import { CategoryRepository } from '@services/category/repository/category.repository';
import { AdminCategoryService } from '@services/category/applications/admin-category.service';

@Module({
  imports: [],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService, CategoryRepository],
  exports: [CategoryRepository],
})
export class AdminCategoryModule {}
