import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminFileService } from '../applications/admin-file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('[관리자] 파일 API')
@Controller('admins/files')
export class AdminFileController {
  constructor(private readonly adminFileService: AdminFileService) {}

  /**
   * 파일 업로드
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminFileService.upload(file);

    // 4. Send response
    return { data };
  }
}
