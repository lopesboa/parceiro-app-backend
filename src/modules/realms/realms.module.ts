import { Module } from '@nestjs/common';

import {
  CreateRealmUseCaseImplementation,
  ListRealmUseCaseImplementation,
} from './application';
import { RealmsController } from './presentation';
import { RealmsDatabaseRepository } from './infrastructure/realms-database-repositoty';

@Module({
  providers: [
    { provide: 'RealmsRepository', useClass: RealmsDatabaseRepository },
    {
      provide: 'CreateRealmUseCase',
      useClass: CreateRealmUseCaseImplementation,
    },
    {
      provide: 'ListRealmUseCase',
      useClass: ListRealmUseCaseImplementation,
    },
  ],
  controllers: [RealmsController],
})
export class RealmsModule {}
