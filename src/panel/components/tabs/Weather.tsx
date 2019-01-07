import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { ISocketResponse } from 'shared/types/sockets';
import { ICityData } from 'webserver/controllers/weather';
import { ControlPanelContext } from '../../containers/ControlPanel.context';
import { socket } from '../../services/sockets';
import { RemoveButton } from '../../theme';
import Input from '../Input';

interface IFormValues {
  cityName: string;
}

const CityListItem = styled.div`
  margin-bottom: 1rem;
`;

const CityName = styled.span`
  margin-left: 0.8rem;
`;

export default function Weather() {
  const { chat, setChat } = useContext(ControlPanelContext);
  const [values, setValues] = useState({ cityName: '' } as IFormValues);

  useEffect(() => {
    socket.on('city added', ({ cityName }: ICityData) => {
      chat.weather.cities.push(_.capitalize(cityName));
      setChat(chat);
      toast.info(`City was added to /weather command (${cityName})`);
    });

    socket.on('city removed', ({ cityName }: ICityData) => {
      _.remove(chat.weather.cities, x => x === _.capitalize(cityName));
      setChat(chat);
      toast.info(`City was removed from /weather command (${cityName})`);
    });
  }, []);

  const listCities = () => {
    const { cities } = chat.weather;

    return cities.map((cityName, i) => (
      <CityListItem key={i}>
        <RemoveButton
          className="fas fa-minus-circle"
          onClick={async () => {
            await removeCity(cityName);
          }}
        />
        <CityName>{cityName}</CityName>
      </CityListItem>
    ));
  };

  const addCity = async (cityName: string) => {
    const data: ICityData = {
      chatId: chat.chatid,
      cityName: _.capitalize(cityName),
    };

    socket.emit('add city', data, ({ error }: ISocketResponse) => {
      if (error) {
        toast.error(error);
        return;
      }

      chat.weather.cities.push(_.capitalize(cityName));
      setChat(chat);
    });
  };

  const removeCity = async (cityName: string) => {
    const data: ICityData = {
      chatId: chat.chatid,
      cityName: _.capitalize(cityName),
    };

    socket.emit('remove city', data);

    chat.weather.cities = chat.weather.cities.filter(x => x !== cityName);
    setChat(chat);
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
      toast.error('city exists!');
      return;
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
