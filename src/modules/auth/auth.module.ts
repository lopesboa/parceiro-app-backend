import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PassportModule } from '@nestjs/passport';

import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from './presentation';
import {
  CreateUserTokenJob,
  UserTokenCreatedListener,
  UserTokenDatabaseRepository,
} from './infrastructure';
import { CryptographyModule } from '@/common';
import { UserModule } from '../users/user.module';
import {
  LogOutServiceImplementation,
  LoginServiceImplementation,
} from './application';
import { AuthController } from './presentation/controller/auth.controller';

@Module({
  imports: [
    UserModule,
    CryptographyModule,
    PassportModule,
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 3 },
    }),
  ],
  providers: [
    LocalStrategy,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    UserTokenCreatedListener,
    CreateUserTokenJob,
    { provide: 'UserTokenRepository', useClass: UserTokenDatabaseRepository },
    { provide: 'LoginService', useClass: LoginServiceImplementation },
    { provide: 'LogOutService', useClass: LogOutServiceImplementation },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
