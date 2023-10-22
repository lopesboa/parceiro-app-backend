import { Logger } from '@/common/Logger/infrastructure/types';
import { Inject, InternalServerErrorException } from '@nestjs/common';

import { UserRepository } from '../../domain';
import { ListUserInfoUseCase } from '../types';
import { ListUserInfoInputDTO } from '../dtos';

export class ListUserInfoUseCaseImplementation implements ListUserInfoUseCase {
  constructor(
    @Inject('Logger') private readonly logger: Logger,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ userId, applicationId }: ListUserInfoInputDTO) {
    try {
      const result = await this.userRepository.getUserInformation(
        userId,
        applicationId,
      );

      const {
        user_id,
        first_name,
        last_name,
        last_access,
        is_verified,
        application_id,
        birth_date,
        ...rest
      } = result;

      return {
        ...rest,
        userId: user_id,
        firstName: first_name,
        lastName: last_name,
        lastAccess: last_access,
        isVerified: is_verified,
        applicationId: application_id,
        birthDate: birth_date,
      };
    } catch (error) {
      this.logger.error(
        error,
        'Error while trying to list user information repository:',
        {
          message: error.message,
          stack: error.stack,
        },
      );
      throw new InternalServerErrorException(error.message, error.stack);
    }
  }
}
