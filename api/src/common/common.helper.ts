import fs from 'fs';

import { FILE_DESTINATION_FOLDER } from './common.resource';

export function isProductionMode(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isReviewDatabase(): boolean {
  return process.env.DB_TYPE === 'review';
}

export function getImageName(id: number, target: string): Array<string> {
  const directory = `${FILE_DESTINATION_FOLDER}/${target}/${id}`;
  const fileName: string[] = [];

  if (!fs.existsSync(directory)) {
    return fileName;
  }
  const fileObj: string[] = fs.readdirSync(directory);
  if (!fileObj) return fileName;

  fileObj.forEach((file) => {
    fileName.push(file);
  });

  return fileName;
}
