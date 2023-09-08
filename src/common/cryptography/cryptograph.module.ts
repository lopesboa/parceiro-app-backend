import { Module } from '@nestjs/common';

import { LoggerModule } from '../Logger/logger.module';
import { JWTDecodeServiceImplementation } from './adapters/services/jwt-decode.service';
import { JWTAdapterImplementation } from './adapters/jwt.adapter';

@Module({
  imports: [LoggerModule],
  providers: [
    { provide: 'JWTAdapter', useClass: JWTAdapterImplementation },
    JWTDecodeServiceImplementation,
  ],
  controllers: [],
  exports: [
    JWTDecodeServiceImplementation,
    { provide: 'JWTAdapter', useClass: JWTAdapterImplementation },
  ],
})
export class CryptographyModule {}
