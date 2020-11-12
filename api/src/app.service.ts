import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Connection } from 'typeorm';

import { IUser } from './user/user.interface';
import { UserService } from './user/user.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService, private readonly connection: Connection) {}

  getHello(): string {
    return "Hello World! I'm Groot";
  }

  async onApplicationBootstrap(): Promise<void> {
    Logger.log('Start migration...');
    await this.connection.runMigrations({ transaction: 'all' });
    Logger.log('Start migration... Done!');

    console.log(`The application has been bootstraped.`);
    if (!(await this.userService.isUserExistById(1))) {
      const user: IUser = {
        id: 1,
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!
      };
      await this.userService.create(user);
      console.log(`Account has been created.`);
    }
  }
}
