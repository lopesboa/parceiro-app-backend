import { Inject, Injectable } from '@nestjs/common';

import { CreateRealmUseCase } from '../types';
import { RealmsRepository } from '../../domain/repositories';
import { CreateRealmInputDTO } from '../dtos';

@Injectable()
export class CreateRealmUseCaseImplementation implements CreateRealmUseCase {
  constructor(
    @Inject('RealmsRepository')
    private readonly realmsRepository: RealmsRepository,
  ) {}

  async execute({ name, description }: CreateRealmInputDTO) {
    await this.realmsRepository.save({ name, description });
  }
}
