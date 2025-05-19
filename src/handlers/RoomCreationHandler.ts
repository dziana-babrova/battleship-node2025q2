import { RoomsStorageInstance } from '../services/Rooms/Rooms.service';
import { User } from '../services/Users/User.type';
import { UsersStorageInstance } from '../services/Users/Users.service';
import { WebSocket } from 'ws';
import { WinnersStorageInstance } from '../services/winners/Winners.service';

export const handleRoomCreation = (creator: User) => {
  RoomsStorageInstance.updateRoom(creator);
};
