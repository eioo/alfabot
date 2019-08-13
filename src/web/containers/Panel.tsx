import '../../../node_modules/rc-time-picker/assets/index.css';
import '../assets/bootstrap.min.css';
import './panel.scss';

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import * as io from 'socket.io-client';

import { config } from '../../shared/env';
import { IChatSettings } from '../../shared/types/database';
import Reminders from '../components/reminders';
import Schedules from '../components/schedules';
import Weather from '../components/weather';

let socket: SocketIOClient.Socket;

export default function Panel() {
  const isValidUrl = /^\/-?\d+$/.test(window.location.pathname);

  if (!isValidUrl) {
    return <Container>Go away!</Container>;
  }

  const [chat, setChat] = useState<IChatSettings>();

  if (!socket || !socket.connected) {
    socket = io.connect(`http://${config.api.host}:${config.api.port}`);
  }

  useEffect(() => {
    const chatId = Number(window.location.pathname.substr(1));

    socket.emit('get chat', chatId);
    socket.on('get chat', (data: IChatSettings) => {
      setChat(data);
    });
  }, []);

  if (!chat) {
    return <Container>Loading chat...</Container>;
  }

  return (
    <Container>
      <Schedules chat={chat} socket={socket} />
      <hr />
      <Weather chat={chat} socket={socket} />
      <hr />
      <Reminders chat={chat} socket={socket} />
    </Container>
  );
}
