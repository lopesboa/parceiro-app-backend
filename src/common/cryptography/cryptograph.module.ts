import { Module } from '@nestjs/common';

import { LoggerModule } from '../Logger/logger.module';
import { JWTAdapterImplementation } from './adapters/jwt.adapter';

@Module({
  imports: [LoggerModule],
  providers: [{ provide: 'JWTAdapter', useClass: JWTAdapterImplementation }],
  controllers: [],
  exports: [{ provide: 'JWTAdapter', useClass: JWTAdapterImplementation }],
})
export class CryptographyModule {}
