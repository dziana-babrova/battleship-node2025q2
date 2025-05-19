import { RoomsStorageInstance } from '../models/Rooms/Rooms.model';
import { User } from '../models/Users/User.type';
import { UsersStorageInstance } from '../models/Users/Users.model';
import { WebSocket } from 'ws';
import { WinnersStorageInstance } from '../models/winners/Winners.model';

export const handleRoomCreation = (data: User, socket: WebSocket) => {
  const user;
  RoomsStorageInstance.updateRoom();
};
