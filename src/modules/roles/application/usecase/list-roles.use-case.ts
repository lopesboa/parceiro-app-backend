import { Inject, Injectable } from '@nestjs/common';

import { ListRolesUseCase } from '../types';
import { RolesRepository } from '../../domain/repositories';

@Injectable()
export class ListRolesUseCaseImplementation implements ListRolesUseCase {
  constructor(
    @Inject('RolesRepository')
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(limit: number, offset: number) {
    await this.rolesRepository.getAll(limit, offset);
  }
}
