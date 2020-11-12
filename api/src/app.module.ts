import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getDatabaseConfig } from './mysql/mysql.helper';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

enum DatabaseType {
  LOCAL = 'local',
  REVIEW = 'review',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

enum EnvFileName {
  LOCAL = 'local.env',
  REVIEW = 'review.env',
  STAGING = 'staging.env',
  PRODUCTION = 'production.env'
}

function getEnvFilePath(): string {
  let configFolderPath = './config/';
  switch (process.env.DB_TYPE) {
    case DatabaseType.REVIEW:
      configFolderPath += EnvFileName.REVIEW;
      break;
    case DatabaseType.STAGING:
      configFolderPath += EnvFileName.STAGING;
      break;
    case DatabaseType.PRODUCTION:
      configFolderPath += EnvFileName.PRODUCTION;
      break;
    default:
      configFolderPath += EnvFileName.LOCAL;
      break;
  }

  return configFolderPath;
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'files')
    }),
    ConfigModule.forRoot({ envFilePath: getEnvFilePath(), isGlobal: true }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    AuthModule,
    UserModule,
    ProductCategoryModule,
    ProductModule,
    ServiceModule,
    ServiceCategoryModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
