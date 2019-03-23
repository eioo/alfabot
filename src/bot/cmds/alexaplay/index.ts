import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';

import { IVideo } from './types';
import { API_KEY, getVideo } from './youtubeAPI';

class AlexaPlayCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.visible = false;
  }

  listen(): void {
    this.onText(
      /^(alexa play|alfabot soita) .+/i,
      async (msg, args, argCount) => {
        if (!API_KEY || argCount === 0) {
          return;
        }

        const searchText = args.join(' ');
        const video: IVideo | undefined = await getVideo(searchText);

        if (!video) {
          this.reply(msg, `😢 Song not found`);
          return;
        }

        this.reply(msg, `[🎵](${video.url}) Now playing`);
      }
    );
  }
}

export default AlexaPlayCommand;
