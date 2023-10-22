import { ListUserInfoInputDTO, ListUserInfoResponse } from '../dtos';

export type ListUserInfoUseCase = {
  execute(params: ListUserInfoInputDTO): Promise<ListUserInfoResponse>;
};
