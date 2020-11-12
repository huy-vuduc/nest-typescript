import Joi from '@hapi/joi';

import { Product } from './product.interface';

const productValidationSchema = Joi.object<Product>({
  name: Joi.string()
    .max(100)
    .messages({
      'string.base': 'Tên sản phẩm phải là chuỗi.',
      'string.max': 'Tên sản phẩm không quá 100 kí tự.'
    })
    .required(),
  description: Joi.string().messages({
    'string.base': 'Tên sản phẩm phải là chuỗi.'
  }),
  price: Joi.string()
    .required()
    .pattern(/[0-9]+/)
    .message('Giá sản phẩm phải là số.'),
  categoryId: Joi.string()
    .required()
    .pattern(/[0-9]+/)
    .message('categoryId phải là số.')
});

export const createProductValidationSchema = productValidationSchema;

export const updateProductValidationSchema = productValidationSchema.concat(
  Joi.object<Product>({
    name: Joi.optional(),
    description: Joi.optional(),
    price: Joi.optional(),
    categoryId: Joi.optional()
  })
);
