import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { ListRoleByName } from '../types';
import { RolesRepository } from '../../domain/repositories';
import { UUID } from 'crypto';
import { Logger } from '@/common/Logger/infrastructure/types';

@Injectable()
export class ListRoleByNameImplementation implements ListRoleByName {
  constructor(
    @Inject('RolesRepository')
    private readonly rolesRepository: RolesRepository,
    @Inject('Logger') private readonly logger: Logger,
  ) {}

  async execute(roleName: string, applicationId: UUID) {
    try {
      const result = await this.rolesRepository.findOne(
        roleName,
        applicationId,
      );

      if (!result) {
        throw new NotFoundException('Role not found');
      }

      return result;
    } catch (error) {
      this.logger.fatal(error, 'error while trying to find role name');
      throw new BadRequestException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to find role name',
      );
    }
  }
}
