import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './presentation';
import { CryptographyModule } from '@/common';
import { UserModule } from '../users/user.module';
import { LoginServiceImplementation } from './application';
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
