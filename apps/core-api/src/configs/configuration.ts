import type { RedisOptions } from 'bullmq';
import type { DataSourceOptions } from 'typeorm';

interface AppConfig {
  mysql: DataSourceOptions;
  redis: RedisOptions;
}

export default (env: Record<string, any> = process.env): AppConfig => ({
  mysql: {
    type: 'mysql',
    port: 3306,
    host: env.MYSQL_HOST,
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  },
  redis: {
    host: env.REDIS_HOST,
    port: 6379,
  },
});
