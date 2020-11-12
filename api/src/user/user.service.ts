import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Connection, EntityManager, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import { USER_ERROR_RESOURCE } from './user.resource';

export interface CreateValue {
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<IUser>,
    private connection: Connection
  ) {}

  public hashPassword(password: string, username: string): string {
    const shaSum = createHmac('sha1', password + username.toLowerCase());
    return shaSum.update(password).digest('hex');
  }

  public async findById(id: number): Promise<IUser> {
    const user: IUser | undefined = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(USER_ERROR_RESOURCE.USER_ERR_1);
    }

    return user;
  }

  public async findByUsername(username: string): Promise<IUser | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  public async create(createValue: IUser): Promise<void> {
    const { username } = createValue;
    if (await this.isUserExistByUsername(username)) {
      throw new BadRequestException(USER_ERROR_RESOURCE.USER_ERR_2);
    }

    createValue.password = this.hashPassword(createValue.password, createValue.username);

    const userObject = await this.usersRepository.create(createValue);

    await this.usersRepository.save(userObject);
  }

  public async isUserExistByUsername(username: string): Promise<boolean> {
    return (
      (await this.usersRepository.count({
        where: { username }
      })) > 0
    );
  }

  public async isUserExistByIdTransaction(manager: EntityManager, id: number): Promise<boolean> {
    return (await manager.count<IUser>(UserEntity, { where: { id } })) > 0;
  }

  public async checkUserExistByIdTransaction(manager: EntityManager, id: number): Promise<void> {
    if (!(await this.isUserExistByIdTransaction(manager, id))) {
      throw new BadRequestException(USER_ERROR_RESOURCE.USER_ERR_1);
    }
  }

  public async findByIdTransaction(manager: EntityManager, id: number): Promise<IUser> {
    const user: IUser | undefined = await manager.findOne<IUser>(UserEntity, id);
    if (!user) {
      throw new BadRequestException(USER_ERROR_RESOURCE.USER_ERR_1);
    }

    return user;
  }

  public async updateById(id: number, data: Partial<Omit<IUser, 'id'>>): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const { username, password } = data;
      await this.checkUserExistByIdTransaction(manager, id);
      const currentUser = await this.findByIdTransaction(manager, id);

      if (username && username !== currentUser.username) {
        await this.checkUserNotExistByUsernameTransaction(manager, username);
      }

      if (password) {
        data.password = this.hashPassword(password, username ? username : currentUser.username);
      }

      await manager.update<IUser>(UserEntity, id, this.filterNullProperties(<IUser>data));
    });
  }

  public async checkUserNotExistByUsernameTransaction(
    manager: EntityManager,
    username: string
  ): Promise<void> {
    if (await this.isUserExistByUsernameTransaction(manager, username)) {
      throw new BadRequestException(USER_ERROR_RESOURCE.USER_ERR_2);
    }
  }

  public async isUserExistByUsernameTransaction(
    manager: EntityManager,
    username: string
  ): Promise<boolean> {
    return (
      (await manager.count<IUser>(UserEntity, {
        where: { username }
      })) > 0
    );
  }

  public filterNullProperties({ username, password }: IUser): IUser {
    const result: any = {};
    if (typeof username !== 'undefined' && username !== null) {
      result.username = username;
    }

    if (typeof password !== 'undefined' && password !== null) {
      result.password = password;
    }
    return result;
  }

  public async isUserExistById(id: number): Promise<boolean> {
    return (
      (await this.usersRepository.count({
        where: { id }
      })) > 0
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
