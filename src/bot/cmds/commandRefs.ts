
import HelpCommand from './help';
import IBANCommand from './iban';
import PostiCommand from './posti';
import RemindCommand from './remind';
import TuleminenCommand from './tuleminen';
import WeatherCommand from './weather';

import DebugCommand from './debug';

export const commandRefs = [
  WeatherCommand,
  HelpCommand,
  DebugCommand,
  PostiCommand,
  IBANCommand,
  RemindCommand,
  TuleminenCommand,
]
