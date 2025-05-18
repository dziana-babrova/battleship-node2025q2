import { User } from '../Users/User.type';
import { Room } from './Room.type';

class RoomsStorage {
  rooms: Room[] = [];

  createRoom() {
    const id = this.rooms.length + 1;
    const room: Room = {
      id,
      player1: null,
      player2: null,
    };
    this.rooms.push(room);
    return room;
  }

  checkFreeRooms() {
    return this.rooms.find((room) => !room.player1 || !room.player2);
  }

  updateRoom(player: User) {
    const freeRoom = this.checkFreeRooms();
    if (freeRoom && freeRoom.player1) {
      this.rooms[freeRoom.id].player2 = player.id;
    } else if (freeRoom && freeRoom.player2) {
      this.rooms[freeRoom.id].player1 = player.id;
    } else {
      const newRoom = this.createRoom();
      newRoom.player1 = player.id;
    }
  }
}

export const RoomsStorageInstance = new RoomsStorage();
