import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { UploadController } from './upload.controller';

@Global()
@Module({
  imports: [MulterModule.register({ dest: './tmp' })],
  controllers: [UploadController]
})
export class UploadModule {}
