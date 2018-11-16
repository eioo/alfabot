import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { ControlPanelContext } from '../containers/ControlPanel.context';
import { getAPIUrl } from '../shared/apiBuilder';

import Input from './Input';

export default function Weather() {
  const { chat, setChat } = useContext(ControlPanelContext);
  const [values, setValues] = useState({ cityName: '' });

  const listCities = () => {
    if (_.isEmpty(chat)) {
      return;
    }

    const { cities } = chat.weather;

    return (
      <ul>
        {cities.map((cityName, i) => {
          const removeLink = (
            <a
              href="#"
              onClick={async () => {
                await removeCity(cityName);
              }}
            >
              x
            </a>
          );

          return (
            <li key={i}>
              [{removeLink}] {cityName}
            </li>
          );
        })}
      </ul>
    );
  };

  const removeCity = async (cityName: string) => {
    const response = await fetch(getAPIUrl('weather/remove'), {
      method: 'POST',
      body: JSON.stringify({
        chatId: chat.chatid,
        cityName,
      }),
    });
    const result = await response.json();

    if (result.status !== 'ok') {
      alert(result.error);
    }

    chat.weather.cities = chat.weather.cities.filter(x => x !== cityName);
    setChat(chat);
  };

  const addCity = async (cityName: string) => {
    const response = await fetch(getAPIUrl('weather/add'), {
      method: 'POST',
      body: JSON.stringify({
        chatId: chat.chatid,
        cityName,
      }),
    });
    const result = await response.json();

    if (result.status !== 'ok') {
      return alert(result.error);
    }

    chat.weather.cities.push(_.capitalize(cityName));
    setChat({
      ...chat,
    });
  };

  const onChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async () => {
    const { cities } = chat.weather;
    const { cityName } = values;

    const cityExists = cities.some(x => _.toLower(x) === _.toLower(cityName));

    setValues({ cityName: '' });

    if (cityExists) {
      return alert('City exists!');
    }

    addCity(cityName);
  };

  return (
    <>
      {listCities()}

      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label>Add city/place:</label>
        <p>
          <Input
            name="cityName"
            type="text"
            placeholder="Oulu, FI"
            value={values.cityName}
            onChange={onChange}
          />
          <button>Add</button>
        </p>
      </form>
    </>
  );
}
