import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

class DoublesCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'example';
    this.helpText = 'Example command';
    this.helpArgs = '[somearg] [otherarg]';
  }

  listen(): void {
    this.onText(/^\/(doubles?|tuplat?)$/i, async msg => {
      const reply = await this.reply(msg, '🎲🎲🎲 Rolling 🎲🎲🎲');

      setTimeout(() => {
        const numRolled = Math.floor(Math.random() * 101)
        const strRolled = numRolled.toString().padStart(3, '0');
        const response = strRolled.slice(-1) === strRolled.slice(-2, -1)
          ? `🎲 \[${numRolled}\] You rolled doubles! :))`
          : `🎲 \[${numRolled}\] No doubles for u :((`;

        this.editReply(reply, response)
      }, 2500);
    });
  }
}

export default DoublesCommand;
