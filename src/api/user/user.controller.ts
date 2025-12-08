import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @AllowAnonymous()
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
