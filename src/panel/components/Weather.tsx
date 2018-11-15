import _ from 'lodash';
import React from 'react';
import { IChatSettings } from '../../shared/types/database';

function listCities(chat: IChatSettings) {
  if (_.isEmpty(chat)) {
    return;
  }

  const { cities } = chat.weather;

  return (
    <ul>
      {cities.map((city, i) => (
        <li key={i}>{city}</li>
      ))}
    </ul>
  );
}

export default function Weather(props) {
  const chat: IChatSettings = props.chat;
  return <div>Ebin xD{!_.isEmpty(chat) ? listCities(chat) : 'oot gay'}</div>;
}
