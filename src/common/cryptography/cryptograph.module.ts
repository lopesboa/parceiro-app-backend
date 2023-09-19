import { Module } from '@nestjs/common';

import {
  JWTAdapterImplementation,
  CreateTokenAdapterImplementation,
} from './adapters';
import { LoggerModule } from '../Logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    { provide: 'CryptographAdapter', useClass: JWTAdapterImplementation },
    {
      provide: 'CreateTokenAdapter',
      useClass: CreateTokenAdapterImplementation,
    },
  ],
  controllers: [],
  exports: [
    { provide: 'CryptographAdapter', useClass: JWTAdapterImplementation },
    {
      provide: 'CreateTokenAdapter',
      useClass: CreateTokenAdapterImplementation,
    },
  ],
})
export class CryptographyModule {}
