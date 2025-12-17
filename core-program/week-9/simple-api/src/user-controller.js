export class UserController {
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
