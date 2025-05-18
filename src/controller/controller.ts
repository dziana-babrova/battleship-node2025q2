import { WebSocket } from 'ws';
import { Message, Types } from './Message.type';
import { handleRegistration } from '../handlers/RegistrationHandler';

const types = {
  reg: handleRegistration,
};

export const handleConnection = (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message);
    const receivedType: Types = parsedMessage.type;
    types[receivedType](parsedMessage.data, ws);
    console.log(parsedMessage);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};
