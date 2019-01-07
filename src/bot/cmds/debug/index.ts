import CommandBase from 'bot/cmds/commandBase';
import { schedules } from 'bot/schedules/rules';
import Bot from 'shared/types/bot';
import { runSchedule } from 'bot/schedules';

class DebugCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'debug';
    this.helpText = 'Helps debugging';
    this.helpArgs = '[schedule [run <name>]]';
    this.visible = false;
  }

  listen(): void {
    this.onText(/^\/debug/i, async (msg, args, argCount) => {
      if (/^schedules?$/.test(args[0])) {
        if (
          argCount === 1 ||
          (argCount === 2 && args[1].toLowerCase() === 'list')
        ) {
          const names = schedules.map(s => s.name);
          return this.reply(msg, [`*List of schedules:*`, ...names]);
        }

        if (args[1] === 'run' && argCount === 3) {
          const schedule = schedules.find(
            s => s.name === args[2].toLowerCase()
          );

          if (!schedule) {
            return this.reply(msg, 'Schedule not found.');
          }

          this.reply(msg, `\`Running "${schedule.name}" schedule.\``);
          return runSchedule(schedule.name, msg.chat.id);
        }
      }

      this.reply(msg, 'U dun goofed');
    });
  }
}

export default DebugCommand;
