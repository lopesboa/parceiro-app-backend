import { UserEntity } from '../entities/user.entity';

export type UserRepository = {
  save(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  get(userId: string): Promise<UserEntity>;
  findOne(params): Promise<UserEntity>;
};
