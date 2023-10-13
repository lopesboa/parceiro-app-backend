import { UUID } from 'crypto';

export class Roles {
  role_id?: UUID;
  role_name: string;
  application_id: UUID;
  permissions: string[];
  created_at?: Date;
  updated_at?: Date;
}
