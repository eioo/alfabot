import { cmdList } from 'bot/cmds';

export function getCommands(fn: (commands: string[]) => void) {
  const commands = Object.keys(cmdList);
  fn(commands);
}
