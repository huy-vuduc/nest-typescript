export interface CommonColumn {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CommonResponse {
  statusCode: number;
}

export const CommonQuery = {
  OFFSET: 'offset',
  LIMIT: 'limit',
  KEYWORD: 'keyword'
};

export const CommonQueryValue = {
  OFFSET: 0,
  LIMIT: 20,
  FAILED_ID: 0
};
