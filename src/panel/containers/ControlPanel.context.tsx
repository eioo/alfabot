import React from 'react';

import { IChatSettings } from '../../shared/types/database';

interface IControlPanelContext {
  chat: IChatSettings;
  setChat: React.Dispatch<React.SetStateAction<IChatSettings>>;
  currentTab: string;
  selectTab: React.Dispatch<React.SetStateAction<string>>;
  commands: string[];
}

export const ControlPanelContext = React.createContext(
  {} as IControlPanelContext
);
