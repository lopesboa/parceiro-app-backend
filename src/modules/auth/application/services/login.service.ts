import { UserRepository } from '@/modules/users/domain';
import { SignInInputDTO } from '../dtos';
import { LoginService } from '../types';
import {
  CreateTokenAdapter,
  HashComparer,
} from '@/common/cryptography/adapters/types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LoginServiceImplementation implements LoginService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('CryptographAdapter')
    private readonly cryptographAdapter: HashComparer,
    @Inject('CreateTokenAdapter')
    private readonly createTokenAdapter: CreateTokenAdapter,
  ) {}

  async validateUser({ email, password }: SignInInputDTO) {
    const user = await this.userRepository.findOne({ email });

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

    return {
      userId: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      applicationId: user.application_id,
      tokenId: user.token_id,
    };
  }

  async login(user) {
    const { accessToken, refreshToken } =
      await this.createTokenAdapter.getTokens({
        userId: user.userId,
        name: user.firstName,
        permissions: [],
      });

    return { accessToken, refreshToken };
  }
}
