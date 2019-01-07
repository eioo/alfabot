import { bot } from '../bot';
import CommandBase from './commandBase';
import { commandRefs } from './commandRefs';

export const cmdList: CommandBase[] = [];

export function getCommand(cmdName: string): CommandBase | undefined {
  return cmdList.find(x => x.name === cmdName);
}

export async function load() {
  for (const cmdClass of commandRefs) {
    const cmd = new cmdClass(bot);
    cmd.listen && cmd.listen();
    cmdList.push(cmd);
  }
}
