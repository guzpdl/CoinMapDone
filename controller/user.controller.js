const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const userModel = require("../models/User.model");
const { signJwt } = require("../utils/jwt.util");


const createUser = (req, res, next) => {

    const { username, password, email } = req.body;

    if (!username || !email) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide your username and email." });
      }
    
      if (password.length < 8) {
        return res.status(400).json({
          errorMessage: "Your password needs to be at least 8 characters long.",
        });
      }        
      
      userModel.findOne({ username }).then((found) => {
        
        if (found) {
          return res.status(400).json({ errorMessage: "Username already taken." });
        }    
        
        return bcrypt
          .genSalt(saltRounds)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashedPassword) => {
            return userModel.create({
              username,
              password: hashedPassword,
              email
            });
          })
          .then(() => {
            res.sendStatus(201)
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              return res.status(400).json({ errorMessage: error.message });
            }
            if (error.code === 11000) {
              return res.status(400).json({
                errorMessage:
                  "Username need to be unique. The username you chose is already in use.",
              });
            }
            return res.status(500).json({ errorMessage: error.message });
          });
      });    

}

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findOne({ email })
    .then((user) => {
      console.log(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ token: signJwt(user._id.toString(), user.email) });
      } else {
        res.status(400).json({ errorMessage: 'Email or password not valid.' });
      }
    })
    .catch(next);
};

module.exports = {
    createUser,
    loginUser
}
