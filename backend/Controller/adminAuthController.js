const passwordPattern = /(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}/;
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const joi = require("joi");
const JWTService = require("../services/jwtservice");
const AdminDto = require("../dto/admin");
const Order = require("../models/order");
const User = require('../models/user');
const adminAuthController = {
  // async register(req, res, next) {
  //   const adminRegisterSchema = joi.object({
  //     name: joi.string().max(30).required(),
  //     username: joi.string().min(5).max(30).required(),
  //     email: joi.string().email().required(),
  //     password: joi.string().pattern(RegExp(passwordPattern)).required(),
  //   });
  //   const { error } = adminRegisterSchema.validate(req.body);

  //   if (error) {
  //     return next(error);
  //   }

  //   const { name, username, email, password } = req.body;
  //   let admin;
  //   let accessToken;
  //   try {
  //     const count = await Admin.countDocuments({});
  //     if (count === 0) {
  //       const hashedPassword = await bcrypt.hash(password, 10);
  //       const adminToRegister = new Admin({
  //         name: name,
  //         email: email,
  //         username: username,
  //         password: hashedPassword,
  //       });
  //       // making mistake of using await keyword . Always use await keyword when storing data
  //       admin = await adminToRegister.save();
  //       accessToken = JWTService.signAccessToken(
  //         { username: admin.username },
  //         "30m"
  //       );
  //     } else {
  //       return res.json({ message: "Admin already Exist" });
  //     }
  //   } catch (error) {
  //     return next(error);
  //   }
    
  //   res.cookie('accessToken',accessToken,{
  //     maxAge: 1000*60*60*24,
  //     httpOnly: true,
  //  })
  //  const adminDto = new AdminDto(admin);
  //  return res.status(201).json({message: 'Admin registered Successfully', admin:adminDto , auth:true});
   
  // },

  // async login(req,res,next){
  //   const adminLoginSchema = joi.object({
  //     username:joi.string().min(5).max(30).required(),
  //     password: joi.string().pattern(RegExp(passwordPattern)).required()
  //   })

  //   const {error} = adminLoginSchema.validate(req.body);
  //   if(error){
  //     return next(error);
  //   }
  //   const {username, password} = req.body;
  //   let admin;
  //   let accessToken;
  //   try{
  //     admin = await Admin.findOne({username});
  //     if(!admin){
  //       const error = {
  //         status:401,
  //         message: 'Invalid Username or password'
  //       }
  //       return next(error)
  //     }
  //     const matchPassword = await bcrypt.compare(password,admin.password);
  //     if(!matchPassword){
  //       const error = {
  //         status:401,
  //         message:'Invalid password'
  //       };
  //       return next(error);
  //     }
  //      accessToken = JWTService.signAccessToken(
  //       { username: admin.username },
  //       "30m"
  //     );
  //   }
  //   catch(e){return next(e)}

  //   res.cookie("accessToken", accessToken, {
  //     maxAge: 1000 * 60 * 60 * 24,
  //     httpOnly: true,
  //   });
  //   console.log(`Admin object ${admin}`);
  //   const adminDto = new AdminDto(admin);
  //   return res.status(200).json({admin: adminDto, auth:true});
  // },

  // async logout(req, res, next) {
  //   //delete cookies
  //   res.clearCookie("accessToken");
  //   // 2. Send response to user
  //   res.status(200).json({ admin: null, auth: false });
  // },

  async Order(req,res,next){

      Order.find({status:{$ne: 'completed'}}, null,{sort:{'createdAt': -1}}).populate('CustomerId').then((result)=>{
        return res.json({order: result})
      }).catch((err)=>{
        console.log(err)
      })
    
  }
  ,
  async OrderStatus(req,res,next){
    try{
      
    const result = await Order.updateOne({_id: req.body._id},{status: req.body.status});
    console.log(result);
    }
    catch(e){
      return next(e)
    }
  }
};

module.exports = adminAuthController;
