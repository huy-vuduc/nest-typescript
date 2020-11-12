import Request from './HandleRequest';
import { HTTP_RESPONSE_CODE } from '../resource/common.resource';

export async function getProductList() {
  const request = new Request();
  const { statusCode, products } = await request
    .get('/admin/products')
    .catch(({ response }) => response);

  if (statusCode === HTTP_RESPONSE_CODE.OK) {
    return products;
  }
  return [];
}

export async function getProductCategoryList() {
  const request = new Request();
  const { statusCode, productCategories } = await request
    .get('/admin/product-categories')
    .catch(({ response }) => response);

  if (statusCode === HTTP_RESPONSE_CODE.OK) {
    return productCategories;
  }
  return [];
}
