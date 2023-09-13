import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Connection } from '@/common/database/types';
import { UserEntity, UserRepository } from '../../domain';
import { Logger } from '@/common/Logger/infrastructure/types';

@Injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(
    @Inject('Connection') private readonly connection: Connection,
    @Inject('Logger') private readonly logger: Logger,
  ) {}
  async save(user: UserEntity): Promise<void> {
    try {
      const text =
        'INSERT INTO users(first_name, last_name, email, password, application_id) VALUES($1, $2, $3, $4, $5)';
      const values = [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.applicationId,
      ];
      await this.connection.query(text, values);
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to insert user',
      );
    }
  }

  async update(user: UserEntity): Promise<void> {
    try {
      await this.connection.query(
        'update into user(first_name, last_name, email, password, is_verified) values($1, $2, $3, $4, $5)',
        [
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.isVerified,
        ],
      );
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to update user',
      );
    }
  }

  list(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async get(userId: string): Promise<UserEntity> {
    try {
      return this.connection.query(
        'select * from user where user_id = $1 and is_verified is true',
        [userId],
      );
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to get user',
      );
    }
  }
}
