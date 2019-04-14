import React, { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import { config } from '../../shared/env';
import { IChatSettings } from '../../shared/types/database';
import Reminders from '../components/Reminders';

let socket: SocketIOClient.Socket;

export default function Panel() {
  const [chat, setChat] = useState<IChatSettings>(undefined);

  if (!socket || !socket.connected) {
    socket = io.connect(`http://${config.api.host}:${config.api.port}`);
  }

  useEffect(() => {
    if (!/^\/-?\d+$/.test(window.location.pathname)) {
      // TODO: Redirect to access denied
      return;
    }

    const chatId = Number(window.location.pathname.substr(1));

    socket.emit('get chat', chatId);
    socket.on('get chat', (data: IChatSettings) => {
      setChat(data);
    });
  }, []);

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Reminders chat={chat} socket={socket} />
    </div>
  );
}
