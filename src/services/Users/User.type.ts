import type { WebSocket } from 'ws';

export type User = {
  id: number;
  name: string;
  password: string;
  socket: WebSocket;
};
