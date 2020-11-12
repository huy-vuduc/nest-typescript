import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getImageFileDestination, getImageFilename, imageFileFilter } from './upload.helper';
import { MultiUploadedFileResponse, SingleUploadedFileResponse } from './upload.interface';
import { FILE_SIZE, UPLOAD_CONTROLLER_RESOURCE } from './upload.resource';

@UseGuards(JwtAuthGuard)
@Controller(UPLOAD_CONTROLLER_RESOURCE.PATH.ROOT)
export class UploadController {
  @Post(UPLOAD_CONTROLLER_RESOURCE.PATH.PRODUCT_CATEGORY)
  @UseInterceptors(
    FileInterceptor(UPLOAD_CONTROLLER_RESOURCE.BODY.PRODUCT_CATEGORY, {
      fileFilter: imageFileFilter,
      limits: { fileSize: FILE_SIZE.PICTURE },
      storage: diskStorage({
        destination: getImageFileDestination,
        filename: getImageFilename
      })
    })
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async uploadedProductCategoryImage(
    @UploadedFile() file: any
  ): Promise<SingleUploadedFileResponse> {
    return {
      originalName: file.originalname,
      filename: file.filename,
      status: HttpStatus.CREATED
    };
  }

  @Post(UPLOAD_CONTROLLER_RESOURCE.PATH.SERVICE_CATEGORY)
  @UseInterceptors(
    FileInterceptor(UPLOAD_CONTROLLER_RESOURCE.BODY.SERVICE_CATEGORY, {
      fileFilter: imageFileFilter,
      limits: { fileSize: FILE_SIZE.PICTURE },
      storage: diskStorage({
        destination: getImageFileDestination,
        filename: getImageFilename
      })
    })
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async uploadedServiceCategoryImage(
    @UploadedFile() file: any
  ): Promise<SingleUploadedFileResponse> {
    return {
      originalName: file.originalname,
      filename: file.filename,
      status: HttpStatus.CREATED
    };
  }

  @Post(UPLOAD_CONTROLLER_RESOURCE.PATH.SERVICE)
  @UseInterceptors(
    FileInterceptor(UPLOAD_CONTROLLER_RESOURCE.BODY.SERVICE, {
      fileFilter: imageFileFilter,
      limits: { fileSize: FILE_SIZE.PICTURE },
      storage: diskStorage({
        destination: getImageFileDestination,
        filename: getImageFilename
      })
    })
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async uploadedServiceImage(@UploadedFile() file: any): Promise<SingleUploadedFileResponse> {
    return {
      originalName: file.originalname,
      filename: file.filename,
      status: HttpStatus.CREATED
    };
  }

  @Post(UPLOAD_CONTROLLER_RESOURCE.PATH.PRODUCT)
  @UseInterceptors(
    FilesInterceptor(UPLOAD_CONTROLLER_RESOURCE.BODY.PRODUCT, 20, {
      fileFilter: imageFileFilter,
      limits: { fileSize: FILE_SIZE.PICTURE },
      storage: diskStorage({
        destination: getImageFileDestination,
        filename: getImageFilename
      })
    })
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async uploadedMultipleProductImages(
    @UploadedFiles() files: any
  ): Promise<MultiUploadedFileResponse> {
    const uploadedImages: { originalName: any; filename: any }[] = [];
    files.forEach((file: { originalname: any; filename: any }) => {
      const fileResponse = {
        originalName: file.originalname,
        filename: file.filename
      };
      uploadedImages.push(fileResponse);
    });
    return {
      data: uploadedImages,
      status: HttpStatus.CREATED
    };
  }
}
