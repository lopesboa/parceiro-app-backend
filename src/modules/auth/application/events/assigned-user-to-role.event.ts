import { SystemRole } from '@/common/config';
import { UUID } from 'crypto';

export class AssignedRoleToUserEvent {
  constructor(
    public userId: UUID,
    public applicationId: UUID,
    public roleName: SystemRole,
  ) {}
}
