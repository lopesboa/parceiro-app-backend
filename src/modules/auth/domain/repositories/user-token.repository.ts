import { UUID } from 'crypto';
import { UserToken } from '../entities';

export type UserTokenRepository = {
  save(user: UserToken): Promise<void>;
  update(user: UserToken): Promise<void>;
  delete(tokenId: UUID): Promise<void>;
  findOne(params): Promise<UserToken>;
};
