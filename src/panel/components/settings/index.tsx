import React from 'react';
import { Tab } from 'semantic-ui-react';
import styled from 'styled-components';
import ScheduleSettings from './ScheduleSettings';
import WeatherSettings from './WeatherSettings';

const TabList = styled(Tab)`
  & > .grid > .column:nth-child(2) {
    padding: 14px;
    padding-left: 0px;
  }
`;

const menuItems = {
  '/weather': <WeatherSettings />,
  Schedules: <ScheduleSettings />,
};

const panes = Object.entries(menuItems).map(([key, component]) => {
  return {
    menuItem: key,
    render: () => <Tab.Pane>{component}</Tab.Pane>,
  };
});

class Settings extends React.Component {
  render() {
    return (
      <TabList
        menu={{ fluid: true, vertical: true }}
        menuPosition='left'
        panes={panes}
      />
    );
  }
}

export default Settings;
