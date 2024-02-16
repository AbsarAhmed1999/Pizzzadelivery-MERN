const express = require('express');
const adminAuthController = require('../Controller/adminAuthController');
const authentication = require('../middleware/auth');
const adminRouter = express.Router();

// adminRouter.post('/register',adminAuthController.register);
// // Admin Routes 
// adminRouter.post('/login',adminAuthController.login);

// adminRouter.post('/logout',adminAuthController.logout);

adminRouter.get('/order',authentication,adminAuthController.Order);

adminRouter.post('/order/status',adminAuthController.OrderStatus);

module.exports = adminRouter;