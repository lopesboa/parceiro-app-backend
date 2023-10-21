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
  async save(user: UserEntity): Promise<UserEntity> {
    try {
      const text =
        'INSERT INTO users(first_name, last_name, email, password, application_id) VALUES($1, $2, $3, $4, $5) RETURNING first_name, last_name, email, application_id, user_id';
      const values = [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.application_id,
      ];
      const result = await this.connection.query(text, values);

      return result.rows[0];
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

  async update(query: string, params: string[], where: string): Promise<void> {
    try {
      await this.connection.query(
        `update users set ${query} where ${where}`,
        params,
      );
    } catch (error) {
      console.log('error', error);
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
      this.logger.fatal(error, 'error while trying to getAll user');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to getAll user',
      );
    }
  }

  async findOne(params) {
    try {
      const result = await this.connection.query(
        `select * from users where ${params?.where} limit 1 offset 0`,
        params?.values,
      );

      return result.rows[0] || null;
    } catch (error) {
      this.logger.fatal(error, 'error while trying to findOne user', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      });
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to findOne user',
      );
    }
  }

  async findUserByEmail(email) {
    try {
      const result = await this.connection.query(
        `SELECT DISTINCT ON (users.user_id)
        users.user_id, users.email, users.password, users.first_name, users.last_name, 
        users.last_access, users.token_id, users.is_verified, users.application_id, 
        users_to_roles.role_id, roles.role_name, roles.permissions
        FROM users LEFT JOIN users_to_roles 
        ON users_to_roles.user_id = users.user_id 
        AND users_to_roles.application_id = users.application_id
        LEFT JOIN roles  ON roles.role_id = users_to_roles.role_id 
        AND roles.application_id = users_to_roles.application_id
        where email = $1 limit 1 offset 0`,
        [email],
      );

      return result.rows[0] || null;
    } catch (error) {
      this.logger.fatal(error, 'error while trying to findUserByEmail', {
        message: error.message,
        stack: error.stack,
        code: error.code,
      });
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to findUserByEmail',
      );
    }
  }
}
