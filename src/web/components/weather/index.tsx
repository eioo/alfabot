import React, { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Suggest } from 'react-geosuggest';

import { config } from '../../../shared/env';
import { IScheduleRule } from '../../../shared/types';
import { IChatSettings } from '../../../shared/types/database';
import { useScript } from '../../hooks/useScript';
import Toggle from '../Toggle';
import CityList from './CityList';
import CitySearch from './CitySearch';

interface IWeatherProps {
  chat: IChatSettings;
  socket: SocketIOClient.Socket;
}

export default function Weather({ chat, socket }: IWeatherProps) {
  const { hour, minute } = chat.weather.notificationTime;
  const time =
    hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');

  const [loaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${config.bot.googleMapsKey}&libraries=places`
  );

  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleSuggestSelect = (suggest: Suggest) => {
    if (!suggest || !suggest.gmaps) {
      return;
    }

    const cityName = suggest.gmaps.address_components[0].long_name;
    console.log(cityName);
  };

  const handleChangeTimeClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setTimePickerVisible(true);
  };

  const handleSelectTime = (date: Date) => {
    createSchedule({
      hour: date.getHours(),
      minute: date.getMinutes(),
    });
    setTimePickerVisible(false);
  };

  const handleNotificationChange = () => {
    chat.weather.notifications = !chat.weather.notifications;
    socket.emit('set chat', chat);

    if (chat.weather.notifications) {
      createSchedule({
        hour,
        minute,
      });
    }
  };

  const createSchedule = (scheduleRule: IScheduleRule) => {
    socket.emit('create schedule', chat.chatid, 'weather', scheduleRule);
  };

  if (!config.bot.googleMapsKey) {
    return (
      <div className="text-muted">
        <h2>Weather</h2>
        <p>Please add API Key</p>
      </div>
    );
  }

  if (!loaded || !chat) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div>
      <h3>Weather</h3>
      <Row>
        <Col sm>
          <CitySearch onSuggestSelect={handleSuggestSelect} />
          <Toggle
            checked={chat.weather.notifications}
            onChange={handleNotificationChange}
          >
            {chat.weather.notifications ? (
              <div>
                Daily notifications at {time} (
                <a href="" onClick={handleChangeTimeClick}>
                  Change time
                </a>
                )
              </div>
            ) : (
              'No notifications'
            )}
          </Toggle>
        </Col>
        <CityList chat={chat} socket={socket} />
      </Row>
    </div>
  );
}
