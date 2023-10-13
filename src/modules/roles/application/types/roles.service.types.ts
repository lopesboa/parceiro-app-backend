import { Roles } from '../../domain/entities';
import { CreateRoleInputDTO } from '../dtos';

export type RolesService = {
  createRoleHandler(params: CreateRoleInputDTO): Promise<Roles>;
};
