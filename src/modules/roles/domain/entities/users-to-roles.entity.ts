import { UUID } from 'crypto';

export class UsersToRoles {
  user_id: UUID;
  role_id?: UUID;
  application_id: UUID;
}
