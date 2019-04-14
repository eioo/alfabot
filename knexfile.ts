import * as path from 'path';
import { config } from './src/shared/env';

module.exports = {
  development: {
    client: 'pg',
    connection: config.database,
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations'),
    },
  },
};
