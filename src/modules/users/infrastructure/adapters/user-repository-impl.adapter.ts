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
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.application_id,
      ];
      await this.connection.query(text, values);
    } catch (error) {
      this.logger.fatal(error, 'error while trying to insert user');
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
        'update into users(first_name, last_name, email, password, is_verified, token_id) values($1, $2, $3, $4, $5, $6)',
        [
          user.first_name,
          user.last_name,
          user.email,
          user.password,
          user.is_verified,
          user.token_id,
        ],
      );
    } catch (error) {
      this.logger.fatal(error, 'error while trying to update user');
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

  async getAll(limit: number, offset?: number): Promise<[UserEntity]> {
    try {
      const result = await this.connection.query(
        'select * from users limit $1 offset $2',
        [limit, offset],
      );

      return result.rows;
    } catch (error) {
      this.logger.fatal(error, 'error while trying to get user');
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

  async findOne(params) {
    try {
      const result = await this.connection.query(
        'select * from users where email = $1 or user_id = $2 limit $3 offset $4',
        [params.email, params.userId, 1, 0],
      );

      return result.rows[0] || null;
    } catch (error) {
      this.logger.fatal(error, 'error while trying to get user');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to get user',
      );
    }
  }
}
