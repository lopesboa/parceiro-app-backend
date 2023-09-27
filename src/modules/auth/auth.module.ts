import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import {
  AccessTokenStrategy,
  LocalStrategy,
  LoginServiceImplementation,
  RefreshTokenStrategy,
} from './application';
import { CryptographyModule } from '@/common';
import { UserModule } from '../users/user.module';
import { UserTokenDatabaseRepository } from './infrastructure';
import { AuthController } from './presentation/controller/auth.controller';

@Module({
  imports: [UserModule, CryptographyModule, PassportModule],
  providers: [
    LocalStrategy,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    { provide: 'UserTokenRepository', useClass: UserTokenDatabaseRepository },
    { provide: 'LoginService', useClass: LoginServiceImplementation },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
