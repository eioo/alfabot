import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';
import { Roll, TriplesRoll } from './Roll';

class DoublesCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.helpText = 'Rolls 0-100';
  }

  listen(): void {
    this.onText(
      /^(\/(doubles?|tuplat?)|tuplat päättää|tuplilla)/i,
      async msg => {
        const reply = await this.reply(msg, '🎲🎲🎲 Rolling 🎲🎲🎲');

        await new Promise(resolve => setTimeout(resolve, 2500));

        const roll = new Roll();
        const response = roll.isOnlySameNumbers
          ? `🎲 \`[${roll.roll}]\` You rolled doubles! :))`
          : `🎲 \`[${roll.roll}]\` No doubles for u :((`;

        this.editReply(reply, response);
      }
    );

    this.onText(
      /^(\/(triples?|triplat?)|triplat päättää|triploilla)/i,
      async msg => {
        const reply = await this.reply(msg, '🎲🎲🎲 Rolling 🎲🎲🎲');

        await new Promise(resolve => setTimeout(resolve, 2500));

        const roll = new TriplesRoll();
        const response = roll.isOnlySameNumbers
          ? `🎲 \`[${roll.roll}]\` You rolled triples! :))`
          : `🎲 \`[${roll.roll}]\` No triples for u :((`;

        this.editReply(reply, response);
      }
    );
  }
}

export default DoublesCommand;
