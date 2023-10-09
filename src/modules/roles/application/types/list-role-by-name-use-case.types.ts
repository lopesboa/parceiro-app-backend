import { UUID } from 'crypto';
import { Roles } from '../../domain/entities';

export type ListRoleByName = {
  execute(roleName: string, applicationId: UUID): Promise<Roles>;
};
