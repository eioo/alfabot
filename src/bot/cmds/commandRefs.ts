import HelpCommand from './help';
import IBANCommand from './iban';
import PostiCommand from './posti';
import RemindCommand from './remind';
import TuleminenCommand from './tuleminen';
import WeatherCommand from './weather';

import DebugCommand from './debug';
import DoublesCommand from './doubles';

export const commandRefs = [
  WeatherCommand,
  HelpCommand,
  PostiCommand,
  IBANCommand,
  RemindCommand,
  TuleminenCommand,
  DoublesCommand,
]
