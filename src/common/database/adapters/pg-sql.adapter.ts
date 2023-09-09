import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { Connection } from '../types';

@Injectable()
export class PostgreSQLAdapter implements Connection {
  connection: Pool;

  constructor() {
    this.connection = new Pool({
      connectionString: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_POR),
      ssl: {
        key: process.env.DATABASE_SSL_CERT?.replace(/\\n/g, '\n'),
      },
      max: 15,
    });
    this.connection.connect();
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  one(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  close() {
    return this.connection.end();
  }
}
