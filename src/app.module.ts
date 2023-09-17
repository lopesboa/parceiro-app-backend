import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, CryptographyModule, DatabaseModule } from '@/common';
import { UserModule } from './modules/users/user.module';
import { RealmsModule } from './modules/realms/realms.module';
import { RolesModule } from './modules/roles/roles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: globalThis.ENV_FILE || '.env',
    }),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
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
