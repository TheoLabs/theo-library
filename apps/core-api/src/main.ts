import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(`server is running on ${process.env.PORT ?? 3000}. 🚀`);
  });
})();
