import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateUserUseCase } from '../../application/types';
import { CreateUserInputDTO } from '../../application/dtos';
import { AddRoleToUserUseCase } from '@/modules/roles/application/types';
import { AddRoleToUserInputDTO } from '@/modules/roles/application/dtos';

@Controller('users')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('AddRoleToUserUseCase')
    private readonly addRoleToUserUseCase: AddRoleToUserUseCase,
  ) {}

  @Post('register')
  signUp(@Body() data: CreateUserInputDTO) {
    return this.createUserUseCase.execute(data);
  }

  @Post('roles')
  assignRoleToUser(@Body() data: AddRoleToUserInputDTO) {
    this.addRoleToUserUseCase.execute(data);
  }
}
