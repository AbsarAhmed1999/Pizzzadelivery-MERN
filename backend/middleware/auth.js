const JWTService = require('../services/jwtservice');
const User = require('../models/user');
const UserDto = require('../dto/user');

const auth = async (req, res, next) => {
 try{
  const token = req.cookies.accessToken;

  if(!token) return res.json(false);
  JWTService.verifyAccessToken(token);
  res.send(true);
 }
 catch(err){
  console.log(err);
  res.json(false);
 }

};

module.exports = auth;
