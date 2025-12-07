import express from 'express';

const PORT = 3000;

class UserService {
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

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers(req, res) {
    const users = this.userService.getAllUsers();
    res.json({ success: true, data: users });
  }

  getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    const user = this.userService.getUserById(userId);
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  }

  createUser(req, res) {
    const newUser = this.userService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  }

  updateUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    const updatedUser = this.userService.updateUser(userId, req.body);
    if (updatedUser) {
      res.json({ success: true, data: updatedUser });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  }

  deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    const deletedUser = this.userService.deleteUser(userId);
    if (deletedUser) {
      res.json({ success: true, data: deletedUser });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  }
}

// Initialize service and controller
const userService = new UserService();
const userController = new UserController(userService);

// Create Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\nReceived request: ${req.method} ${req.url}`);
  next();
});

// Response logging middleware
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    console.log(`Response status: ${res.statusCode}`);
    console.log(`Response body: ${JSON.stringify(data, null, 2)}`);
    return originalJson.call(this, data);
  };
  next();
});

// Routes
app.get('/users', (req, res) => userController.getAllUsers(req, res));
app.get('/users/:id', (req, res) => userController.getUserById(req, res));
app.post('/users', (req, res) => userController.createUser(req, res));
app.put('/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
