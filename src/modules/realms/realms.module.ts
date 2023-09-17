import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
  controllers: [RealmsController],
})
export class RealmsModule {}
