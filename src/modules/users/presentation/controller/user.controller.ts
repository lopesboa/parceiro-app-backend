import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/types';

@Controller('users')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('register')
  signUp(@Body() createUserDTO) {
    return this.createUserUseCase.execute(createUserDTO);
  }
}
