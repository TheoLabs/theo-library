import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TxIdSubscriber, RequestLoggerInterceptor } from '@libs/interceptors';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { CommonModule } from '@common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ConfigsModule, DatabasesModule, CommonModule, EventEmitterModule.forRoot()],
  controllers: [HealthController],
  providers: [
    TxIdSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
