import styled from '@emotion/styled';
import React from 'react';
import { Col } from 'react-bootstrap';

import { IChatSettings } from '../../../shared/types/database';

const CityColumn = styled(Col)`
  padding-top: 11px;
  ul {
    list-style-type: none;
    margin: 0;
    margin-left: -12px;
    padding: 0;

    li {
      margin-left: 10px;
    }
  }
`;

const RemoveButton = styled.span`
  margin-bottom: 15px;
  margin-right: 5px;
  padding-bottom: 5px;
  font-size: 18px;
  cursor: pointer;

  &:before {
    content: '❌';
  }
`;

interface ICityListProps {
  chat: IChatSettings;
  socket: SocketIOClient.Socket;
}

export default function CityList({ chat, socket }: ICityListProps) {
  const { cities } = chat.weather;

  const handleRemoveClick = (cityName: string) => {
    chat.weather.cities = cities.filter(
      c => c.toLowerCase() !== cityName.toLowerCase()
    );

    socket.emit('set chat', chat);
  };

  return (
    <CityColumn sm>
      <h5>Chat places</h5>
      <ul>
        {cities.length ? (
          cities.map(city => (
            <li key={city}>
              <RemoveButton onClick={() => handleRemoveClick(city)} /> {city}
            </li>
          ))
        ) : (
          <li className="text-muted">None yet!</li>
        )}
      </ul>
    </CityColumn>
  );
}
