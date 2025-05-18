import { RoomsStorageInstance } from '../models/Rooms/Rooms.model';
import { User } from '../models/Users/User.type';
import { UsersStorageInstance } from '../models/Users/Users.model';
import { WebSocket } from 'ws';

export const handleRegistration = (data: User, socket: WebSocket) => {
  UsersStorageInstance.createUser(data, socket);
  RoomsStorageInstance.updateRoom(data);
  console.log(data);
};
