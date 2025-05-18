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
  update_winners: (name: string, wins: number) => ({
    type: 'update_winners',
    data: [
      {
        name,
        wins,
      },
    ],
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
  ) => ({
    type: 'update_room',
    data: [
      {
        roomId,
        roomUsers: [
          {
            name,
            index,
          },
        ],
      },
    ],
    id: 0,
  }),
};
