import _ from 'lodash';
import * as queryString from 'query-string';
import React from 'react';
import { IChatSettings } from '../../shared/types/database';
import { getAPIUrl } from '../apiBuilder';

interface IWeatherProps {
  chat: IChatSettings;
}

function listCities(chat: IChatSettings) {
  if (_.isEmpty(chat)) {
    return;
  }

  const { cities } = chat.weather;

  return (
    <ul>
      {cities.map((city, i) => {
        const removeLink = (
          <a
            href="#"
            onClick={async () => {
              await removeCity(chat.chatid, city);
            }}
          >
            x
          </a>
        );

        return (
          <li key={i}>
            [{removeLink}] {city}
          </li>
        );
      })}
    </ul>
  );
}

async function removeCity(chatId: number, cityName: string) {
  await fetch(getAPIUrl('weather/remove'), {
    method: 'POST',
    body: queryString.stringify({
      chatId,
      cityName,
    }),
  });
}

export default function Weather(props: IWeatherProps) {
  const { chat } = props;

  return (
    <div>
      {listCities(chat)}

      <label>Add city/place:</label>
      <p>
        <input type="text" placeholder="Oulu, FI" />
        <button>Add</button>
      </p>
    </div>
  );
}
