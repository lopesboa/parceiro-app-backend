import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Connection } from '@/common/database/types';
import { Logger } from '@/common/Logger/infrastructure/types';
import { UserTokenRepository } from '../../domain/repositories';
import { UserToken } from '../../domain/entities';

@Injectable()
export class UserTokenDatabaseRepository implements UserTokenRepository {
  constructor(
    @Inject('Connection') private readonly connection: Connection,
    @Inject('Logger') private readonly logger: Logger,
  ) {}
  async save({ access_token, refresh_token, user_id }: UserToken) {
    try {
      const text =
        'INSERT INTO user_token(access_token, refresh_token, user_id) VALUES($1, $2, $3) RETURNING *';
      const values = [access_token, refresh_token, user_id];
      const result = await this.connection.query(text, values);

      return result.rows[0];
    } catch (error) {
      this.logger.fatal(error, 'error while trying to insert user_token');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to insert user_token',
      );
    }
  }

  async update({ access_token, refresh_token, is_active }: UserToken) {
    try {
      await this.connection.query(
        'update into user_token(access_token, refresh_token, is_active) values($1, $2, $3)',
        [access_token, refresh_token, is_active],
      );
    } catch (error) {
      this.logger.fatal(error, 'error while trying to update user_token');
      throw new UnprocessableEntityException(
        {
          ...error,
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'error while trying to update user_token',
      );
    }
  }

  async findOne(tokenId: string): Promise<UserToken> {
    try {
      const result = await this.connection.one(
        'select * from user_token where token_id = $1',
        [tokenId],
      );

      return result.rows[0];
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to get user_token');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to get user_token',
      );
    }
  }

  async delete(tokenId: string) {
    try {
      await this.connection.query(
        'delete from user_token where token_id = $1',
        [tokenId],
      );
    } catch (error) {
      this.logger.fatal(error, 'Error while trying to delete user_token');
      throw new UnprocessableEntityException(
        {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        'Error while trying to delete user_token',
      );
    }
  }
}
