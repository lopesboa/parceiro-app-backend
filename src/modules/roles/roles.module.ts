import { Module } from '@nestjs/common';
import {
  CreateRolesRoleJob,
  RoleCreatedListener,
  RolesDatabaseRepository,
} from './infrastructure';
import { BullModule } from '@nestjs/bull';
import {
  CreateRolesUseCaseImplementation,
  ListRolesUseCaseImplementation,
} from './application/usecase';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 3 },
    }),
  ],
  providers: [
    CreateRolesRoleJob,
    RoleCreatedListener,
    { provide: 'RolesRepository', useClass: RolesDatabaseRepository },
    {
      provide: 'CreateRolesUseCase',
      useClass: CreateRolesUseCaseImplementation,
    },
    {
      provide: 'ListRolesUseCase',
      useClass: ListRolesUseCaseImplementation,
    },
  ],
})
export class RolesModule {}
