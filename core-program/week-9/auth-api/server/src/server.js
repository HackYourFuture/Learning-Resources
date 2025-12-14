import express from 'express';
import { getReasonPhrase } from 'http-status-codes';
import path from 'path';

import AuthService from './auth-service.js';
import UserController from './user-controller.js';
import UserService from './user-service.js';

const __dirname = import.meta.dirname;

function start(app) {
  const userService = new UserService();
  const authService = new AuthService(userService);
  const userController = new UserController(userService, authService);

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`\nReceived request: ${req.method} ${req.url}`);
    if (req.body) {
      console.log(`Request body: ${JSON.stringify(req.body, null, 2)}`);
    } else {
      console.log('Request body: <empty>');
    }
    next();
  });

  // Response logging middleware
  app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
      console.log(
        `Response status: ${res.statusCode} ${getReasonPhrase(res.statusCode)}`
      );
      console.log(`Response body: ${JSON.stringify(data, null, 2)}`);
      return originalJson.call(this, data);
    };
    next();
  });

  app.post('/user/register', userController.register.bind(userController));
  app.post('/user/login', userController.login.bind(userController));
  app.post('/user/logout', userController.logout.bind(userController));
  app.get('/user/me', userController.getProfile.bind(userController));

  // Serve the front-end application from the `client` folder
  app.use(express.static(path.join(__dirname, '../../client')));

  app.listen(3000, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log('Server is running on port 3000');
    console.log('Press CTRL+C to stop the server');
    console.log('Client app available at http://localhost:3000');
  });
}

const app = express();
start(app);
