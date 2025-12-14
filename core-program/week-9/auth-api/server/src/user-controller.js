import { StatusCodes } from 'http-status-codes';

export default class UserController {
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
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Username already exists' });
    }
    const newUser = await this.userService.createUser({ username, password });
    res.status(StatusCodes.CREATED).json(newUser);
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Username and password are required' });
    }
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid username or password' });
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
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = this.authService.verifyToken(token);
    if (!decoded) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
    }
    const user = this.userService.getUserById(decoded.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    // Return user profile
    res.status(StatusCodes.OK).json({
      message: `You are currently logged in as ${user.username}`,
    });
  }
}
