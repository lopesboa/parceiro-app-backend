import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthController } from './presentation/controller/auth.controller';
import { SignInUseCaseImplementation } from './application/usecase/sig-in-use-case';
import { CryptographyModule } from '@/common';
import { UserTokenDatabaseRepository } from './infrastructure';

@Module({
  imports: [UserModule, CryptographyModule],
  providers: [
    { provide: 'SignInUseCase', useClass: SignInUseCaseImplementation },
    { provide: 'UserTokenRepository', useClass: UserTokenDatabaseRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
