import { WebSocket } from 'ws';
import { Message, Types } from './Message.type';
import { User } from '../services/Users/User.type';
import { handleRegistration } from '../handlers/RegistrationHandler';
import { handleRoomCreation } from '../handlers/RoomCreationHandler';
import { handleAddingToRoom } from '../handlers/AddingToRoomHandler';

const types = {
  create_room: handleRoomCreation,
  add_user_to_room: handleAddingToRoom,
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
