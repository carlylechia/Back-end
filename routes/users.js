const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

router.get('/users/:id', UsersController.getUsers);

module.exports = router;