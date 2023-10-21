import { UUID } from 'crypto';

export class UserToken {
  token_id: UUID;
  user_id: UUID;
  access_token: string;
  refresh_token: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
