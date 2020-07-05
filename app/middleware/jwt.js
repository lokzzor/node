const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");

verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  var token;
  if(typeof authHeader !== 'undefined'){
    token = authHeader && authHeader.split(' ')[1];
    console.log(token)
  } else {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
   
  jwt.verify(token, db.secret, (err, decoded) => {
    if (err) { return res.status(401).send({ auth: false, message: "Unauthorized!"});}
    else {
      console.log("токен проверен");
      next();
    }
  }); 
};
isAdmin = (req, res, next) => {
  console.log("админ");
  
  User.findOne({
    where: {
      [Op.and]: [
        { person_name: req.body.person_name },
        { is_admin: "true" }
      ]
    }
  }).then(user => {
    if(user){
      next();
      return;
    } else {
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    }

  });
};
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };
  module.exports = authJwt;
  