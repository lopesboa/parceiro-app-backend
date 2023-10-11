import { Inject, Injectable } from '@nestjs/common';

import { ListRoleByName } from '../types';
import { RolesRepository } from '../../domain/repositories';
import { UUID } from 'crypto';

@Injectable()
export class ListRoleByNameImplementation implements ListRoleByName {
  constructor(
    @Inject('RolesRepository')
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(roleName: string, applicationId: UUID) {
    return this.rolesRepository.findOne(roleName, applicationId);
  }
}
