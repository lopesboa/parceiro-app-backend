import { UserEntity } from '../entities/user.entity';

export type UserRepository = {
  save(user: Partial<UserEntity>): Promise<UserEntity>;
  update(query: string, params: string[], where: string): Promise<void>;
  getAll(limit: number, offset?: number): Promise<[UserEntity]>;
  findOne(params): Promise<UserEntity>;
};
