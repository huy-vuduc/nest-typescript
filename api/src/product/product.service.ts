import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { ProductEntity } from './product.entity';
import { Product, ProductRequestBody } from './product.interface';
import { ProductError } from './product.resource';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<Product>
  ) {}

  public async create(data: ProductRequestBody): Promise<Product> {
    const productEntity = this.productRepository.create(data);

    return this.productRepository.save(productEntity);
  }

  public async getMany(offset: number, limit: number, keyword?: string): Promise<Product[]> {
    return this.productRepository.find({
      where: keyword ? [{ name: Like(`%${keyword}%`) }, { description: Like(`%${keyword}%`) }] : {},
      relations: ['category'],
      skip: offset,
      take: limit,
      cache: true
    });
  }

  public async getById(id: number): Promise<Product> {
    const result = await this.productRepository.findOne(id, {
      cache: true,
      relations: ['category']
    });
    if (!result) {
      throw new BadRequestException(ProductError.ERR_1);
    }

    return result;
  }

  public async updateById(id: number, data: ProductRequestBody): Promise<Product> {
    const productEntity = await this.getById(id);

    return this.productRepository.save({ ...productEntity, ...data });
  }

  public async deleteById(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }

  public async getAmount(keyword?: string): Promise<number> {
    return this.productRepository.count({
      where: keyword ? [{ name: Like(`%${keyword}%`) }, { description: Like(`%${keyword}%`) }] : {},
      cache: true
    });
  }
}
