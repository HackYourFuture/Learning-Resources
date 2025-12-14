import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eE8slP+RtiBVAH7zcY0vYttsKlDY5o0jeKLjEgSLllo=';

export default class AuthService {
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
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return null;
    }
  }
}
