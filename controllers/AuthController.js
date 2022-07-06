const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {TokenKey} = require('../config');

const register = async (req, res, next) => {
  const { name, email, password, } = req.body;
  const nameCheck = await User.findOne({name})
  if (nameCheck) return res.json({msg: `The username ${name} has already been taken. Try another.`, status: false});

  const emailCheck = await User.findOne({email});
  if (emailCheck) return res.json({msg: 'This email is already in the system, please sign in.', status: false});

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if(err) {
      res.json({
        error: err
      })
    }
    
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    user.save()
      .then(data => {
        res.json({
          msg: 'Login successful',
          status: true,
          user
        });
      })
      .catch(err => {
        res.json({
          msg: 'An error has occured!'
        })
      })
  })
}

const signupPage = (req, res, next) => {
  res.render('signup');
}

const login = (req, res, next) => {
  let name = req.body.name;
  let password = req.body.password;

  User.findOne({$or: [{ email:name }, { name:name }]})
    .then(user => {
      if(user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if(err) {
            res.json({
              msg: err,
              status: false,
            })
          }
          if(result) {
            let token = jwt.sign({name: user.name}, TokenKey, {expiresIn: '2h'});
            const refreshToken = jwt.sign({name: user.name}, 'refreshtoken', {expiresIn: '48h'});
           
            res.json({
              msg: 'Login successful!',
              status: true,
              token,
              refreshToken,
              user,
            })
            // res.redirect('/');
          } else {
            res.json({
              msg: 'Incorrect Password!',
              status: false,
            })
          }
        })
      } else {
        res.json({
          msg: 'User not found, sign up for free.',
          status: false,
        })
      }
    })
}

const signinPage = (req, res, next) => {
  res.render('signin');
}

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, 'refreshtoken', function(err, decode) {
    if(err) {
      res.status(400).json({
        msg: err,
        status: false,
      })
    } else {
      let token = jwt.sign({name: decode.name}, TokenKey, {expiresIn: '2h'});
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        msg: 'Token refreshed successfully!',
        token,
        refreshToken,
        status: true,
      })
    }
  })
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.avatarImage;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    })
  }
  catch(ex) {
    next(ex);
  }
};

module.exports = {
  register, signupPage, login, signinPage, refreshToken, setAvatar,
}
