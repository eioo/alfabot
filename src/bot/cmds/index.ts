import { bot } from 'bot/bot';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { logger } from 'shared/logger';
import CommandBase from './commandBase';

export const cmdList: { [name: string]: CommandBase } = {};

export async function loadCommands() {
  const cmdDirectories = getDirectories(__dirname);

  for (const cmdDirectory of cmdDirectories) {
    const imported = await import(`./${cmdDirectory}`);
    const CmdClass = imported.default;

    if (!CmdClass) {
      logger.warn(
        `No default export found for command "${cmdDirectory}". Skipping loading.`
      );
      continue;
    }

    const cmd: CommandBase = new CmdClass(bot);

    cmd.name = cmdDirectory;
    cmd.listen();
    cmdList[cmdDirectory] = cmd;
  }

  logger.bot(`Loaded ${Object.keys(cmdList).length} commands`);
}

const getDirectories = (source: string) =>
  readdirSync(source).filter(f => statSync(join(source, f)).isDirectory());
