import { Bot } from '../../../shared/types';
import CommandBase from '../../cmds/commandBase';
import { runSchedule } from '../../schedules';
import { schedules } from '../../schedules/rules';

class DebugCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Helps debugging';
    this.helpArgs = '[schedules | runschedule <name>]';
    this.visible = false;
  }

  listen(): void {
    this.onText(/^\/debug/i, async (msg, args, argCount) => {
      if (argCount === 0) {
        return this.reply(msg, 'Nope');
      }

      const firstArg = args[0].toLowerCase();

      if (firstArg === 'schedules') {
        const names = schedules.map(s => s.name);
        return this.reply(msg, [`*List of schedules:*`, ...names]);
      }

      if (firstArg === 'runschedule' && argCount === 2) {
        const schedule = schedules.find(s => s.name === args[1].toLowerCase());

        if (!schedule) {
          return this.reply(msg, '❗️ Schedule not found');
        }

        this.reply(msg, `\`Running "${schedule.name}" schedule\``);
        return runSchedule(msg.chat.id, schedule.name);
      }
    });
  }
}

export default DebugCommand;
