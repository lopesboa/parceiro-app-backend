import { Module } from '@nestjs/common';
import { UserRepositoryImplementation } from './infrastructure';
import { CreateUser } from './application/usecase/create-user.usecase';
import { UserController } from './presentation/controller/user.controller';
import { CryptographyModule } from '@/common';

@Module({
  imports: [CryptographyModule],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
    { provide: 'CreateUserUseCase', useClass: CreateUser },
  ],
  controllers: [UserController],
  exports: [
    { provide: 'UserRepository', useClass: UserRepositoryImplementation },
  ],
})
export class UserModule {}
