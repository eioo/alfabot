import CommandBase from 'bot/cmds/commandBase';
import Bot from 'shared/types/bot';
import { IVideo } from './types';
import { API_KEY, getVideo } from './youtubeApi';

class AlexaPlayCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);
    this.name = 'alexaplay';
    this.visible = false;
  }

  listen(): void {
    this.onText(
      /^(alexa play|alfabot soita) .+/i,
      async (msg, args, argCount) => {
        if (argCount === 0 || !API_KEY) {
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
