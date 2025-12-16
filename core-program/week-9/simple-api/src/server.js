import express from 'express';
import { requestLogger, responseLogger } from './middleware.js';
import { UserController } from './user-controller.js';
import { UserService } from './user-service.js';

const PORT = 3000;

// Initialize service and controller
const userService = new UserService();
const userController = new UserController(userService);

// Create Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Custom logging middleware
app.use(requestLogger);
app.use(responseLogger);

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
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press CTRL+C to stop the server');
  }
});
