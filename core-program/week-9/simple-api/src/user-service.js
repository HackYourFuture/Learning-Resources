export class UserService {
  constructor() {
    // Simple in-memory data store
    this.users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    this.nextId = 3;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  createUser(data) {
    const newUser = { id: this.nextId++, ...data };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, data) {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, data);
      return user;
    }
    return null;
  }

  deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
