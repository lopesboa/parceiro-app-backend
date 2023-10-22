import { UUID } from 'crypto';

export class UserDetailsEntity {
  user_id: UUID;
  email: string;
  first_name: string;
  last_name: string;
  last_access: Date;
  is_verified: boolean;
  application_id: UUID;
  birth_date: Date;
  gender: string;
  phone: string;
  thumb: string;
}
