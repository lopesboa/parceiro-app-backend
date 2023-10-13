import { Job } from 'bull';
import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { Process, Processor, OnQueueError } from '@nestjs/bull';

import { EVENTS_NAME } from '@/common/config';
import { UserRepository } from '@/modules/users/domain';
import { Logger } from '@/common/Logger/infrastructure/types';
import { CreateUserTokenHandlerInput } from '../../application';
import { UserTokenRepository } from '../../domain/repositories';
import { CreateTokenAdapter } from '@/common/cryptography/adapters/types';

@Processor()
export class CreateUserTokenJob {
  constructor(
    @Inject('CreateTokenAdapter')
    private readonly createTokenAdapter: CreateTokenAdapter,
    @Inject('UserTokenRepository')
    private readonly userTokenRepository: UserTokenRepository,
    @Inject('Logger') private readonly logger: Logger,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  @Process(EVENTS_NAME.USER_CREATED)
  async handle(job: Job<CreateUserTokenHandlerInput>) {
    //TODO: Check the way to add permissions to user when user verify the email
    const { accessToken, refreshToken } =
      await this.createTokenAdapter.getTokens({
        userId: job.data.userId,
        name: job.data.firstName,
        permissions: [],
      });
    const hashedTokens = await this.createTokenAdapter.createHashedTokens({
      accessToken,
      refreshToken,
    });

    const userToken = await this.userTokenRepository.save({
      user_id: job.data.userId,
      is_active: true,
      access_token: hashedTokens.accessToken,
      refresh_token: hashedTokens.refreshToken,
    });

    await this.userRepository.update(
      'token_id = $1, last_access = now()',
      [userToken.token_id, job.data.userId],
      'user_id = $2',
    );

    this.logger.info({
      type: EVENTS_NAME.USER_CREATED,
      message: 'UserToken created successfully',
      userId: job.data.userId,
    });
  }

  @OnQueueError({ name: EVENTS_NAME.USER_CREATED })
  handleError(error: Error) {
    this.logger.error(error, 'Error while trying to create user token job:', {
      message: error.message,
      stack: error.stack,
    });
    throw new UnprocessableEntityException(error.message, error.stack);
  }
}
