import Bot from 'shared/types/bot';

const text = `It's 420‼️🍁🍃🍃 I BLAZE 💨💨💨 because I just dont care 😬😜😝 and getting high 😱😱😱🚬 makes me forget 😤😷 all the PAIN 😩😖😪 of being a MIDDLE SCHOOLER 💀🙅💁`;

export function action(bot: Bot): void {
  bot.sendMessage(-161953743, text, {
    disable_notification: true
  });
}
