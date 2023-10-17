import { Module } from '@nestjs/common';
import {
  AssignRoleToUserJob,
  AssignRoleToUserListener,
  CreateRolesRoleJob,
  RoleCreatedListener,
  RolesDatabaseRepository,
  UsersToRolesDatabaseRepository,
} from './infrastructure';
import { BullModule } from '@nestjs/bull';
import {
  AddRoleToUserUseCaseImplementation,
  CreateRolesUseCaseImplementation,
  ListRolesUseCaseImplementation,
  ListRoleByNameImplementation,
} from './application/usecase';
import { RolesServiceImplementation } from './application/services';
import { RolesController } from './presentation';

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
    AssignRoleToUserJob,
    AssignRoleToUserListener,
    { provide: 'RolesRepository', useClass: RolesDatabaseRepository },
    {
      provide: 'UsersToRolesRepository',
      useClass: UsersToRolesDatabaseRepository,
    },
    {
      provide: 'CreateRolesUseCase',
      useClass: CreateRolesUseCaseImplementation,
    },
    {
      provide: 'ListRolesUseCase',
      useClass: ListRolesUseCaseImplementation,
    },
    {
      provide: 'AddRoleToUserUseCase',
      useClass: AddRoleToUserUseCaseImplementation,
    },
    {
      provide: 'ListRoleByName',
      useClass: ListRoleByNameImplementation,
    },
    {
      provide: 'RolesService',
      useClass: RolesServiceImplementation,
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}
