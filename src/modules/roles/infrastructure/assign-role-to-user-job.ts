import { Job } from 'bull';
import { UUID } from 'crypto';
import { Process, Processor, OnQueueError } from '@nestjs/bull';
import { Inject, UnprocessableEntityException } from '@nestjs/common';

import { EVENTS_NAME } from '@/common/config';
import { AddRoleToUserUseCase, ListRoleByName } from '../application/types';
import { Logger } from '@/common/Logger/infrastructure/types';

@Processor()
export class AssignRoleToUserJob {
  constructor(
    @Inject('AddRoleToUserUseCase')
    private readonly addRoleToUserUseCase: AddRoleToUserUseCase,
    @Inject('Logger') private readonly logger: Logger,
    @Inject('ListRoleByName') private readonly listRoleByName: ListRoleByName,
  ) {}

  @Process(EVENTS_NAME.USER_ROLE_ASSIGNED)
  async handle(
    job: Job<{ applicationId: UUID; roleName: string; userId: UUID }>,
  ) {
    const role = await this.listRoleByName.execute(
      job.data.roleName,
      job.data.applicationId,
    );

    await this.addRoleToUserUseCase.execute({
      applicationId: job.data.applicationId,
      roleId: role.role_id,
      userId: job.data.userId,
    });

    this.logger.info({
      type: EVENTS_NAME.USER_ROLE_ASSIGNED,
      message: 'Role assign to user successfully',
      data: job.data,
    });
  }

  @OnQueueError({ name: EVENTS_NAME.USER_ROLE_ASSIGNED })
  handleError(error: Error) {
    this.logger.error(error, 'Error while trying to assign role to user job:', {
      message: error.message,
      stack: error.stack,
    });
    throw new UnprocessableEntityException(error.message, error.stack);
  }
}
