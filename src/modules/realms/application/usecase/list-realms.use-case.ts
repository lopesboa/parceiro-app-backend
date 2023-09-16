import { Inject, Injectable } from '@nestjs/common';

import { ListRealmUseCase } from '../types';
import { ListRealmInputDTO } from '../dtos';
import { RealmsRepository } from '../../domain/repositories';

@Injectable()
export class ListRealmUseCaseImplementation implements ListRealmUseCase {
  constructor(
    @Inject('RealmsRepository')
    private readonly realmsRepository: RealmsRepository,
  ) {}

  async execute({ limit, offset }: ListRealmInputDTO) {
    return this.realmsRepository.getAll(limit, offset);
  }
}
