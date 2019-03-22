import CommandBase from 'bot/cmds/commandBase';
import fetch from 'node-fetch';
import * as queryString from 'query-string';
import Bot from 'shared/types/bot';

const SEARCH_TERM = 'laugh';
const API_KEY = process.env.GIPHY_KEY;

class RepsCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.name = 'reps';
    this.visible = false;
  }

  listen(): void {
    this.onText(/(reps|repesin|huuts|huut(i|o)o?(a|i|st?a?))/i, async msg => {
      if (!API_KEY) {
        return;
      }

      if (Math.random() < 0.70) {
        return; // Don't spam everytime
      }

      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${SEARCH_TERM}&rating=R`;
      const payload = queryString.stringify({
        api_key: API_KEY,
        tag: SEARCH_TERM,
        rating: 'R',
      });

      const request = await fetch(`${url}?${payload}`);
      const json = await request.json();
      const gifUrl = json.data.images.original.url;

      this.bot.sendDocument(msg.chat.id, gifUrl, {
        disable_notification: true,
      });
    });
  }
}

export default RepsCommand;
