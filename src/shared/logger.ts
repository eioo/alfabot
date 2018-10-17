import { Signale } from 'signale';

export const logger = new Signale({
  config: {
    displayTimestamp: true,
  },
  types: {
    bot: {
      badge: '🤖',
      color: 'cyan',
      label: 'bot',
    },
    database: {
      badge: '💾',
      color: 'yellow',
      label: 'bot',
    },
  },
});
