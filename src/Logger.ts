import chalk from 'chalk';

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const logger = {
  log:     (text: string) => log(text),
  error:   (text: string) => log(error(text)),
  warning: (text: string) => log(warning(text))
};

function log(text: string) {
  const date = new Date();
  const hms = date.toTimeString().split(' ')[0];
  const timeStr = chalk.gray(`[${hms}]`);

  console.log(`${timeStr}   ${text}`);
}

export default logger;