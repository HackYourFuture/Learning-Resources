import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eE8slP+RtiBVAH7zcY0vYttsKlDY5o0jeKLjEgSLllo=';
// The higher the number, the more secure password but also slower
const SALT_ROUNDS = 10;

const HTTP_STATUS = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
};

class UserService {
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

class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
}

class UserController {
  constructor(userService, authService) {
    this.userService = userService;
    this.authService = authService;
  }

  async register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }
    const existingUser = this.userService.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = await this.userService.createUser({ username, password });
    res.status(201).json(newUser);
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = this.authService.generateToken(user);
    res.json({ token });
  }

  logout(req, res) {
    // In a real application, you might handle token blacklisting here
    res.json({ message: 'Logged out successfully' });
  }

  getProfile(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = this.authService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    const user = this.userService.getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user profile
    res.status(200).json({
      message: `You are currently logged in as ${user.username}`,
    });
  }
}

function start(app) {
  const userService = new UserService();
  const authService = new AuthService(userService);
  const userController = new UserController(userService, authService);

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`\nReceived request: ${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body, null, 2)}`);
    next();
  });

  // Response logging middleware
  app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
      console.log(
        `Response status: ${res.statusCode} ${HTTP_STATUS[res.statusCode]}`
      );
      console.log(`Response body: ${JSON.stringify(data, null, 2)}`);
      return originalJson.call(this, data);
    };
    next();
  });

  app.post('/user/register', userController.register.bind(userController));
  app.post('/user/login', userController.login.bind(userController));
  app.post('/user/logout', userController.logout.bind(userController));
  app.get('/user/profile', userController.getProfile.bind(userController));

  // Serve the front-end application from the `client` folder
  app.use(express.static('client'));

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

const app = express();
start(app);
