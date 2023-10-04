import { Inject, Injectable } from '@nestjs/common';

import { UserTokenRepository } from '../../domain/repositories';
import { LogOutService } from '../types';
import { UUID } from 'crypto';

@Injectable()
export class LogOutServiceImplementation implements LogOutService {
  constructor(
    @Inject('UserTokenRepository')
    private readonly userTokenRepository: UserTokenRepository,
  ) {}

  async logout(userId: UUID) {
    await this.userTokenRepository.update(
      'access_token = NULL, refresh_token = NULL, is_active = FALSE',
      [userId],
      'user_id = $1',
    );
  }
}
