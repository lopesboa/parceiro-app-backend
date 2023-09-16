import { CreateUserInputDTO } from '../dtos';

export type CreateUserUseCase = {
  execute(createUserDTO: CreateUserInputDTO): Promise<void>;
};
