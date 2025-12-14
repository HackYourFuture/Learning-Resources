const SALT_ROUNDS = 10;
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';

export default class UserService {
  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users.map((user) => ({ id: user.id, username: user.username }));
  }

  getUserById(id) {
    const user = this.users.find((user) => user.id === id);
    return user ? { id: user.id, username: user.username } : null;
  }

  getUserByUsername(username) {
    return this.users.find((user) => user.username === username);
  }

  async createUser({ username, password }) {
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const newUser = {
      id: randomUUID(),
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return { id: newUser.id, username: newUser.username };
  }

  async validateUser(username, password) {
    const user = this.getUserByUsername(username);
    if (user && (await compare(password, user.password))) {
      return { id: user.id, username: user.username };
    }
    return null;
  }
}
