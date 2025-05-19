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

  updateWinners(player: User, hasWon: boolean) {
    const winnerIndex = this.checkWinner(player);
    if (winnerIndex !== -1 && hasWon) {
      this.winners[winnerIndex].wins++;
    } else if (winnerIndex === -1 && hasWon) {
      this.addWinner(player);
      this.winners[this.winners.length - 1].wins++;
    }
    player.socket.send(Messages.update_winners(this.winners));
  }
}

export const WinnersStorageInstance = new Winners();
