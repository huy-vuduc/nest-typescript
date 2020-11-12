import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConnectionOptions } from 'typeorm';

import { isProductionMode, isReviewDatabase } from '../common/common.helper';

export function getDatabaseConfig(): TypeOrmModuleOptions & ConnectionOptions {
  if (isReviewDatabase()) {
    return {
      type: 'mysql',
      url: process.env.JAWSDB_URL,
      entities: ['./dist/**/*.entity.js'],
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
      charset: 'utf8mb4'
    };
  }

  if (isProductionMode()) {
    return {
      type: 'mysql',
      url: process.env.JAWSDB_URL,
      entities: ['./dist/**/*.entity.js'],
      migrations: ['dist/migration/**/*.js'],
      cli: {
        migrationsDir: 'src/migration'
      },
      logging: true,
      autoLoadEntities: true,
      charset: 'utf8mb4'
    };
  }

  return {
    type: 'mysql',
    host: process.env.DB_MYSQL_HOST,
    port: parseInt(process.env.DB_MYSQL_PORT || '3000'),
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    entities: ['./dist/**/*.entity.js'],
    logging: !isProductionMode(),
    synchronize: !isProductionMode(),
    autoLoadEntities: true,
    charset: 'utf8mb4'
  };
}
