import { Signale } from 'signale';

export const logger = new Signale({
  config: {
    displayTimestamp: true,
  },
  types: {
    bot: {
      badge: '🤖',
      color: 'yellow',
      label: 'bot',
    },
  },
});
