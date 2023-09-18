import { Job } from 'bull';
import { UUID } from 'crypto';
import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { Process, Processor, OnQueueError } from '@nestjs/bull';

import { CreateRolesUseCase } from '../application/types';
import { Logger } from '@/common/Logger/infrastructure/types';
import { EVENTS_NAME } from '@/common/config';

@Processor()
export class CreateRolesRoleJob {
  constructor(
    @Inject('CreateRolesUseCase')
    private readonly createRolesUseCase: CreateRolesUseCase,
    @Inject('Logger') private readonly logger: Logger,
  ) {}

  @Process(EVENTS_NAME.REALM_CREATED)
  async handle(job: Job<{ applicationId: UUID }>) {
    await this.createRolesUseCase.execute(job.data.applicationId);
    this.logger.info({
      type: EVENTS_NAME.REALM_CREATED,
      message: 'Role created successfully',
      applicationId: job.data.applicationId,
    });
  }

  @OnQueueError({ name: EVENTS_NAME.REALM_CREATED })
  handleError(error: Error) {
    this.logger.error(error, 'Error while trying to create roles job:', {
      message: error.message,
      stack: error.stack,
    });
    throw new UnprocessableEntityException(error.message, error.stack);
  }
}
