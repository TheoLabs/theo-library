import { ApiResponse } from '@libs/decorators';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminCategoryService } from '@services/category/applications/admin-category.service';
import { CategoryCreateDto, CategoryUpdateDto } from '@services/category/controllers/dto';
import { CategoryQueryDto } from '@services/category/controllers/dto/category-query.dto';
import { CategoryRepository } from '@services/category/repository/category.repository';

@ApiTags('[관리자] 카테고리 API')
@Controller('admins/categories')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  /**
   * 카테고리 생성
   */
  @Post()
  async create(@Body() body: CategoryCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminCategoryService.create({ ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 카테고리 목록 조회
   */
  @Get()
  @ApiResponse(CategoryRepository, 'pagination')
  async list(@Query() query: CategoryQueryDto) {
    // 1. Destructure body, params, query
    const { searchKey, searchValue, ...options } = query;
    // 2. Get context
    // 3. Get result
    const data = await this.adminCategoryService.list({ searchKey, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 카테고리 수정
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: CategoryUpdateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminCategoryService.update({ id, ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 카테고리 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminCategoryService.remove({ id });

    // 4. Send response
    return { data: {} };
  }
}
