import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from '../common/common.entity';
import { CommonColumn, CommonColumnOptions } from '../common/common.resource';
import { ProductCategoryEntity } from '../product-category/product-category.entity';
import { ProductCategory } from '../product-category/product-category.interface';
import { PRODUCT_TABLE, ProductColumn } from './product.resource';

@Entity({ name: PRODUCT_TABLE })
export class ProductEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ name: CommonColumn.ID })
  public id!: number;

  @Column({
    name: ProductColumn.NAME,
    type: 'varchar',
    length: 100,
    ...CommonColumnOptions
  })
  public name!: string;

  @Column({
    name: ProductColumn.DESCRIPTION,
    type: 'text',
    nullable: true,
    ...CommonColumnOptions
  })
  public description!: string | null;

  @Column({
    name: ProductColumn.PRICE,
    type: 'float'
  })
  public price!: number;

  @Column({
    name: ProductColumn.CATEGORY_ID,
    type: 'int'
  })
  public categoryId!: number;

  @ManyToOne(() => ProductCategoryEntity, ({ products }) => products)
  @JoinColumn({ name: ProductColumn.CATEGORY_ID, referencedColumnName: CommonColumn.ID })
  public category!: ProductCategory;
}
