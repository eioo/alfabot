import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

interface IAccounts {
  ownerName: string;
  ibanNumber: string;
}

const envString = process.env.IBAN_NUMBERS || '';

const ibanAccounts: IAccounts[] = envString.split(';')
  .filter(x => x)
  .map(x => {

    const [key, value] = x.split(':');
    const ownerName = key.trim();
    const ibanNumber = (value.replace(/ /g, '').match(/.{4}/g) as RegExpMatchArray).join(' ');

    return { ownerName, ibanNumber };
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
          .map(acc => `*${acc.ownerName}*: ${acc.ibanNumber}`)
          .join('\n');
        const responseNone = 'Ei IBAN-tilejä';

        this.reply(msg, response || responseNone);
        return;
      }

      if (argCount === 1) {
        const ownerName = args[0].trim();
        const account = ibanAccounts.find(x => x.ownerName.toLowerCase() === ownerName.toLowerCase());

        if (!account) {
          this.reply(msg, 'Ei löytyny');
          return;
        }

        this.reply(msg, `${account.ibanNumber}`);
        return;
      }

      this.showHelp(msg);
    });
  }
}

export default IBANCommand;
