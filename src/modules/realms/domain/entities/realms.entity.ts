import { UUID } from 'crypto';

export class Realms {
  application_id?: UUID;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}
