import { UUID } from 'crypto';
import { UserDetailsEntity, UserEntity } from '../entities';

export type UserRepository = {
  save(user: Partial<UserEntity>): Promise<UserEntity>;
  update(query: string, params: string[], where: string): Promise<void>;
  getAll(limit: number, offset?: number): Promise<[UserEntity]>;
  findOne(params): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<any>;
  getUserInformation(
    userId: UUID,
    applicationId: UUID,
  ): Promise<UserDetailsEntity>;
};
