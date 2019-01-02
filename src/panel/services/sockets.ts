import io from 'socket.io-client';

export const socket = io(
  `http://localhost:${process.env.WEBSERVER_PORT || 3000}/`
);
