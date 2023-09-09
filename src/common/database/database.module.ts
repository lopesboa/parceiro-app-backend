import { Global, Module } from '@nestjs/common';
import { PostgreSQLAdapter } from './adapters';

@Global()
@Module({
  imports: [],
  providers: [{ provide: 'Connection', useClass: PostgreSQLAdapter }],
  exports: [],
})
export class DatabaseModule {}
