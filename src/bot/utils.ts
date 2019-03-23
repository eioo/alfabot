import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export const getDirectories = (source: string) =>
  readdirSync(source).filter(f => statSync(join(source, f)).isDirectory());
