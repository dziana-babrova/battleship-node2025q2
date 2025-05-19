import { RoomsStorageInstance } from '../services/Rooms/Rooms.service';
import { User } from '../services/Users/User.type';
import { UsersStorageInstance } from '../services/Users/Users.service';
import { WebSocket } from 'ws';
import { WinnersStorageInstance } from '../services/winners/Winners.service';

export const handleRegistration = (data: User, socket: WebSocket) => {
  const user = UsersStorageInstance.createUser(data, socket);
  if (user) {
    RoomsStorageInstance.updateRoom(user);
    WinnersStorageInstance.updateWinners(user, false);
  }
  return user;
};
