import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { USER_ENTITY_RESOURCE } from './user.resource';

@Entity({ name: USER_ENTITY_RESOURCE.TABLE_NAME })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'nvarchar', length: 50 })
  username!: string;

  @Column({
    type: 'nchar',
    length: 40
  })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
