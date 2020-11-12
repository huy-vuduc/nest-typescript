import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonQuery, CommonQueryValue } from '../common/common.interface';
import { CommonParam } from '../common/common.resource';
import {
  commonIdValidateSchema,
  commonLimitValidateSchema,
  commonOffsetValidateSchema
} from '../common/common.validation';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import {
  ProductCreateOrUpdateResponse,
  ProductGetByIdResponse,
  ProductGetManyResponse,
  ProductRequestBody
} from './product.interface';
import { PRODUCT_ADMIN_ROOT_PATH, ProductPath } from './product.resource';
import { ProductService } from './product.service';
import { createProductValidationSchema, updateProductValidationSchema } from './product.validation';

@UseGuards(JwtAuthGuard)
@Controller(PRODUCT_ADMIN_ROOT_PATH)
export class ProductAdminController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async create(
    @Body(new JoiValidationPipe(createProductValidationSchema))
    data: ProductRequestBody
  ): Promise<ProductCreateOrUpdateResponse> {
    const { id } = await this.productService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      id
    };
  }

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

  @Patch(ProductPath.SPECIFY)
  public async updateById(
    @Param(
      CommonParam.ID,
      new JoiValidationPipe(commonIdValidateSchema),
      new DefaultValuePipe(CommonQueryValue.FAILED_ID),
      ParseIntPipe
    )
    id: number,
    @Body(new JoiValidationPipe(updateProductValidationSchema))
    data: ProductRequestBody
  ): Promise<ProductCreateOrUpdateResponse> {
    const product = await this.productService.updateById(id, data);

    return {
      statusCode: HttpStatus.OK,
      id: product.id
    };
  }

  @Delete(ProductPath.SPECIFY)
  public async deleteById(
    @Param(
      CommonParam.ID,
      new JoiValidationPipe(commonIdValidateSchema),
      new DefaultValuePipe(CommonQueryValue.FAILED_ID),
      ParseIntPipe
    )
    id: number
  ): Promise<void> {
    await this.productService.deleteById(id);
  }
}
