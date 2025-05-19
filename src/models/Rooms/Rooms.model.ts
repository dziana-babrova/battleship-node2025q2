import WebSocket from 'ws';
import { User } from '../Users/User.type';
import { Room } from './Room.type';
import { Messages } from '../../consts/messages';

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

  updateRoom(player: User, socket: WebSocket) {
    let freeRoom = this.checkFreeRooms();
    if (freeRoom && freeRoom.player1) {
      this.rooms[freeRoom.id].player2 = player.id;
    } else if (freeRoom && freeRoom.player2) {
      this.rooms[freeRoom.id].player1 = player.id;
    } else {
      freeRoom = this.createRoom();
      freeRoom.player1 = player.id;
    }
    socket.send(Messages.update_room(freeRoom.id, player.name, player.id));
    console.log(freeRoom);
  }
}

export const RoomsStorageInstance = new RoomsStorage();
