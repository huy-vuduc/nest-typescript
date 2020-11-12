import { CommonColumn, CommonResponse } from '../common/common.interface';
import { ProductEntity } from './product.entity';

export type Product = ProductEntity;

export type ProductRequestBody = WithOptional<
  Omit<Product, keyof CommonColumn | 'id'>,
  'description'
>;

export interface ProductCreateOrUpdateResponse extends CommonResponse {
  id: number;
}

export interface ProductGetManyResponse extends CommonResponse {
  products: Product[];
  total: number;
}

export interface ProductGetByIdResponse extends CommonResponse {
  product: Product;
}
