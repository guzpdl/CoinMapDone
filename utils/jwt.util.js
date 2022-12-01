const jwt = require('jsonwebtoken');

const signJwt = (idUser, email) => {
  return jwt.sign({ email }, 'secret1234' , { expiresIn: '7d', subject: idUser});
};

const verifyJwt = (token) => {
  return jwt.verify(token, 'secret1234');
}

module.exports = {
  signJwt,
  verifyJwt
}