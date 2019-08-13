import { config } from '../shared/env';
import { logger } from '../shared/logger';

// tslint:disable: no-var-requires
const Bundler = require('parcel-bundler');

const Reset = '\x1b[0m';
const Cyan = '\x1b[36m';

const bundler = new Bundler('src/web/index.html', {
  logLevel: 0,
});

let startDate: Date;

bundler.on('buildStart', () => {
  logger.web(`Building web panel`);
  startDate = new Date();
});

bundler.on('buildEnd', () => {
  const deltaTime = +new Date() - +startDate;
  logger.web(`Web panel build done. Took ${deltaTime}ms. `);
});

(async () => {
  await bundler.serve(config.panel.port);

  logger.web(
    `Web panel url: ${Cyan}http://localhost:${config.panel.port + Reset}`
  );
})();
