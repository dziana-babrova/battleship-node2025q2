import { WebSocket } from 'ws';
import { User } from '../Users/User.type';
import { Winner } from './Winner.type';
import { Messages } from '../../consts/messages';

class Winners {
  winners: Winner[] = [];

  private addWinner(user: User) {
    const winner: Winner = {
      id: user.id,
      name: user.name,
      wins: 0,
    };
    this.winners.push(winner);
  }

  private checkWinner(user: User) {
    return this.winners.findIndex((winner) => user.name === winner.name);
  }

  updateWinners(user: User, hasWon: boolean, socket: WebSocket) {
    const winnerIndex = this.checkWinner(user);
    if (winnerIndex === -1) {
      this.addWinner(user);
    } else if (hasWon) {
      this.winners[winnerIndex].wins++;
    }
    socket.send(Messages.update_winners(this.winners));
  }
}

export const WinnersStorageInstance = new Winners();
