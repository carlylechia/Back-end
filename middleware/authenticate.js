const jwt = require('jsonwebtoken');
const { TokenKey } = require('../config');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, TokenKey);

    req.user = decode;
    next();
  }
  catch(err) {
    if(err.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Access token expired!'
      })
    } else {
      res.json({
        message: `Authentication failed due to ${err}!`
      })
    }

  }
}

module.exports = authenticate;
