import * as knex from 'knex';
import { logger } from './logger';

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASS } = process.env;

if (!PG_HOST || !PG_DATABASE || !PG_USER) {
  logger.error('Fill in PostgreSQL database details in .env');
  process.exit();
}

export const db = knex({
  client: 'pg',
  connection: {
    host: PG_HOST,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASS,
  },
  searchPath: ['public'],
});
