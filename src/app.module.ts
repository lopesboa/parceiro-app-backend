import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, CryptographyModule, DatabaseModule } from '@/common';
import { UserModule } from './modules/users/user.module';
import { RealmsModule } from './modules/realms/realms.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: globalThis.ENV_FILE || '.env',
    }),
    LoggerModule,
    CryptographyModule,
    DatabaseModule,
    UserModule,
    RealmsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
