import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

export interface Payload {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  public async validateUser(username: string, inputPassword: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const hashPassword = await this.userService.hashPassword(inputPassword, username);

    if (user && user.password === hashPassword) {
      const { id, username } = user;
      return { id, username };
    }

    return null;
  }

  public async login({ id, username }: Payload): Promise<{ accessToken: string }> {
    const payload: Payload = { username, id };

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
