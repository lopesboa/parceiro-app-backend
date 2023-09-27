import { UUID } from 'crypto';
import { UserToken } from '../entities';

export type UserTokenRepository = {
  save(user: Partial<UserToken>): Promise<UserToken>;
  update(user: Partial<UserToken>): Promise<UserToken>;
  delete(tokenId: UUID): Promise<void>;
  findOne(params): Promise<UserToken>;
};
