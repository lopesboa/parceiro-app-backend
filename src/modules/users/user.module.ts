import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CryptographyModule } from '@/common';
import { RolesModule } from '../roles/roles.module';
import { UserRepositoryImplementation } from './infrastructure';
import { CreateUser } from './application/usecase/create-user.usecase';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [CryptographyModule, RolesModule],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
    { provide: 'CreateUserUseCase', useClass: CreateUser },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
  controllers: [UserController],
  exports: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
  ],
})
export class UserModule {}
