import type { User } from './User.type';

class Users {
  users: User[] = [];

  public createUser(user: User) {
    this.users.push(user);
  }
}
