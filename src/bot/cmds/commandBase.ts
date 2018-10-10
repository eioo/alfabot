import { logger } from '@shared/logger';
import { IOnTextCallback } from '@shared/types';
import * as TelegramBot from 'node-telegram-bot-api';

class CommandBase {
  name: string;
  helpText?: string;
  helpArgs?: string;

  constructor(public bot: TelegramBot) { }

  onText(regexp: RegExp, callback: IOnTextCallback) {
    this.bot.onText(regexp, (msg, _) => {
      const text = msg.text || '';
      const args = text.split(' ').slice(1);

      this.logMessage(msg);

      callback(msg, args, args.length);
    });
  }

  async reply(msg: TelegramBot.Message, text: string): Promise<TelegramBot.Message> {
    const message = await this.bot.sendMessage(msg.chat.id, text, {
      parse_mode: 'Markdown',
    });

    return message;
  }

  async editReply(msg: TelegramBot.Message, text: string): Promise<TelegramBot.Message> {
    const editedMsg = await this.bot.editMessageText(text, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'Markdown',
    });

    return editedMsg as TelegramBot.Message;
  }

  private logMessage(msg: TelegramBot.Message): void {
    const { from } = msg;

    if (!from) {
      return;
    }

    const fullName = `${from.first_name || ''} ${from.last_name || ''}`.trim();

    logger.bot(`New message (Chat: ${msg.chat.id})`);
    logger.bot(`From: ${fullName}`);

  }
}

export default CommandBase;
