import CommandBase from 'bot/cmds/commandBase';
import { schedules } from 'bot/schedules/rules';
import { scheduledJobs } from 'node-schedule';
import Bot from 'shared/types/bot';

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
      if (args[0] === 'schedule') {
        if (argCount === 1) {
          const names = schedules.map(s => s.name).join('\n');
          return this.reply(msg, `*List of schedules:*\n${names}`);
        }

        if (args[1] === 'run' && argCount === 3) {
          const schedule = scheduledJobs[args[2]];

          if (!schedule) {
            this.reply(msg, 'Schedule not found.');
            return;
          }

          this.reply(msg, `\`Running "${schedule.name}" schedule.\``);
          return schedule.invoke();
        }
      }
    });
  }
}

export default DebugCommand;
