import * as dateFormat from 'dateformat';
import fetch from 'node-fetch';

import { chunk, getBetween, sample } from '../../../shared/utils';
import { bot } from '../../bot';
import ScheduleBase from '../scheduleBase';

interface IEvent {
  national: boolean;
  name: string;
  url: string;
  date: string;
}

async function fetchEvents(): Promise<IEvent[]> {
  const events: IEvent[] = [];
  const request = await fetch(
    'http://www.webcal.fi/fi-FI/popup.php?content=eventlist&cid=3'
  );
  const html = await request.text();
  const tableLines = html
    .split(`<table class='eventlist'>`)[1]
    .split('</table>')[0]
    .trim()
    .split(/\n/g);

  const chunks = chunk(tableLines, 6);

  for (const event of chunks) {
    const flagColumn = event[0];
    const anchorColumn = event[2];
    const dateColumn = event[4];

    const national = flagColumn.includes(`<img`);
    const url = getBetween(anchorColumn, `href='`, `'`);
    const name = getBetween(anchorColumn, `\'>`, '</a>');
    const date = getBetween(dateColumn, `eiwrap'>`, '</td>');

    if (url && name && date) {
      events.push({
        national,
        url,
        name,
        date,
      });
    }
  }

  return events;
}

async function getTodaysEvent(): Promise<IEvent | undefined> {
  const holidays = await fetchEvents();
  const today = dateFormat('dd.mm.yyyy');
  const eventsToday = holidays.filter(x => x.date === today);
  const eventsNational = eventsToday.filter(x => x.national);
  const holiday = eventsNational[0] || sample(eventsToday);

  return holiday;
}

export default class extends ScheduleBase {
  async action(chatId: number): Promise<void> {
    const holiday = await getTodaysEvent();
    const holidayText = holiday
      ? `${holiday.national ? '🇫🇮 ' : ''}[${holiday.name}](${holiday.url})`
      : '';

    const message =
      `*Mornings!*\n` +
      `Tänään on ${dateFormat('dd.mm.yyyy')}\n` +
      `${holidayText}`;

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
    });
  }
}
