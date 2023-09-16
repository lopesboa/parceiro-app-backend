import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Connection } from '@/common/database/types';
import { Logger } from '@/common/Logger/infrastructure/types';
import { RealmsRepository } from '../domain/repositories';
import { Realms } from '../domain/entities';

@Injectable()
export class RealmsDatabaseRepository implements RealmsRepository {
  constructor(
    @Inject('Connection') private readonly connection: Connection,
    @Inject('Logger') private readonly logger: Logger,
  ) {}
  async save(realm: Realms) {
    try {
      const text = 'INSERT INTO realms(name, description) VALUES($1, $2)';
      const values = [realm.name, realm.description];
      await this.connection.query(text, values);
    } catch (error) {
      this.logger.fatal(error, 'error while trying to insert realm');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to insert realm',
      );
    }
  }

  async update(realm: Realms) {
    try {
      await this.connection.query(
        'update into realms(name, description) values($1, $2)',
        [realm.name, realm.description],
      );
    } catch (error) {
      this.logger.fatal(error, 'error while trying to update realm');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to update realm',
      );
    }
  }

  async findOne(realmId: string): Promise<Realms> {
    try {
      const result = await this.connection.one(
        'select * from realms where realm_id = $1',
        [realmId],
      );

      return result.rows[0];
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to get realm');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to get realm',
      );
    }
  }

  async delete(realmId: string) {
    try {
      await this.connection.query('delete from realms where realm_id = $1', [
        realmId,
      ]);
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to delete realm');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to delete realm',
      );
    }
  }

  async getAll(limit: number, offset: number): Promise<[Realms]> {
    const result = await this.connection.query(
      'select * from realms limit $1 offset $2',
      [limit, offset],
    );

    return result.rows;
  }
}
