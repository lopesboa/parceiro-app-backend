import { CreateTokenAdapter } from '@/common/cryptography/adapters/types';
import { Inject, Injectable } from '@nestjs/common';
import { UserTokenRepository } from '../../domain/repositories';

@Injectable()
export class RefreshTokenServiceImplementation {
  constructor(
    @Inject('UserTokenRepository')
    private readonly userTokenRepository: UserTokenRepository,
    @Inject('CreateTokenAdapter')
    private readonly createTokenAdapter: CreateTokenAdapter,
  ) {}

  async refreshToken(user) {
    const { accessToken, refreshToken } =
      await this.createTokenAdapter.refreshTokens({
        name: user.name,
        permissions: user.scopes,
        refreshToken: user.refreshToken,
        userId: user.userId,
        tokenToRefresh: user.accessToken,
      });

    await this.userTokenRepository.update(
      'access_token = $1, refresh_token = $2, is_active = TRUE',
      [accessToken, refreshToken, user.userId],
      'user_id = $3',
    );

    return { accessToken, refreshToken };
  }
}
