import io from 'socket.io-client';

export const socket = io(
  `http://${process.env.PANEL_HOST}:${process.env.WEBSERVER_PORT || 3000}/`
);
