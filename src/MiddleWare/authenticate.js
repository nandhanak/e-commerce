
const jwtVarify=require("../Config/jwtProvider")
const userServices=require('../services/useService')
const jwt=require("jsonwebtoken")
require ("dotenv").config();
const Secretkey="dbcFJHBVBVN56789";


function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, Secretkey, (err, user) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      // Set the token as a cookie named 'jwt'
      res.cookie('jwt', token, { httpOnly: true });

      req.user = user;

      next();
  });
}

module.exports=authenticate;