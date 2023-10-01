import { UUID } from 'crypto';
import { UserToken } from '../entities';

export type UserTokenRepository = {
  save(user: Partial<UserToken>): Promise<UserToken>;
  update(query: string, params: string[], where: string): Promise<void>;
  delete(tokenId: UUID): Promise<void>;
  findOne(params): Promise<UserToken>;
};
