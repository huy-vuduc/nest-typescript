import { BadRequestException } from '@nestjs/common';
import fs from 'fs';
import { extname } from 'path';

import { UPLOAD_COMMON_FOLDER_PATH } from './upload.resource';

type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void;
type ImageDestinationCallback = (error: Error | null, destination: string) => void;
type ImageFileNameCallback = (error: Error | null, destination: string) => void;

export function imageFileFilter(
  req: Express.CustomRequest,
  { originalname }: Express.Multer.File,
  callback: FileFilterCallback
): void {
  if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Chỉ chấp nhận tệp tin ảnh!'), false);
  }

  callback(null, true);
}

export function getImageFileDestination(
  req: Express.CustomRequest | any,
  file: Express.Multer.File,
  callback: ImageDestinationCallback
): void {
  const targetFolder = getDestinationFolder(req.url);
  const id = req.params!.id;
  const destination_path = `${UPLOAD_COMMON_FOLDER_PATH}/${targetFolder}/${id}`;
  if (!fs.existsSync(destination_path)) {
    fs.mkdirSync(destination_path, { recursive: true });
  }

  console.log(fs.readdirSync(destination_path).indexOf(file.originalname));

  callback(null, destination_path);
}

export function getImageFilename(
  req: Express.CustomRequest | any,
  file: Express.Multer.File | any,
  callback: ImageFileNameCallback
): void {
  const id = req.params.id;
  const fileExtName = extname(file.originalname);
  const fileName = id.toString() + fileExtName;
  callback(null, fileName);
}

const getDestinationFolder = (url: string): string => {
  return url.split('/')[3];
};
