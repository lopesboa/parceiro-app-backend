import { CreateRealmInputDTO } from '../dtos';

export type CreateRealmUseCase = {
  execute(params: CreateRealmInputDTO): Promise<void>;
};
