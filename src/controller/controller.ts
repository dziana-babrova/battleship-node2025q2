import { WebSocket } from 'ws';
import { Message, Types } from './Message.type';
import { handleRegistration } from '../handlers/RegistrationHandler';
import { handleRoomCreation } from '../handlers/RoomCreationHandler';
import { User } from '../services/Users/User.type';

const types = {
  create_room: handleRoomCreation,
};

export const handleConnection = (ws: WebSocket) => {
  let registeredUser: User | undefined = undefined;
  console.log('Client connected');

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    const receivedType: Types = parsedMessage.type;
    const parsedData = parsedMessage.data ? JSON.parse(parsedMessage.data) : '';
    switch (receivedType) {
      case 'reg':
        registeredUser = handleRegistration(parsedData, ws);
        break;
      default:
        if (registeredUser) types[receivedType](registeredUser);
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};
