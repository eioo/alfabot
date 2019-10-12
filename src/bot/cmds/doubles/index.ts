import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

export class Roll {
  roll = `${Math.floor(Math.random() * 100)}`.padStart(2, '0');

  get isDoubles() {
    return this.roll[0] === this.roll[1];
  }
}

// tslint:disable-next-line: max-classes-per-file
class DoublesCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Rolls 0-100';
  }

  listen(): void {
    this.onText(/^(\/(doubles?|tuplat?)|tuplat päättää)/i, async msg => {
      const reply = await this.reply(msg, '🎲🎲🎲 Rolling 🎲🎲🎲');

      await new Promise(resolve => setTimeout(resolve, 2500));

      const roll = new Roll();
      const response = roll.isDoubles
        ? `🎲 \`[${roll.roll}]\` You rolled doubles! :))`
        : `🎲 \`[${roll.roll}]\` No doubles for u :((`;

      this.editReply(reply, response);
    });
  }
}

export default DoublesCommand;
