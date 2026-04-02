import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';

@Module({
  imports: [ConfigsModule, DatabasesModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
