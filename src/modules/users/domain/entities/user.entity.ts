import { UUID } from 'crypto';

export class UserEntity {
  user_id?: UUID;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  application_id: string;
  token_id?: string;
  is_verified?: boolean;
  last_access?: Date;
  created_at?: Date;
  updated_at?: Date;
}
