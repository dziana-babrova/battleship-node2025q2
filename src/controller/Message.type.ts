export type Message<T> = {
  type: string;
  data: T;
  id: 0;
};

export type Types = 'reg' | 'create_room';
