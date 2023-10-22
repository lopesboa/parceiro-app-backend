import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  ListUserInfoUseCaseImplementation,
  CreateUserUseCaseImplementation,
} from './application/usecase';
import { CryptographyModule } from '@/common';
import { RolesModule } from '../roles/roles.module';
import { UserRepositoryImplementation } from './infrastructure';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [CryptographyModule, RolesModule],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
    {
      provide: 'ListUserInfoUseCase',
      useClass: ListUserInfoUseCaseImplementation,
    },
    { provide: 'CreateUserUseCase', useClass: CreateUserUseCaseImplementation },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
  controllers: [UserController],
  exports: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
  ],
})
export class UserModule {}
