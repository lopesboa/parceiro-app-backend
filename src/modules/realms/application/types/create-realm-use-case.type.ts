import { Realms } from '../../domain/entities';
import { CreateRealmInputDTO } from '../dtos';

export type CreateRealmUseCase = {
  execute(params: CreateRealmInputDTO): Promise<Realms>;
};
