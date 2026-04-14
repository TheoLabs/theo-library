import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from './typeorm';
import { BullMqModule } from './bullmq';

@Global()
@Module({
  imports: [TypeOrmModule, BullMqModule],
  exports: [TypeOrmModule, BullMqModule],
})
export class DatabasesModule {}
