import { DddService } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { FileRepository } from '../repository/file.repository';
import { Transactional } from '@libs/decorators';
import { S3Service } from '@libs/s3';
import { File } from '../domain/file.entity';

@Injectable()
export class AdminFileService extends DddService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly s3Service: S3Service
  ) {
    super();
  }

  @Transactional()
  async upload(file: Express.Multer.File) {
    const { url, filename } = await this.s3Service.upload(file);

    const newFile = File.of({
      url,
      filename,
      mimeType: file.mimetype,
    });

    await this.fileRepository.save([newFile]);

    return { id: newFile.id, url: newFile.url };
  }
}
