import { UserEntity } from '../entities';

export type CreateUserUseCase = {
  execute(createUserDTO: UserEntity): Promise<void>;
};
