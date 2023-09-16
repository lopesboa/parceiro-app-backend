import { Module } from '@nestjs/common';
import { RealmsDatabaseRepository } from './infrastructure/realms-database-repositoty';
import { RealmsController } from './presentation';
import { CreateRealmUseCaseImplementation } from './application';
@Module({
  providers: [
    { provide: 'RealmsRepository', useClass: RealmsDatabaseRepository },
    {
      provide: 'CreateRealmUseCase',
      useClass: CreateRealmUseCaseImplementation,
    },
  ],
  controllers: [RealmsController],
})
export class RealmsModule {}
