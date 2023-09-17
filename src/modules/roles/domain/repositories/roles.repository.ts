import { Roles } from '../entities';

export type RolesRepository = {
  save(roles: Roles): Promise<void>;
  update(roles: Roles): Promise<void>;
  findOne(roleId: string): Promise<Roles>;
  getAll(limit: number, offset: number): Promise<[Roles]>;
  delete(roleId: string): Promise<void>;
};
