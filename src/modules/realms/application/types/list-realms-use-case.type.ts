import { ListRealmInputDTO } from '../dtos';
import { Realms } from '../../domain/entities';

export type ListRealmUseCase = {
  execute: (params: ListRealmInputDTO) => Promise<[Realms]>;
};
