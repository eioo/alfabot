import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import Bot from 'shared/types/bot';

const FACTS_FILE = path.join(__dirname, 'facts.txt');

const facts = fs.readFileSync(FACTS_FILE, 'utf-8').split('\n');

export function action(bot: Bot): void {
  const fact = _.sample(facts);

  bot.sendMessage(-161953743, `‼️🍁🍃 *420* ‼️🍁🍃*\n_${fact}_`, {
    disable_notification: true,
    parse_mode: 'Markdown',
  });
}
