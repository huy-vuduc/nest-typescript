import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express-serve-static-core';

import { AuthService, Payload } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface LoginRequest extends ExpressRequest {
  user: Payload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Request() req: LoginRequest): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }
}
