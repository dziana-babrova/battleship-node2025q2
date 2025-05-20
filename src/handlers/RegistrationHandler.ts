import { User } from '../services/Users/User.type';
import { UsersStorageInstance } from '../services/Users/Users.service';
import { WebSocket } from 'ws';

export const handleRegistration = (data: User, socket: WebSocket) => {
  const user = UsersStorageInstance.createUser(data, socket);
  return user;
};
