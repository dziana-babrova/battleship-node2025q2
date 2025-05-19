import { Winner } from '../models/winners/Winner.type';

export const Messages = {
  reg: (
    name: string,
    index: number | string,
    error: boolean,
    errorText: string,
  ) =>
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name,
        index,
        error,
        errorText,
      }),
      id: 0,
    }),
  update_winners: (data: Winner[]) =>
    JSON.stringify({
      type: 'update_winners',
      data: JSON.stringify(data),
      id: 0,
    }),
  create_room: () => ({
    type: 'create_room',
    data: '',
    id: 0,
  }),
  add_user_to_room: (indexRoom: number | string) => ({
    type: 'add_user_to_room',
    data: {
      indexRoom,
    },
    id: 0,
  }),
  update_room: (
    roomId: number | string,
    name: string,
    index: number | string,
  ) =>
    JSON.stringify({
      type: 'update_room',
      data: JSON.stringify([
        {
          roomId,
          roomUsers: [
            {
              name,
              index,
            },
          ],
        },
      ]),
      id: 0,
    }),
};
