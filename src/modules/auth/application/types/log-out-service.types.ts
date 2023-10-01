import { UUID } from 'crypto';

export type LogOutService = {
  logout(userId: UUID): Promise<void>;
};
