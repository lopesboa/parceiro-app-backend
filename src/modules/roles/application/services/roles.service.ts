import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { RolesService } from '../types';
import { CreateRoleInputDTO } from '../dtos';
import { RolesRepository } from '../../domain/repositories';
import { Logger } from '@/common/Logger/infrastructure/types';

@Injectable()
export class RolesServiceImplementation implements RolesService {
  constructor(
    @Inject('RolesRepository')
    private readonly rolesRepository: RolesRepository,
    @Inject('Logger') private readonly logger: Logger,
  ) {}

  async createRoleHandler({
    roleName,
    applicationId,
    permissions,
  }: CreateRoleInputDTO) {
    try {
      return await this.rolesRepository.save({
        role_name: roleName,
        application_id: applicationId,
        permissions: permissions as unknown as string[],
      });
    } catch (error) {
      console.log({ error });
      this.logger.error(error, 'Error while trying to create role', {
        message: error.message,
        stack: error.stack,
      });
      throw new BadRequestException(error, 'Error while trying to create role');
    }
  }
}
