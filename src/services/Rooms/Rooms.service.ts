import WebSocket from 'ws';
import { User } from '../Users/User.type';
import { Room } from './Room.type';
import { Messages } from '../../consts/messages';
import { UsersStorageInstance } from '../Users/Users.service';

class RoomsStorage {
  rooms: Room[] = [];

  public createRoom(player1: User) {
    const id = this.rooms.length + 1;
    const room: Room = {
      id,
      player1,
      player2: null,
    };
    this.rooms.push(room);
    return room;
  }

  checkFreeRooms() {
    return this.rooms.filter((room) => !room.player2);
  }

  updateRoom(player: User) {
    const freeRooms = this.checkFreeRooms();
    console.log(this.rooms);
    if (this.rooms.length === 0) {
      player.socket.send(Messages.update_room([]));
    } else {
      const rooms = this.rooms.map((room) => {
        return {
          roomId: room.id,
          roomUsers: [
            {
              name: room.player1.name,
              index: room.player1.id,
            },
          ],
        };
      });
      UsersStorageInstance.getUsers().forEach((user) => {
        user.socket.send(Messages.update_room(rooms));
      });
    }
  }
}

export const RoomsStorageInstance = new RoomsStorage();
