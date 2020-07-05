const db = require("../models");
const User = db.user;

//Dublicate
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      person_name: req.body.person_name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
