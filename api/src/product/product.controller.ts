import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';

import { CommonQuery, CommonQueryValue } from '../common/common.interface';
import { CommonParam } from '../common/common.resource';
import {
  commonIdValidateSchema,
  commonLimitValidateSchema,
  commonOffsetValidateSchema
} from '../common/common.validation';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ProductGetByIdResponse, ProductGetManyResponse } from './product.interface';
import { PRODUCT_ROOT_PATH, ProductPath } from './product.resource';
import { ProductService } from './product.service';

@Controller(PRODUCT_ROOT_PATH)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getMany(
    @Query(
      CommonQuery.OFFSET,
      new JoiValidationPipe(commonOffsetValidateSchema),
      new DefaultValuePipe(CommonQueryValue.OFFSET),
      ParseIntPipe
    )
    offset: number,
    @Query(
      CommonQuery.LIMIT,
      new JoiValidationPipe(commonLimitValidateSchema),
      new DefaultValuePipe(CommonQueryValue.LIMIT),
      ParseIntPipe
    )
    limit: number,
    @Query(CommonQuery.KEYWORD, new DefaultValuePipe(undefined)) keyword: string
  ): Promise<ProductGetManyResponse> {
    const products = await this.productService.getMany(offset, limit, keyword);
    const total = await this.productService.getAmount(keyword);

    return {
      statusCode: HttpStatus.OK,
      products,
      total
    };
  }

  @Get(ProductPath.SPECIFY)
  public async getById(
    @Param(
      CommonParam.ID,
      new JoiValidationPipe(commonIdValidateSchema),
      new DefaultValuePipe(CommonQueryValue.FAILED_ID),
      ParseIntPipe
    )
    id: number
  ): Promise<ProductGetByIdResponse> {
    const product = await this.productService.getById(id);

    return {
      statusCode: HttpStatus.OK,
      product
    };
  }
}
