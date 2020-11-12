import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IUser } from './user.interface';
import { USR_CONTROLLER_RESOURCE } from './user.resource';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller(USR_CONTROLLER_RESOURCE.PATH.ROOT)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(`/:${USR_CONTROLLER_RESOURCE.PARAM.ID}`)
  public async updateById(
    @Param(USR_CONTROLLER_RESOURCE.PARAM.ID) id: number,
    @Body() updateValue: Partial<Omit<IUser, 'id'>>
  ): Promise<void> {
    return this.userService.updateById(id, updateValue);
  }
}
