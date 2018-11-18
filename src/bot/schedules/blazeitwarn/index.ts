import * as _ from 'lodash';
import Bot from 'shared/types/bot';

export function action(bot: Bot): void {
  bot.sendMessage(
    -161953743,
    '‼️🍁🍃 420 is coming soons, ready your bongs 🍃🍁‼️',
    {
      disable_notification: true,
      parse_mode: 'Markdown',
    }
  );
}
