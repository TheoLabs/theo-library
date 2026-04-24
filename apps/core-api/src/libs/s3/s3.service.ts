import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { S3Client, HeadBucketCommand, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigsService } from '@configs';
import { v7 as uuid } from 'uuid';

@Injectable()
export class S3Service implements OnModuleInit {
  private readonly logger = new Logger(S3Service.name);
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configsService: ConfigsService) {
    this.bucket = this.configsService.s3.bucket;
    this.s3 = new S3Client({
      endpoint: this.configsService.s3.endpoint,
      region: this.configsService.aws.region,
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.configsService.aws.accessKey,
        secretAccessKey: this.configsService.aws.secretKey,
      },
    });
  }

  async onModuleInit() {
    await this.ensureBucket();
  }

  private async ensureBucket() {
    try {
      await this.s3.send(new HeadBucketCommand({ Bucket: this.bucket }));
    } catch {
      await this.s3.send(new CreateBucketCommand({ Bucket: this.bucket }));
      this.logger.log(`버킷 "${this.bucket}" 생성 완료`);
    }
  }

  async upload(file: Express.Multer.File): Promise<{ key: string; url: string }> {
    const key = `${uuid()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const url = this.configsService.isLocal()
      ? `http://localhost:4566/${this.bucket}/${key}`
      : `https://${this.bucket}.s3.amazonaws.com/${key}`;

    return { key, url };
  }
}
