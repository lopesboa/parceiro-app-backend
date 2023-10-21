import { Inject, InternalServerErrorException } from '@nestjs/common';

import { AddRoleToUserUseCase } from '../types';
import { Logger } from '@/common/Logger/infrastructure/types';
import { UsersToRolesRepository } from '../../domain/repositories';

export class AddRoleToUserUseCaseImplementation
  implements AddRoleToUserUseCase
{
  constructor(
    @Inject('Logger') private readonly logger: Logger,
    @Inject('UsersToRolesRepository')
    private readonly usersToRolesRepository: UsersToRolesRepository,
  ) {}

  async execute(params) {
    try {
      await this.usersToRolesRepository.save({
        user_id: params.userId,
        role_id: params.roleId,
        application_id: params.applicationId,
      });
    } catch (error) {
      this.logger.error(
        error,
        'Error while trying to assign role to user repository:',
        {
          message: error.message,
          stack: error.stack,
        },
      );
      throw new InternalServerErrorException(error.message, error.stack);
    }
  }
}
