import { cmdList } from 'bot/cmds';

export function getCommands(fn: (commands: string[]) => void) {
  const commands = cmdList.map(command => command.name);
  fn(commands);
}
