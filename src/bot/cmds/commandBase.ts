import * as TelegramBot from 'node-telegram-bot-api';
import { logger } from '@shared/logger';

class CommandBase {
  name: string;
  helpText?: string;
  helpArgs?: string;

  constructor(public bot: TelegramBot) { }

  onText(regexp: RegExp, callback: (msg: TelegramBot.Message, args: string[]) => void) {
    this.bot.onText(regexp, (msg_, _) => {
      const text = msg_.text || '';
      const args = text.split(' ').slice(1);

      this.logMessage(msg_);

      callback(msg_, args);
    });
  }

  async reply(msg: TelegramBot.Message, text: string): Promise<TelegramBot.Message> {
    const message = await this.bot.sendMessage(msg.chat.id, text, {
      parse_mode: 'Markdown'
    });

    return message;
  }

  async editReply(msg: TelegramBot.Message, text: string): Promise<TelegramBot.Message> {
    const editedMsg = await this.bot.editMessageText(text, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'Markdown'
    });

    return editedMsg as TelegramBot.Message;
  }

  private logMessage(msg: TelegramBot.Message): void {
    const { from } = msg;
    if (!from) return;

    const full_name = `${from.first_name || ''} ${from.last_name || ''}`.trim();

    logger.bot(`New message (Chat: ${msg.chat.id})`);
    logger.bot(`From: ${full_name}`);

  }
}

export default CommandBase;