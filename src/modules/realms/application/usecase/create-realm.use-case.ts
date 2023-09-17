import { EventEmitter } from 'events';
import { Inject, Injectable } from '@nestjs/common';

import { CreateRealmUseCase } from '../types';
import { RealmsRepository } from '../../domain/repositories';
import { CreateRealmInputDTO } from '../dtos';
import { EVENTS_NAME } from '@/common/config';
import { CreateRoleEvent } from '@/modules/roles/application/events';

@Injectable()
export class CreateRealmUseCaseImplementation implements CreateRealmUseCase {
  constructor(
    @Inject('RealmsRepository')
    private readonly realmsRepository: RealmsRepository,
    @Inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {}

  async execute({ name, description }: CreateRealmInputDTO) {
    const result = await this.realmsRepository.save({ name, description });

    this.eventEmitter.emit(
      EVENTS_NAME.REALM_CREATED,
      new CreateRoleEvent(result.application_id),
    );
    return result;
  }
}
