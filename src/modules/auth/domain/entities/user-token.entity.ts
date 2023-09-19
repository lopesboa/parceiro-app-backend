import { UUID } from 'crypto';

export class UserToken {
  token_id: UUID;
  user_id: UUID;
  access_token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
