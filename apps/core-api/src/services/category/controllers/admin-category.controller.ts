import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminCategoryService } from '@services/category/applications/admin-category.service';
import { CategoryCreateDto } from '@services/category/controllers/dto';

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
  async list() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminCategoryService.list();

    // 4. Send response
    return { data };
  }

  /**
   * 카테고리 수정
   */
  @Put(':id')
  async update() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminCategoryService.update();

    // 4. Send response
    return { data: {} };
  }

  /**
   * 카테고리 삭제
   */
  @Delete(':id')
  async remove() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminCategoryService.remove();

    // 4. Send response
    return { data: {} };
  }
}
