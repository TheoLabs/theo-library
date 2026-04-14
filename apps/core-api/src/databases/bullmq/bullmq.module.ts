import { Module } from '@nestjs/common';
import { BullModule as NestBullModule } from '@nestjs/bullmq';
import queues from './queues';
import { ConfigsService } from '@configs';

@Module({
  imports: [
    NestBullModule.forRootAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        connection: {
          host: configsService.redis.host,
          port: configsService.redis.port,
        },
      }),
    }),
    NestBullModule.registerQueue(...queues),
  ],
})
export class BullMqModule {}
