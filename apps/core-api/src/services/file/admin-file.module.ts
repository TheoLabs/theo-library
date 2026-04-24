import { Module } from '@nestjs/common';
import { FileRepository } from './repository/file.repository';
import { AdminFileService } from './applications/admin-file.service';
import { AdminFileController } from './controllers/admin-file.controller';
import { S3Module } from '@libs/s3';

@Module({
  imports: [S3Module],
  controllers: [AdminFileController],
  providers: [FileRepository, AdminFileService],
  exports: [FileRepository],
})
export class AdminFileModule {}
