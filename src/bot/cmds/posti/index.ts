import CommandBase from 'bot/cmds/commandBase';
import * as puppeteer from 'puppeteer';
import Bot from 'shared/types/bot';

const TRACKING_URL = 'https://t.17track.net/en#nums=';

interface IDetail {
  time: string;
  text: string;
}

interface ITrackingDetails {
  currentStatus: string;
  details: IDetail[];
}

async function getTrackingDetails(
  trackingCode: string
): Promise<ITrackingDetails> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${TRACKING_URL}${trackingCode}`);

  return await page.evaluate(() => {
    const statusElement = document.querySelector(
      '.tracklist-item .text-capitalize'
    );
    const detailsElement = document.querySelectorAll(
      '.tracklist-details dl.ori-block dd div'
    );

    if (!statusElement || !detailsElement) {
      return 'Ei löytynyt';
    }

    const details = Array.from(detailsElement).map(element => {
      const timeElement = element.querySelector('time');
      const textElement = element.querySelector('p');

      if (!timeElement || !textElement) {
        return {
          time: '',
          text: '',
        };
      }

      return {
        time: timeElement.textContent,
        text: textElement.textContent,
      };
    });

    return {
      currentStatus: statusElement.textContent,
      details,
    };
  });
}

class PostiCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.name = 'posti';
    this.helpText = 'Gets tracking information from Posti';
    this.helpArgs = '[tracking number]';
  }

  listen(): void {
    this.onText(/^\/posti/i, async msg => {
      const args = (msg.text || '').split(' ');

      if (!args[1]) {
        return;
      }

      const trackingCode = args[1];
      const reply = await this.reply(msg, 'Haetaan lähetystä...');
      const status = await getTrackingDetails(trackingCode);

      this.editReply(reply, status.currentStatus);

      const details = status.details
        .map(detail => `*${detail.time}:* ${detail.text}`)
        .join('\n');

      if (details.length === 0) {
        return;
      }

      this.reply(msg, details);
    });
  }
}

export default PostiCommand;
