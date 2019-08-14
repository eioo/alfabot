import {
  EditMessageTextOptions,
  Message,
  SendMessageOptions,
} from 'node-telegram-bot-api';

import { logger } from '../../shared/logger';
import { Bot, IOnTextCallback } from '../../shared/types';
import { getHelpText } from './help/helpTexts';

abstract class CommandBase {
  name: string;
  helpText?: string;
  helpArgs?: string;
  helpDescription?: string;
  visible: boolean = true;

  constructor(public bot: Bot) {}

  abstract listen(): void;

  onText(regexp: RegExp, callback: IOnTextCallback) {
    this.bot.onText(regexp, msg => {
      const text = msg.text || '';
      const args = text.split(' ').slice(1);

      this.logMessage(msg);

      callback(msg, args, args.length);
    });
  }

  async showHelp(msg: Message, err: string = ''): Promise<void> {
    const errText = err ? `😞 *${err}*\n\n` : '';
    const helpText = errText + getHelpText(this.name);

    await this.reply(msg, helpText);
  }

  async reply(
    msg: Message | string | number,
    text: string | string[],
    options?: SendMessageOptions
  ): Promise<Message> {
    text = typeof text === 'string' ? text : text.join('\n');

    const chatid =
      typeof msg === 'string' || typeof msg === 'number'
        ? Number(msg)
        : msg.chat.id;

    const message = await this.bot.sendMessage(chatid, text, {
      parse_mode: 'Markdown',
      ...options,
    });

    return message;
  }

  async editReply(
    msg: Message,
    text: string,
    options?: EditMessageTextOptions
  ): Promise<Message> {
    const editedMsg = await this.bot.editMessageText(text, {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'Markdown',
      ...options,
    });

    return editedMsg as Message;
  }

  private logMessage(msg: Message): void {
    if (!msg.from) {
      return;
    }

    const firstName = msg.from.first_name || '';
    const lastName = msg.from.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();

    logger.bot(
      `${this.name || '<unknown>'} command triggered\n` +
        `Chat: ${msg.chat.id}\n` +
        `From: ${fullName}\n` +
        `Body: ${(msg.text || '').replace('\n', '\\n')}`
    );
  }
}

export default CommandBase;
