import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { IDatabase } from './types';
import { logger } from './logger';

const DB_FILE = path.join(__dirname, '../../database.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

async function resetDatabase(): Promise<void> {
  await writeFile(DB_FILE, '[]');
}

export async function readDatabase(): Promise<IDatabase> {
  if (!exists(DB_FILE)) {
    await resetDatabase();
    return [];
  }

  const content = await readFile(DB_FILE, 'utf-8');

  try {
    return JSON.parse(content)
  } catch {
    await resetDatabase();
    return [];
  }
}

export async function writeDatabase(database: IDatabase): Promise<void> {
  try {
    await writeFile(DB_FILE, JSON.stringify(database));
  } catch {
    logger.error('Could not write database');
  }
}