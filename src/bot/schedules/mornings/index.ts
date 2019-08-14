import * as cheerio from 'cheerio';
import * as dateFormat from 'dateformat';
import fetch from 'unfetch';

import { sample } from '../../../shared/utils';
import { bot } from '../../bot';

interface IHoliday {
  national: boolean;
  name: string;
  url: string;
  date: string;
}

async function fetchHolidays(): Promise<IHoliday[]> {
  const holidays: IHoliday[] = [];
  const request = await fetch(
    'http://www.webcal.fi/fi-FI/popup.php?content=eventlist&cid=3'
  );
  const html = await request.text();
  const $ = cheerio.load(html);

  for (const row of Array.from($('tr'))) {
    holidays.push({
      national: !!$(row).find('td:nth-of-type(1) > img').length,
      url: $(row)
        .find('td:nth-of-type(2) > a')
        .attr('href'),
      name: $(row)
        .find('td:nth-of-type(2) > a')
        .text(),
      date: $(row)
        .find('td:nth-of-type(4)')
        .text()
        .trim(),
    });
  }

  return holidays;
}

export async function getTodaysHoliday(): Promise<IHoliday | undefined> {
  const holidays = await fetchHolidays();
  const currentTime = dateFormat('dd.mm.yyyy');
  const todaysHolidays = holidays.filter(x => x.date === currentTime);
  const nationalHolidays = todaysHolidays.filter(x => x.national);
  const holiday = nationalHolidays[0] || sample(todaysHolidays);

  return holiday;
}

export async function action(chatId: number): Promise<void> {
  const holiday = await getTodaysHoliday();
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
