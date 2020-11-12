import { HttpStatus } from '@nestjs/common';

export interface SingleUploadedFileResponse {
  originalName: string;
  filename: string;
  status: HttpStatus.CREATED;
}

interface FileInfo {
  originalName: any;
  filename: any;
}

export interface MultiUploadedFileResponse {
  data: Array<FileInfo>;
  status: HttpStatus.CREATED;
}
