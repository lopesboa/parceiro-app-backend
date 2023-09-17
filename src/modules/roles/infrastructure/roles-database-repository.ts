import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Connection } from '@/common/database/types';
import { Logger } from '@/common/Logger/infrastructure/types';
import { RolesRepository } from '../domain/repositories';
import { Roles } from '../domain/entities';

@Injectable()
export class RolesDatabaseRepository implements RolesRepository {
  constructor(
    @Inject('Connection') private readonly connection: Connection,
    @Inject('Logger') private readonly logger: Logger,
  ) {}
  async save(role: Roles) {
    try {
      const text =
        'INSERT INTO roles(name, application_id, permissions) VALUES($1, $2, $3)';
      const values = [role.name, role.application_id, role.permissions];
      await this.connection.query(text, values);
    } catch (error) {
      this.logger.fatal(error, 'error while trying to insert role');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to insert role',
      );
    }
  }

  async update(role: Roles) {
    try {
      await this.connection.query(
        'update into roles(name, application_id) values($1, $2)',
        [role.name, role.application_id],
      );
    } catch (error) {
      this.logger.fatal(error, 'error while trying to update role');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to update role',
      );
    }
  }

  async findOne(roleId: string): Promise<Roles> {
    try {
      const result = await this.connection.one(
        'select * from roles where role_id = $1',
        [roleId],
      );

      return result.rows[0];
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to get role');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to get role',
      );
    }
  }

  async delete(roleId: string) {
    try {
      await this.connection.query('delete from roles where role_id = $1', [
        roleId,
      ]);
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to delete role');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to delete role',
      );
    }
  }

  async getAll(limit: number, offset: number): Promise<[Roles]> {
    const result = await this.connection.query(
      'select * from roles limit $1 offset $2',
      [limit, offset],
    );

    return result.rows;
  }
}
