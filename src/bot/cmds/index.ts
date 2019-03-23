import { bot } from 'bot/bot';
import { getDirectories } from 'bot/utils';
import { logger } from 'shared/logger';

import CommandBase from './commandBase';

export const cmdList: { [name: string]: CommandBase } = {};

export async function load() {
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
