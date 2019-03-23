import { bot } from 'bot/bot';
import { getDirectories } from 'bot/utils';
import { logger } from 'shared/logger';
import CommandBase from './commandBase';

export const cmdList: { [name: string]: CommandBase } = {};

export async function load() {
  const cmdDirectories = getDirectories(__dirname);

  baseloop:
  while (true) {
    for (const cmdDirectory of cmdDirectories) {
      try {
        const imported = await import(`./${cmdDirectory}`);
        const CmdClass = imported.default;
        const cmd: CommandBase = new CmdClass(bot);
        
        cmd.name = cmdDirectory;
        cmd.listen();
        cmdList[cmdDirectory] = cmd;

        if (Object.keys(cmdList).length === cmdDirectories.length) {
          break baseloop;
        }
      } catch { 
        /*
          For some reason importing fails if it's done in wrong order,
          this hack just tries to reimport if it fails the first time.
        */
      }
    }
  }

  logger.bot(`Loaded ${Object.keys(cmdList).length} commands`);
}
