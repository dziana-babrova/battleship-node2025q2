import { Messages } from '../../consts/messages';
import type { User } from './User.type';
import { WebSocket } from 'ws';

class UsersStorage {
  users: User[] = [];

  public createUser(user: Omit<User, 'id'>, socket: WebSocket) {
    const existingUser = this.checkUserPresence(user);
    if (!existingUser) {
      if (this.isUserValid(user)) {
        const newUser = {
          ...user,
          id: this.users.length + 1,
        };
        this.users.push(newUser);
        socket.send(Messages.reg(newUser.name, newUser.id, false, ''));
        return newUser;
      } else {
        socket.send(
          Messages.reg(
            user.name,
            this.users.length + 1,
            true,
            `Username and password should have at least 5 characters`,
          ),
        );
      }
    } else {
      if (user.password === existingUser.password) {
        socket.send(
          Messages.reg(existingUser.name, existingUser.id, false, ''),
        );
      } else {
        socket.send(
          Messages.reg(
            existingUser.name,
            existingUser.id,
            true,
            `Password for the user doesn't match`,
          ),
        );
      }
    }
  }

  private checkUserPresence(user: Omit<User, 'id'>) {
    return this.users.find((el) => el.name === user.name);
  }

  private isUserValid(user: Omit<User, 'id'>) {
    console.log(user);
    console.log(user.name.split('').length);
    return user.name.length >= 5 && user.password.length >= 5;
  }
}

export const UsersStorageInstance = new UsersStorage();
