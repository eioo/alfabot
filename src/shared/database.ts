import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { logger } from './logger';
import { IDatabase } from './types';

const DB_FILE = path.join(__dirname, '../../database.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

async function resetDatabase(): Promise<[]> {
  await writeFile(DB_FILE, '[]');
  return [];
}

export async function readDatabase(): Promise<IDatabase> {
  if (!exists(DB_FILE)) {
    return await resetDatabase();
  }

  const content = await readFile(DB_FILE, 'utf-8');

  try {
    return JSON.parse(content);
  } catch {
    logger.warn('Could not parse database file. Resetting it');
    return await resetDatabase();
  }
}

export async function writeDatabase(database: IDatabase): Promise<void> {
  try {
    await writeFile(DB_FILE, JSON.stringify(database));
  } catch {
    logger.error('Could not write database');
  }
}
