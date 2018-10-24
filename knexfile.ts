import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
    },
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations'),
    },
  },
};
