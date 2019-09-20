const routes = require('express').Router();
const SessionController = require('./app/controllers/sessionController');
const authMiddleware = require('./app/middleware/auth');
const DashboardController = require('./app/controllers/dashboardController');
const UserController = require('./app/controllers/userController');

routes.post('/session', SessionController.store);

// routes.use(authMiddleware);

routes.get('/dashboard', authMiddleware, DashboardController.access);

routes.get('/user', authMiddleware, UserController.getUser);
routes.get('/user/:id', authMiddleware, UserController.getUserById);
routes.post('/user', authMiddleware, UserController.createNewUser);
routes.put('/user/:id', authMiddleware, UserController.updateUser);
routes.delete('/user/:id', authMiddleware, UserController.deleteUser);

module.exports = routes;