import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import {
  CreateUserUseCase,
  ListUserInfoUseCase,
} from '../../application/types';
import { CreateUserInputDTO } from '../../application/dtos';
import { AddRoleToUserUseCase } from '@/modules/roles/application/types';
import { AddRoleToUserInputDTO } from '@/modules/roles/application/dtos';
import {
  AccessTokenGuard,
  Roles,
  RolesGuard,
} from '@/modules/auth/presentation';
import { ALL_PERMISSIONS } from '@/common/config';

@Controller('users')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('AddRoleToUserUseCase')
    private readonly addRoleToUserUseCase: AddRoleToUserUseCase,
    @Inject('ListUserInfoUseCase')
    private readonly listUserInfoUseCase: ListUserInfoUseCase,
  ) {}

  @Post('register')
  signUp(@Body() data: CreateUserInputDTO) {
    return this.createUserUseCase.execute(data);
  }

  @Post('roles')
  assignRoleToUser(@Body() data: AddRoleToUserInputDTO) {
    this.addRoleToUserUseCase.execute(data);
  }

  @Roles(...ALL_PERMISSIONS)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('info')
  getUserInformation(@Request() req) {
    return this.listUserInfoUseCase.execute({
      userId: req.user['userId'],
      applicationId: req.user['applicationId'],
    });
  }
}
