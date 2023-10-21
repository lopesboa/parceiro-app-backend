import { UsersToRoles } from '../entities';

export type UsersToRolesRepository = {
  save(roles: UsersToRoles): Promise<UsersToRoles>;
  update(query: string, params: string[], where: string): Promise<void>;
  findOne(params): Promise<UsersToRoles>;
  getAll(limit: number, offset: number): Promise<[UsersToRoles]>;
  delete(roleId: string): Promise<void>;
};
