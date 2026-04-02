import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ConfigsModule, DatabasesModule, EventEmitterModule.forRoot()],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
