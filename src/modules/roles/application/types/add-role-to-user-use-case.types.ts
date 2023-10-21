import { AddRoleToUserInputDTO } from '../dtos';

export type AddRoleToUserUseCase = {
  execute(params: AddRoleToUserInputDTO): Promise<void>;
};
