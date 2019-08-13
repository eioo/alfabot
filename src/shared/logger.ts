import { Signale } from 'signale';

export const logger = new Signale({
  config: {
    displayTimestamp: true,
  },
  types: {
    bot: {
      badge: '☻',
      color: 'cyan',
      label: 'bot',
    },
    database: {
      badge: '֍',
      color: 'green',
      label: 'database',
    },
    web: {
      badge: '⚡️',
      color: 'yellow',
      label: 'web',
    },
    api: {
      badge: '♥',
      color: 'magenta',
      label: 'api',
    },
  },
});
