import { UUID } from 'crypto';
import { Roles } from '../entities';

export type RolesRepository = {
  save(roles: Roles): Promise<void>;
  update(roles: Roles): Promise<void>;
  findOne(roleId: string, applicationId: UUID): Promise<Roles>;
  getAll(limit: number, offset: number): Promise<[Roles]>;
  delete(roleId: string): Promise<void>;
};
