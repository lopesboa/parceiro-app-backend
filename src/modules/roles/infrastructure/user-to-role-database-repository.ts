import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UsersToRoles } from '../domain/entities';
import { Connection } from '@/common/database/types';
import { UsersToRolesRepository } from '../domain/repositories';
import { Logger } from '@/common/Logger/infrastructure/types';

@Injectable()
export class UsersToRolesDatabaseRepository implements UsersToRolesRepository {
  constructor(
    @Inject('Connection') private readonly connection: Connection,
    @Inject('Logger') private readonly logger: Logger,
  ) {}
  async save(data: UsersToRoles) {
    try {
      const text =
        'INSERT INTO users_to_roles(user_id, role_id application_id) VALUES($1, $2, $3)';
      const values = [data.user_id, data.role_id, data.application_id];
      await this.connection.query(text, values);
    } catch (error) {
      this.logger.fatal(error, 'error while trying to insert users_to_roles');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to insert users_to_roles',
      );
    }
  }

  async update(query: string, params: string[], where: string) {
    try {
      await this.connection.query(
        `update users_to_roles set ${query} where ${where}`,
        params,
      );
    } catch (error) {
      this.logger.fatal(error, 'error while trying to update users_to_roles');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to update users_to_roles',
      );
    }
  }

  async findOne(params): Promise<UsersToRoles> {
    try {
      const result = await this.connection.one(
        `select * from users_to_roles where ${params?.where} limit 1 offset 0`,
        params.values,
      );

      return result.rows[0];
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to findOne users_to_roles');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to findOne users_to_roles',
      );
    }
  }

  async delete(roleId: string) {
    try {
      await this.connection.query(
        'delete from users_to_roles where role_id = $1',
        [roleId],
      );
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to delete users_to_roles');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to delete users_to_roles',
      );
    }
  }

  async getAll(limit: number, offset: number): Promise<[UsersToRoles]> {
    const result = await this.connection.query(
      'select * from users_to_roles limit $1 offset $2',
      [limit, offset],
    );

    return result.rows;
  }
}
