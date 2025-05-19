import { WebSocket } from 'ws';
import { Message, Types } from './Message.type';
import { handleRegistration } from '../handlers/RegistrationHandler';
import { handleRoomCreation } from '../handlers/RoomCreationHandler';

const types = {
  reg: handleRegistration,
  create_room: handleRoomCreation,
};

export const handleConnection = (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message);
    const receivedType: Types = parsedMessage.type;
    const parsedData = JSON.parse(parsedMessage.data);
    types[receivedType](parsedData, ws);
    console.log(parsedData);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};
