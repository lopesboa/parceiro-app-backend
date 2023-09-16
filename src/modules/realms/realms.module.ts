import { Module } from '@nestjs/common';
import { RealmsDatabaseRepository } from './infrastructure/realms-database-repositoty';

@Module({
  providers: [
    { provide: 'RealmsRepository', useClass: RealmsDatabaseRepository },
  ],
})
export class RealmsModule {}
