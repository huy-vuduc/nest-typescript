import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { CommonColumn } from './common.resource';

export abstract class CommonEntity {
  @CreateDateColumn({ name: CommonColumn.CREATED_AT })
  public createdAt!: Date;

  @UpdateDateColumn({ name: CommonColumn.UPDATED_AT })
  public updatedAt!: Date;

  @DeleteDateColumn({ name: CommonColumn.DELETED_AT })
  public deletedAt!: Date;
}
