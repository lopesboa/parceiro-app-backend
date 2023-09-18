import { Inject, Injectable } from '@nestjs/common';

import { CreateRolesUseCase } from '../types';
import { RolesRepository } from '../../domain/repositories';
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  USER_ROLE_PERMISSIONS,
  USER_WITH_GARAGE_ROLE_PERMISSIONS,
} from '@/common/config';
import { UUID } from 'crypto';

@Injectable()
export class CreateRolesUseCaseImplementation implements CreateRolesUseCase {
  constructor(
    @Inject('RolesRepository')
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(applicationId: UUID) {
    const superAdminRolePromise = this.rolesRepository.save({
      application_id: applicationId,
      name: SYSTEM_ROLES.SUPER_ADMIN,
      permissions: ALL_PERMISSIONS as unknown as string[],
    });

    const carOwnerUserRolePromise = this.rolesRepository.save({
      application_id: applicationId,
      name: SYSTEM_ROLES.CAR_OWNER_USER,
      permissions: USER_ROLE_PERMISSIONS,
    });

    const garageOwnerUserRolePromise = this.rolesRepository.save({
      application_id: applicationId,
      name: SYSTEM_ROLES.GARAGE_OWNER_USER,
      permissions: USER_WITH_GARAGE_ROLE_PERMISSIONS,
    });

    await Promise.allSettled([
      superAdminRolePromise,
      carOwnerUserRolePromise,
      garageOwnerUserRolePromise,
    ]);
  }
}
