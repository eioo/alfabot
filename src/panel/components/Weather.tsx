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
      {cities.map(city => (
        <li>{city}</li>
      ))}
    </ul>
  );
}

export default function Weather(props) {
  const chat: IChatSettings = props.chat;
  return <div>Ebin xD{listCities(chat)}</div>;
}
