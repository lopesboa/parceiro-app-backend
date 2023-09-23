import { UserEntity } from '@/modules/users/domain';
import { LoginResponseDTO, SignInInputDTO, ValidateUserDTO } from '../dtos';

export type LoginService = {
  login(user: UserEntity): Promise<LoginResponseDTO>;
  validateUser(params: SignInInputDTO): Promise<ValidateUserDTO>;
};
