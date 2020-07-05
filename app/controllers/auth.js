const db = require("../models");
const User = db.user;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    person_name: req.body.person_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    is_admin: req.body.is_admin,
    is_active: req.body.is_active
  }).then(user => {
      res.send({ message: "User registered successfully!" });
  }).catch(err => {
      res.status(500).send({ message: "Fail! Error -> " +err.message });
  });
};

exports.signin = (req, res) => {
  console.log("Sign-In");

  User.findOne({
    where: {
      person_name: req.body.person_name
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

      var token = jwt.sign({ id: user.id }, db.secret, {
        expiresIn: 86400 // 24 hours
      });
        res.status(200).send({
          auth: true,
          person_id: user.person_id,
          person_name: user.person_name,
          email: user.email,
          is_admin: user.is_admin,
          is_active: user.is_active,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: 'Error -> '+ err.message });
    });
};




/* 
const db = require('../config/config.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');


module.exports.createUser = function(req, res){
	// проверку на существующую надо добавить
	var password = bcrypt.hashSync(req.body.password, salt);
    var query = "INSERT INTO users (username, last_name, email, password, role) VALUES ('"+ 
    req.body.username +"', '"+ req.body.lastname +"', '"+ req.body.email +"', '"+ password +"', '"+ req.body.role + "')";
    db.query(query).spread(function(result, metadata){
        res.status(201).send("User was successfully created.");
    }).catch(function(err){
        res.status(500).send("User was not created.");
    })
}

module.exports.logIn = function(req, res){
    var submittedPassword = req.body.password;

    var query = "SELECT * FROM users WHERE username='"+ req.body.email +"' OR email='"+ req.body.email + "'";
    db.query(query).spread(function(result, metadata){
        if(result.length > 0){
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.password);
            console.log(isVerified);
            var token = jwt.sign(userData, process.env.SECRET, {
                expiresIn: 60*60*24
            })
            if(isVerified){

                res.json({
                    userData: userData,
                    token: token
                });
            } else {
                res.status(400).send("Incorrect Password");
            }
        }

    }).catch(function(){
        res.status(500).send("Unable to process the query.");
    })
}



const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.signup = async (req, res) => {
	const candidate = await User.findOne({ where: {email:req.body.email} })
	if(candidate){
		res.status(409).json({
			message: 'Почта занята попробуйте другую.'
		})
	} else{
		User.create({
			username: req.body.username,
			email: req.body.email,
			last_name: req.body.lastname,
			role: req.body.role,
			password: bcrypt.hashSync(req.body.password, 8)
		}).then( newUser =>  {
			 res.send("New User saved to database");
		  })
			.catch(err => {
			  console.log(err);
			  res.status(400).send("unable to save this newUser to database");
			})
		
	}
	// Save User to Database
/* 	User.create({
		username: req.body.username,
        email: req.body.email,
        last_name: req.body.lastname,
        role: req.body.role,
		password: bcrypt.hashSync(req.body.password, 8)
    }).then(res=>{
       console.log("GOOD");

      }).catch(err=>console.log(err)); */
    /* .then(user => {
		Role.findAll({
			where: {
				name: {
					[Op.or]: req.body.roles
				}
			}
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.send({ message: 'Registered successfully!' });
			});
		}).catch(err => {
			res.status(500).send({ reason: err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	}) 
}
exports.login = (req, res) => {

}
 */








/* var db = require('../config/config');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');

module.exports.createUser = function(req, res){
    var password = bcrypt.hashSync(req.body.user_password, salt);
    var query = "INSERT INTO users (username, user_password, email) VALUES ('"+ 
    req.body.username +"', '"+ password +"', '"+ req.body.email +"')";
    db.query(query).spread(function(result, metadata){
        res.status(200).send("User was successfully created.");
    }).catch(function(err){
        res.status(500).send("User was not created.");
    })
}

module.exports.logIn = function(req, res){
    var submittedPassword = req.body.password;

    var query = "SELECT * FROM users WHERE username='"+ req.body.loginName +"' OR email='"+ req.body.loginName + "'";
    db.query(query).spread(function(result, metadata){
        if(result.length > 0){
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.user_password);
            
            var token = jwt.sign(userData, process.env.SECRET, {
                expiresIn: 60*60*24
            })
            if(isVerified){

                res.json({
                    userData: userData,
                    token: token
                });
            } else {
                res.status(400).send("Incorrect Password");
            }
        }

    }).catch(function(){
        res.status(500).send("Unable to process the query.");
    })
} */