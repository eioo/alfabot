import Bot from '@bot';
import { logger } from '@shared/logger';
import { IOnTextCallback } from '@shared/types';
import * as _ from 'lodash';
import { Message } from 'node-telegram-bot-api';
import { helpSingle } from './help';

class CommandBase {
  name: string;
  helpText?: string;
  helpArgs?: string;

  constructor(public bot: Bot) { }

  onText(regexp: RegExp, callback: IOnTextCallback) {
    this.bot.onText(regexp, (msg) => {
      const text = msg.text || '';
      const args = text.split(' ').slice(1);

      this.logMessage(msg);

      callback(msg, args, args.length);
    });
  }

  async showHelp(msg: Message): Promise<void> {
    const helpText = helpSingle(this.name);

    await this.bot.sendMessage(msg.chat.id, helpText, {
      parse_mode: 'Markdown',
    });
  }

  async reply(msg: Message, text: string): Promise<Message> {
    const message = await this.bot.sendMessage(msg.chat.id, text, {
      parse_mode: 'Markdown',
    });

    return message;
  }

  async editReply(msg: Message, text: string): Promise<Message> {
    const editedMsg = await this.bot.editMessageText(text, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'Markdown',
    });

    return editedMsg as Message;
  }

  private logMessage(msg: Message): void {
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
