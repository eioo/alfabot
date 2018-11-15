// import * as hapi from 'hapi';
import { cmdList } from '../../bot/cmds';

export const handler = () => {
  return cmdList.map(command => command.name);
};
