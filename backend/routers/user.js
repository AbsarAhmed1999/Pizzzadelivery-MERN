const express = require('express');
const userAuthController = require('../Controller/userAuthController');
const authentication = require('../middleware/auth');
const userRouter = express.Router();


// User Routes 


userRouter.post('/register',userAuthController.register);

userRouter.post('/login',userAuthController.login);

userRouter.get('/',userAuthController.fetchPizza);

userRouter.post('/logout',userAuthController.logout);

// User/Order
userRouter.post('/order',authentication,userAuthController.Order);
// userRouter.get('/protected', userAuthController.authenticateToken);


module.exports = userRouter;