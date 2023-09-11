import { Module } from '@nestjs/common';

import { LoggerModule } from '../Logger/logger.module';
import { JWTAdapterImplementation } from './adapters/jwt.adapter';

@Module({
  imports: [LoggerModule],
  providers: [
    { provide: 'CryptographAdapter', useClass: JWTAdapterImplementation },
  ],
  controllers: [],
  exports: [
    { provide: 'CryptographAdapter', useClass: JWTAdapterImplementation },
  ],
})
export class CryptographyModule {}
