import { UserEntity } from '../entities/user.entity';

export type UserRepository = {
  save(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  list(): Promise<UserEntity[]>;
  get(userId: string): Promise<UserEntity>;
};
