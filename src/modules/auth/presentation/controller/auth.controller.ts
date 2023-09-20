import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInUseCase } from '../../application/types';
import { LoginResponseDTO, SignInInputDTO } from '../../application/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SignInUseCase') private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: SignInInputDTO): Promise<LoginResponseDTO> {
    return this.signInUseCase.execute(loginDto);
  }
}
