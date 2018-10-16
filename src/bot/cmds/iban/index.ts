import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

interface IAccounts {
  holderName: string;
  ibanNumber: string;
}

const envString = process.env.IBAN_NUMBERS || '';

const ibanAccounts: IAccounts[] = envString.split(';').map(x => {
  const [key, value] = x.split(':');
  const holderName = key.trim();
  const ibanNumber = (value.replace(/ /g, '').match(/.{4}/g) as RegExpMatchArray).join(' ');

  return { holderName, ibanNumber };
});

class IBANCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'iban'; 
    this.helpText = 'Show IBAN numbers';
    this.helpArgs = '<someone>';
  }

  listen(): void {
    this.onText(/^\/iban/i, async (msg, args, argCount) => {
      if (!argCount) {
        const response = ibanAccounts
          .map(acc => `*${acc.holderName}*: ${acc.ibanNumber}`)
          .join('\n');

        this.reply(msg, response);
        return;
      }

      if (argCount === 1) {
        const holderName = args[0].trim();
        const acc = ibanAccounts.find(x => x.holderName === holderName);

        if (!acc) {
          this.showHelp(msg);
          return;
        }

        this.reply(msg, `*${acc.holderName}*: ${acc.ibanNumber}`);
        return;
      }

      this.showHelp(msg);
    });
  }
}

export default IBANCommand;
