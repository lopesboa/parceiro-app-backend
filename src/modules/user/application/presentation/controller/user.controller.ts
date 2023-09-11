import { CreateUserUseCase } from '@/modules/user/domain';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('user')
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
