const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
// router.get('/register', AuthController.signupPage);
router.post('/login', AuthController.login);
// router.get('/login', AuthController.signinPage);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/set-avatar/:id', AuthController.setAvatar);

module.exports = router;
