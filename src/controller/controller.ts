import { WebSocket } from 'ws';

const types = {
  reg: () => {},
};

export const handleConnection = (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    ws.send(JSON.stringify(`Echo: ${message}`));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send(JSON.stringify('Welcome to WebSocket server!'));
};
