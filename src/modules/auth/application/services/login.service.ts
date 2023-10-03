import { SignInInputDTO } from '../dtos';
import { LoginService } from '../types';
import {
  CreateTokenAdapter,
  HashComparer,
} from '@/common/cryptography/adapters/types';
import { SYSTEM_ROLES } from '@/common/config';
import { UserRepository } from '@/modules/users/domain';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserTokenRepository } from '../../domain/repositories';

@Injectable()
export class LoginServiceImplementation implements LoginService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('UserTokenRepository')
    private readonly userTokenRepository: UserTokenRepository,
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
    //TODO: Check if user is verified before give permissions on login. If user is not verified, send empty
    const { accessToken, refreshToken } =
      await this.createTokenAdapter.getTokens({
        userId: user.userId,
        name: user.firstName,
        permissions: [SYSTEM_ROLES.CAR_OWNER_USER],
      });

    const hashedTokens = await this.createTokenAdapter.createHashedTokens({
      accessToken,
      refreshToken,
    });

    await this.userTokenRepository.update(
      'access_token = $1, refresh_token = $2',
      [hashedTokens.accessToken, hashedTokens.refreshToken, user.userId],
      'user_id = $3',
    );

    return { accessToken, refreshToken };
  }
}
