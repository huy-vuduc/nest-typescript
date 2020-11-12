import { ColumnOptions } from 'typeorm';

export const CommonColumn = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  DELETED_AT: 'deleted_at'
};

export const CommonColumnOptions: ColumnOptions = {
  collation: 'utf8mb4_unicode_ci',
  charset: 'utf8mb4'
};

export const CommonParam = {
  ID: 'id'
};

export const FILE_DESTINATION_FOLDER = './files';
