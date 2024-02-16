const UserDto = require("../dto/user");
const User = require("../models/user");
const joi = require("joi");
const Order = require("../models/order");
const JWTService = require("../services/jwtservice");
const bcrypt = require("bcrypt");
const pizzaModel = require("../models/pizza");
const userAuthController = {
  async fetchPizza(req, res, next) {
    let allPizza;
    try {
      allPizza = await pizzaModel.find();
    } catch (e) {
      return error;
    }
    return res.status(201).json({
      message: "All pizzas Fetched Successfully",
      allPizza: allPizza,
    });
  },

  async register(req, res, next) {
    const userRegisterSchema = joi.object({
      name: joi.string().max(30).required(),
      username: joi.string().min(5).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, username, email, password } = req.body;
    try {
      const UserNameInUse = await User.exists({ username });
      if (UserNameInUse) {
        const error = {
          status: 401,
          message: "Username already Registered",
        };
        return next(error);
      }
      const emailInUse = await User.exists({ email });
      if (emailInUse) {
        const error = {
          status: 401,
          message: "Email already Registered",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
      const registerUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });
      user = await registerUser.save();
      accessToken = JWTService.signAccessToken(
        {
          _id: user._id,
        },
        "30m"
      );
    } catch (error) {
      return next(error);
    }
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    const userDto = new UserDto(user);

    return res.status(201).json({
      message: "User registered Successfully",
      user: userDto,
      auth: true,
    });
  },
  async login(req, res, next) {
    const userLoginSchema = joi.object({
      username: joi.string().min(5).max(30).required(),
      password: joi.string().required(),
      role: joi.string().required(),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, password, role } = req.body;
    let user;
    let accessToken;
    let admin;

    if (role === "admin") {
      try {
        // findOne returns an Object representing a user document
        // with fields described in models such as name, password , role
        // if nothing found returns null
        admin = await User.findOne({ role: role });
        if (!admin) {
          const error = {
            status: 401,
            message: "Invalid Username",
          };
          return next(error);
        }
        if (password !== admin.password) {
          const error = {
            status: 401,
            message: "Invalid password",
          };
          return next(error);
        }
        accessToken = JWTService.signAccessToken({ _id: admin._id }, "30m");
      } catch (e) {
        return next(e);
      }
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      });
      const userDto = new UserDto(admin);
      return res
        .status(200)
        .json({
          user: userDto,
          auth: true,
          message: "Admin Login Successfully",
        });
    } else {
      try {
        // globally defined user will work outside try catch method
        // FindOne will either return a document or null, undefined, false boolean value if nothing found
        user = await User.findOne({ username: username });
        if (!user) {
          const error = {
            status: 401,
            message: "Invalid Username",
          };
          return next(error);
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          const error = {
            status: 401,
            message: "Invalid password",
          };
          return next(error);
        }
        accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      } catch (error) {
        return next(error);
      }
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      const userDto = new UserDto(user);
      return res
        .status(200)
        .json({
          user: userDto,
          auth: true,
          message: "User Login Successfully",
        });
    }
  },
  async authenticateToken(req,res,next){
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
    return res.json({message:'You have access to this protected route'});
  },
  async logout(req, res, next) {
    res.clearCookie("accessToken");
    // 2. Send response to user
    res.status(200).json({ admin: null, auth: false });
  },

  async Order(req, res, next) {
    const ordersData = req.body; // Assuming req.body is an array of objects
    console.log(ordersData);
    let OrderSaved;
    let savedOrder = [];
    try {
      for (const pointer of ordersData) {
        const tempsaveOrder = new Order({
          CustomerId: pointer.customerId.id,
          pizzaDetails: {
            Name: pointer.Name,
            base: pointer.base,
            sauce: pointer.sauce,
            veggies: pointer.veggies,
            count: pointer.count,
            image: pointer.image,
          },
        });
        OrderSaved = await tempsaveOrder.save();
        savedOrder.push(OrderSaved);
      }
    } catch (error) {
      return next(error);
    }

    if (savedOrder.length > 0) {
      return res.status(200).json({
        order: savedOrder,
        message: "Order Has been Placed Successfully",
      });
    } else {
      return res.status(401).json({
        order: savedOrder,
        message: "Order not placed, please click again",
      });
    }
  
  }
}
module.exports = userAuthController;
