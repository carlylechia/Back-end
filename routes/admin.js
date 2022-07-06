const AdminController = require('../controllers/AdminController');
const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
  AdminController.extractUsers;
});

module.exports = router;
