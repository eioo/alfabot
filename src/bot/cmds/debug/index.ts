import CommandBase from 'bot/cmds/commandBase';
import { schedules } from 'bot/schedules/rules';
import { scheduledJobs } from 'node-schedule';
import Bot from 'shared/types/bot';

class DebugCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'debug';
    this.helpText = 'debug';
    this.helpArgs = '[runschedule <name>]';
  }

  listen(): void {
    this.onText(/^\/debug/i, async (msg, args, argCount) => {
      if (!argCount) {
        console.log(scheduledJobs);
      }

      if (args[0] === 'schedules' && argCount === 1) {
        const names = schedules.map(s => s.name).join('\n');
        this.reply(msg, `*List of schedules:*\n${names}`);
      }

      if (args[0] === 'runschedule' && argCount === 2) {
        const schedule = scheduledJobs[args[1]];

        if (!schedule) {
          this.reply(msg, 'Schedule not found.');
          return;
        }

        this.reply(msg, `\`Running "${schedule.name}" schedule.\``);
        schedule.invoke();
      }
    });
  }
}

export default DebugCommand;
