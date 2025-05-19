import { User } from '../Users/User.type';

export type Room = {
  id: number;
  player1: User;
  player2: User | null;
};
