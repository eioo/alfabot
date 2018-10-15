import fetch from 'node-fetch'
import Bot from 'shared/types/bot';
import * as cheerio from 'cheerio';
import * as dateFormat from 'dateformat';
import * as _ from 'lodash';

interface IHoliday {
  national: boolean;
  name: string;
  url: string;
  date: string;
}

async function fetchHolidays(): Promise<IHoliday[]> {
  const holidays: IHoliday[] = [];
  const request = await fetch('http://www.webcal.fi/fi-FI/popup.php?content=eventlist&cid=3');
  const html = await request.text();

  const $ = cheerio.load(html);

  for (const row of Array.from($('tr'))) {
    holidays.push({
      national: !!$(row).find('td:nth-of-type(1) > img').length,
      url: $(row).find('td:nth-of-type(2) > a').attr('href'),
      name: $(row).find('td:nth-of-type(2) > a').text(),
      date: $(row).find('td:nth-of-type(4)').text().trim()
    })
  }

  return holidays;
}

export async function getTodaysHoliday(): Promise<IHoliday | undefined> {
  const holidays = await fetchHolidays();
  const currentTime = dateFormat('dd.mm.yyyy');
  const holiday = _.sample(holidays.filter(x => x.date === currentTime));

  return holiday;
}

export async function action(bot: Bot): Promise<void> {
  const holiday = await getTodaysHoliday();
  const holidayText = (() => {
    if (!holiday) {
      return '';
    }

    return `${holiday.national ? '🇫🇮 ' : ''}[${holiday.name}](${holiday.url})`
  })();

  const message =
    `*Mornings!*\n` +
    `Tänään on ${dateFormat('dd.mm.yyyy')}\n` +
    `${holidayText}`;

  bot.sendMessage(-161953743, message, {
    parse_mode: 'Markdown'
  })
}
