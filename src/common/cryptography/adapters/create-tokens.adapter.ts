import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import {
  EncryptAdapter,
  HashComparer,
  Hash,
  CreateTokenAdapter,
} from './types';
import {
  CreateHashedTokensInputDTO,
  GetTokensInputDTO,
  RefreshTokenInputDTO,
} from './dtos';

@Injectable()
export class CreateTokenAdapterImplementation implements CreateTokenAdapter {
  constructor(
    @Inject('CryptographAdapter')
    private readonly encryptAdapter: HashComparer & EncryptAdapter & Hash,
  ) {}

  async createHashedTokens({
    refreshToken,
    accessToken,
  }: CreateHashedTokensInputDTO) {
    const hashedRefreshToken = await this.encryptAdapter.hash(refreshToken);
    const hashedAccessToken = await this.encryptAdapter.hash(accessToken);

    return {
      accessToken: hashedAccessToken,
      refreshToken: hashedRefreshToken,
    };
  }

  async refreshTokens({
    tokenToRefresh,
    refreshToken,
    userId,
    name,
    permissions,
  }: RefreshTokenInputDTO) {
    //TODO: compare the token before encrypting it
    if (!tokenToRefresh) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await this.encryptAdapter.compare(
      tokenToRefresh,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens({ userId, name, permissions });

    return tokens;
  }

  async getTokens({ userId, name, permissions }: GetTokensInputDTO) {
    const accessToken = this.encryptAdapter.encrypt(
      {
        sub: userId,
        name,
        scopes: permissions,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
        issuer: 'Parceiro App',
        noTimestamp: true,
      },
    );

    const refreshToken = this.encryptAdapter.encrypt(
      {
        sub: userId,
        name,
        scopes: permissions,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_REFRESH_EXPIRE_IN,
        issuer: 'Parceiro App',
        noTimestamp: true,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
