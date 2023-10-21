import { SignInInputDTO } from '../dtos';

export type SignInUseCase = {
  execute(params: SignInInputDTO): Promise<any>;
};
