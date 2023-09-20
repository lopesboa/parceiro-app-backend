/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateTokenAdapter,
  HashComparer,
} from '@/common/cryptography/adapters/types';
import { UserRepository } from '@/modules/users/domain';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUseCase } from '../types';
import { SignInInputDTO } from '../dtos';

@Injectable()
export class SignInUseCaseImplementation implements SignInUseCase {
  constructor(
    @Inject('CryptographAdapter')
    private readonly cryptographAdapter: HashComparer,
    @Inject('CreateTokenAdapter')
    private readonly createTokenAdapter: CreateTokenAdapter,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute({ email, password }: SignInInputDTO) {
    const user = await this.userRepository.findOne({ email });

    console.log('user', user);
    if (!user)
      throw new UnauthorizedException(
        '[SIGN_IN_EXCEPTION]',
        'Email or password incorrect',
      );

    const isValidPassword = await this.cryptographAdapter.compare(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException(
        '[SIGN_IN_EXCEPTION]',
        'Email or password incorrect',
      );
    }
    const {
      password: psw,
      updated_at,
      created_at,
      last_access,
      ...result
    } = user;

    const { accessToken, refreshToken } =
      await this.createTokenAdapter.getTokens({
        userId: result.user_id as any,
        name: result.first_name,
        permissions: [],
      });

    return { accessToken, refreshToken };
  }
}
