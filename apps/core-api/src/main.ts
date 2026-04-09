import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';
import compression from 'compression';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.use(compression());

  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(`server is running on ${process.env.PORT ?? 3000}. 🚀`);
  });
})();
